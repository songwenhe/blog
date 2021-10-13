<template>
	<div class="aritcle">
		<el-row :gutter="60" class="w">
			<el-col :span="18" class="detail">
				<div class="main">
					<div class="info">
						<div class="date"><i
								class="fa fa-clock-o"></i>{{currentPost.createTime | formatDate}}</div>
						<div class="view"><i class="fa fa-eye"></i>浏览({{currentPost.view || 0}})</div>
						<div class="comment"><i
								class="fa fa-commenting-o"></i>评论({{currentPost.replyNum || 0}})
						</div>
					</div>
					<div class="content">
						<h1 class="title">{{currentPost.title}}</h1>
						<div v-html="currentPost.htmlContent" class="html" v-hljs ref="html"></div>
					</div>
					<el-divider>本文完</el-divider>
					<div class="tools">
						<i class="fa fa-thumbs-o-up"></i>
						<i class="fa fa-heart"></i><i class="fa fa-share-alt"></i>
					</div>
					<div class="note">
						<p>所属分类：<span class="category" v-for="i in 3">前端</span></p>
						<p>本文标签：<span class="tag" v-for="i in 4">javascript</span></p>
					</div>
				</div>
				<div class="footer">
					<div class="goto">
						<div class="pre">
							<p><i class="fa fa-angle-left"></i>上一篇</p>
							<p>阿斯顿萨达</p>
						</div>
						<div class="next">
							<p>下一篇<i class="fa fa-angle-right"></i></p>
							<p>阿斯顿萨达</p>
						</div>
					</div>
					<myCard :shadow="false" title="热门推荐" class="hots" icon="fa-fire">
						<ul class="hot-list">
							<li class="hot-item" v-for="i in 8">
								<div class="cover">
									<img src="http://placeimg.com/640/480/animals" alt="">
								</div>
								<div class="info">
									<div class="title">SaaS的</div>
									<div class="other">
										<span class="fa fa-eye">浏览(40)</span><span
											class="fa fa-commenting-o">评论(0)</span>
									</div>
								</div>
							</li>
						</ul>
					</myCard>
					<myCard :shadow="false" title="相关笔记" class="related" icon="fa-bookmark-o">
						<ul class="related-list">
							<li class="related-item" v-for="i in 4">
								<i class="fa fa-book"></i>132123
							</li>
						</ul>
					</myCard>
					<myCard :shadow="false" title="评论" class="comment" icon="fa-commenting-o">
						<commentBox v-model="comment" @handle="addComment" />
						<div class="comment-list">
							<h3 class="comment-title">全部评论 ({{commentList.length}})</h3>
							<template v-if="notEmpty(commentList)">
								<div class="comment-item" v-for="i in commentList" :key="i.id">
									<div class="header">
										<img :src="file_url(i.author.fileUrl)" alt="">
										<div class="info">
											<span class="author">{{i.author.userName}}</span><span
												class="date fa fa-clock-o">{{i.createTime | formatDate}}</span>
										</div>
									</div>
									<div class="content">
										<div class="reply">
											<p class="reply-content fa">
												{{i.content}}
											</p>
											<ul class="reply-list">
												<li class="reply-item" v-for="reply in getReplyById(i.id)"
													:key="reply.id">
													<div class="reply-header">
														<div class="img-box">
															<img :src="file_url(reply.author.fileUrl)" alt="">
														</div>
														<span class="author">{{reply.author.userName}}</span>
														<span
															class="date fa fa-clock-o">{{reply.createTime| formatDate}}</span>
													</div>
													<div class="reply-text">{{reply.content}}</div>
												</li>
											</ul>
										</div>
									</div>
									<div class="footer">
										<span class="fa fa-thumbs-o-up">赞(0)</span>
										<span class="fa fa-reply" @click="setCurrent(i)">回复</span>
									</div>
									<commentBox v-if="current === i" v-model="reply" :isReply="true"
										@handle="addReply(i)" />
								</div>
							</template>
							<myEmpty desc="还没有评论" v-else></myEmpty>
						</div>
					</myCard>
				</div>
			</el-col>
			<el-col :span="6">
				<Asider :toc="this.headlist"></Asider>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Asider from '@/page/components/asider.vue'
import { mapActions, mapGetters } from 'vuex'
import myCard from '../components/myCard'
import commentBox from '../components/commentBox'
import { API, getAllList, insertOne } from '@/api'
import * as type from '@/store/mutation_types'
import { notEmpty, handleMsg, file_url } from '@/utils'
export default {
	props: ['id'],
	data() {
		return {
			headlist: [],
			show: false,
			comment: '',
			current: '',
			reply: '',
			commentList: [],
			replyList: []
		}
	},
	components: {
		Asider,
		myCard,
		commentBox
	},
	methods: {
		...mapActions({
			[type.FETCH_USER]: `user/${type.FETCH_USER}`,
			[type.FETCH_TYPE]: `post/${type.FETCH_TYPE}`
		}),
		notEmpty,
		file_url,
		setCurrent(i) {
			// console.log(i)
			this.current = i
		},
		async fetchComment() {
			const { data } = await getAllList(API.COMMENT, { notesId: this.id })
			this.commentList = data.map((i) => {
				const author = this.getUserById(i.userId)
				return { ...i, author }
			})
		},
		getUserById(id) {
			return this[`user/${type.GET_USER}`](id)
		},
		getReplyById(id) {
			return this.replyList.filter((i) => i.commentId === id)
		},
		getNoteTypeById(id) {
			return this.noteTypeList.find((i) => i.id)
		},
		async addComment() {
			const content = this.comment.trim()
			const payload = {
				authorId: this.currentPost.userId,
				notesId: this.id,
				userId: this.currentUser.id,
				createTime: new Date(),
				content
			}
			const { success, message } = await insertOne(API.COMMENT, payload)
			handleMsg(success, message, () => {
				this.comment = ''
				this.fetchComment()
			})
		},
		async addReply(item) {
			const content = this.reply.trim()
			const payload = {
				authorId: this.currentPost.userId,
				commentId: item.id,
				notesId: this.id,
				userId: this.currentUser.id,
				createTime: new Date(),
				content
			}
			const { success, message } = await insertOne(API.REPLY, payload)
			handleMsg(success, message, () => {
				this.reply = ''
				this.fetchReply()
			})
		},
		async fetchReply() {
			const { data } = await getAllList(API.REPLY)
			this.replyList = data.map((i) => {
				const author = this.getUserById(i.userId)
				return { ...i, author }
			})
			console.log(this.replyList)
		},
		genarateTOC() {
			const headList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
			const h = [...this.$refs.html.childNodes].filter((i) =>
				headList.includes(i.localName)
			)
			this.headlist = h.map((i, key) => {
				i.setAttribute('id', `${i.localName}_${key}`)
				return {
					id: `${i.localName}_${key}`,
					text: i.innerText,
					tag: i.nodeName,
					class: `${i.localName}_title`
				}
			})
		}
	},
	computed: {
		...mapGetters([
			'currentPost',
			'userlist',
			'currentUser',
			'types',
			`user/${type.GET_USER}`
		])
	},
	async mounted() {
		this.genarateTOC()
		await this[type.FETCH_USER]()
		this.fetchReply()
		this[type.FETCH_TYPE]()
		this.fetchComment()
	}
}
</script>

<style lang="scss" scoped>
.aritcle {
	@include base_layout;
	.detail {
		padding: 0 !important;
		.main {
			@include box_shadow(#0001);
			padding: 0.9375rem 2rem;
			background-color: #fff;
			margin-bottom: 2rem;
			.info {
				/* background-color: #fff; */
				justify-content: flex-end;
				@include icons;
			}
			.title {
				margin: 0;
				padding: 0.5rem 0 1.2rem;
			}
			.content {
				::v-deep .html {
					:not(pre) > code {
						color: #e74c3c;
						border: solid 1px #e1e4e5;
						background-color: #f3f5f9aa;
						padding: 0 0.5rem;
						border-radius: 0.3rem;
						display: inline-block;
						margin: 0 0.5rem;
					}
					p {
						line-height: 1.8rem;
					}
					code {
						border-radius: 0.8rem;
						line-height: 1.5rem;
						/* padding: 0.625rem; */
					}
					img {
						width: 100%;
					}
				}
			}
			.tools {
				padding: 1rem 0;
				display: flex;
				justify-content: center;
				.fa {
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26px;
					padding: 0.5rem;
					border: 1px solid #f0f0f0;
					margin-right: 1rem;
					border-radius: 4px;
					&.fa-thumbs-o-up {
						color: $main-blue;
						border-color: $main-blue;
					}
					&.fa-heart {
						color: $main-red;
						border-color: $main-red;
					}
					&.fa-share-alt {
						color: $main-green;
						border-color: $main-green;
					}
					&:last-child {
						margin-right: 0;
					}
					&:hover {
						/* border-color: ; */
						opacity: 0.7;
					}
					/* border-radius: 50%; */
				}
			}
			.note {
				font-size: 0.875rem;

				p {
					margin-bottom: 0;
				}
				.category,
				.tag {
					/* display: inline-block; */
					/* padding: 0.5rem 0; */
					cursor: pointer;
					color: $main-blue-dark;
					font-size: 0.875rem;
					margin-right: 1rem;
					border-bottom: 1px solid transparent;
					&:hover {
						border-bottom: 1px dashed $main-blue-dark;
					}
				}
			}
		}
		.footer {
			.goto {
				@include box_shadow(#6661);
				padding: 0.5rem 0;
				margin-bottom: 1rem;
				display: flex;
				align-items: center;
				background-color: #fff;
				.pre,
				.next {
					flex: 1;
					text-align: center;
					cursor: pointer;
					.fa {
						padding: 0 1rem;
					}
					:first-child {
						color: $main-blue;
					}
				}
			}
			.my-card {
				/* padding: 0.5rem 0.5rem; */
				margin-bottom: 1rem;
				::v-deep.my-card-title {
					height: 3rem;
					line-height: 3rem;
				}
			}
			.hots {
				.hot-list {
					display: flex;
					/* flex-direction: column; */
					flex-wrap: wrap;
					.hot-item {
						flex: 0 0 50%;
						padding: 0.5rem 0;
						display: flex;
						.cover {
							padding: 0 0.625rem;
							img {
								max-height: 4rem;
								width: auto;
								transition: all 0.5s linear;
								&:hover {
									/* scale: 1.5; */
									transform: scale(1.2);
								}
							}
						}
						.info {
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							.title {
								font-size: 16px;
								color: $main-blue-dark;
								cursor: pointer;
							}
							.other {
								@include icon_base;
								span {
									margin-right: 0.5rem;
									&:last-child {
										margin-right: 0;
									}
								}
							}
						}
					}
				}
			}

			.related {
				.related-list {
					padding: 0 1rem;
					display: flex;
					flex-wrap: wrap;
					.related-item {
						flex-basis: 50%;
						color: $main-black;
						cursor: pointer;
						height: 1.5rem;
						line-height: 1.5rem;
						.fa {
							margin-right: 0.5rem;
						}
					}
				}
			}
			.comment {
				.comment-list {
					.comment-item {
						padding-top: 1.2rem;
						&:first-of-type {
							padding-top: 0;
						}
						.header {
							display: flex;
							& > img {
								width: 3rem;
								height: 3rem;
								border-radius: 50%;
							}
							.info {
								@include icon_base;
								padding-left: 0.5rem;
								display: flex;
								flex-direction: column;
								justify-content: space-between;

								.author {
									font-size: 1rem;
									color: $main-blue-dark;
									/* cursor: pointer; */
								}
							}
						}
						.content {
							/* padding-top: 1rem; */
							.reply {
								display: flex;
								flex-direction: column;
								.reply-content {
									margin: 0;
									padding: 1rem;
									color: #666;
									font-size: 0.875rem;
									&::before {
										font-size: 0.875rem;
										color: $main-black-dark;
										content: '\f10d';
									}
									&::after {
										font-size: 0.875rem;
										color: $main-black-dark;
										content: '\f10e';
									}
								}
								.reply-list {
									padding: 0 0 1rem;
									.reply-item {
										padding: 0.625rem;
										display: flex;
										flex-direction: column;
										flex-wrap: wrap;
										background-color: #f5f5f5;

										.reply-header {
											display: flex;
											align-items: center;
											color: #666;
											font-size: 0.875rem;
											.img-box {
												img {
													border-radius: 50%;
													width: 30px;
													height: 30px;
												}
											}
											.author {
												color: $main-blue-dark;
												font-size: 1rem;
												padding: 0 0.5rem;
											}
										}
										.reply-text {
											padding: 0.5rem 0;
										}
									}
								}
							}
						}
						.footer {
							padding: 0.2rem 0 0.5rem;
							color: $main-blue-dark;
							.fa {
								cursor: pointer;
								margin-left: 0.5rem;
								&:first-child {
									margin: 0;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
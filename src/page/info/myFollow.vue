<template>
	<div class="my-follow">
		<Card :title="!showNotes?'我的关注':`${currentAuthor.userName}的笔记`">
			<template #right>
				<el-link type="primary" @click="back" v-if="showNotes">返回</el-link>
			</template>
			<template v-if="notEmpty(list)">
				<ul class="star-list" v-if="!showNotes">
					<li class="star-item" v-for="i in list" :key="i.id">
						<img :src="file_url(i.fileUrl)" alt=""
							onerror="this.src='http://www.bianbiangou.cn/index/ICON2.png'">
						<div class="info">
							<p class="author" @click="showOtherNote(i)">{{i.userName}}</p>
							<p class="desc">{{i.description || '这个人太懒了'}}</p>
						</div>
						<button class="btn" @click="handleFocus(i)"><i
								class="fa fa-star"></i>已关注</button>
					</li>
				</ul>
				<template v-else>

					<div class="note-brief" v-for="i in postList" :key="i.id">
						<div class="brief-box">
							<h3 @click="gotoDetail(i)">{{i.title}} <span class="fa fa-jpy"
									v-if="i.type === 1">{{i.price}}</span>
							</h3>
							<p>{{i.title}}</p>
							<div class="other">
								<span class="fa fa-eye">浏览({{i.view || 0}})</span>
								<span class="fa fa-commenting-o">评论({{i.replyNum || 0}})</span>
								<span class="fa fa-thumbs-o-up">点赞({{i.likeNum || 0}})</span>
							</div>
						</div>
						<div class="cover-box">
							<img src="http://www.bianbiangou.cn/index/ICON2.png" alt=""
								@click="gotoDetail(i)">
						</div>
					</div>
				</template>

			</template>
			<myEmpty v-else></myEmpty>
		</Card>
	</div>
</template>

<script>
import Card from './card.vue'
import { API, starUserList, deleteOne, findNotesByUserId } from '@/api'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation_types'
import { notEmpty, file_url, handleMsg } from '@/utils'
export default {
	props: ['user'],
	components: {
		Card
	},
	data() {
		return {
			list: [],
			showNotes: false,
			currentAuthor: {},
			postList: []
		}
	},
	watch: {
		user() {
			this.getList()
		}
	},
	methods: {
		notEmpty,
		file_url,
		async getList() {
			const { data } = await starUserList({ id: this.user.id })
			this.list = data.map((i) => {
				const pwd = Object.entries(i)
				const [key, value] = pwd[0]
				return { key, ...value }
			})
			// this.list = data
		},
		async fetchNotes() {
			const { data } = await findNotesByUserId({
				id: this.currentAuthor.id,
				type: 2
			})
			this.postList = data
		},
		back() {
			this.currentAuthor = {}
			this.showNotes = false
			this.fetchData()
		},
		showOtherNote(i) {
			this.currentAuthor = i
			this.showNotes = true
			this.fetchData()
		},
		async handleFocus(i) {
			const { success, message } = await deleteOne(API.FOCUSON, { id: i.key })
			handleMsg(success, message, () => {
				this.getList()
			})
		},
		gotoDetail(i) {
			this.$router.push({ name: 'pArticle', params: { id: i.id } })
		},
		fetchData() {
			if (this.showNotes) {
				this.fetchNotes()
			} else {
				this.getList()
			}
		}
	},
	mounted() {
		this.fetchData()
	}
}
</script>

<style lang="scss" scoped>
.star-list {
	width: 100%;
	.star-item {
		display: flex;
		width: 100%;
		padding: 10px;
		align-items: center;

		img {
			width: 60px;
			height: 60px;
		}
		.btn {
			background-color: #06f;
			color: #fff;
			min-width: 96px;
			font-size: 14px;
			line-height: 32px;
			border-radius: 4px;
			border: 1px solid;
			cursor: pointer;
			&.star {
				border-color: #06f;
				background-color: #8590a6;
			}
		}
		.info {
			padding-left: 16px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 60px;
			flex: 1;
			.author {
				font-size: 18px;
				font-weight: 600;
				&:hover {
					cursor: pointer;
					text-decoration: underline;
					color: $main-blue;
				}
			}
			.desc {
				color: #8590a6;
				font-size: 14px;
			}
			p {
				margin: 0;
			}
		}
	}
}

.note-brief {
	display: flex;
	padding: 10px 0;
	/* display: flex; */
	flex: 1;
	.brief-box {
		flex: 1;
		h3 {
			color: #666;
			font-size: 18px;
			.fa-jpy {
				margin-left: 20px;
				color: $main-red;
			}
			&:hover {
				cursor: pointer;
				text-decoration: underline;
			}
		}
		p {
			font-size: 13px;
			line-height: 24px;
			color: #333;
		}
	}

	.other {
		span {
			font-size: 13px;
			color: #888;
			margin-right: 12px;
		}
		.fa-star {
			color: $main-red-dark;
			&:hover {
				cursor: pointer;
			}
		}
	}
}
</style>
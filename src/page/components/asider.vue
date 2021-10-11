<template>
	<div class="asider">
		<myCard title="关于我" icon="fa-user">
			<div class="about">
				<div class="qr-code">
					<img src="http://placeimg.com/640/480/abstract" alt="">
				</div>
				<div class="author">
					nihao123
				</div>
				<div class="link">
					<i class="fa fa-weixin"></i>
					<i class="fa fa-qq"></i>
					<i class="fa fa-weibo"></i>
					<i class="fa fa-github"></i>
				</div>
			</div>
		</myCard>
		<myCard title="目录" icon="fa-book" class="toc-card" v-if="notEmpty(toc)">
			<ul class="toc">
				<li class="toc-item" v-for="i in toc" :key="i.id"><a href="javascript:;"
						class="link" @click="achor(i)">{{i.text}}</a></li>
			</ul>
		</myCard>
		<myCard title="标签云" icon="fa-tag">
			<div class="tag">
				<router-link :to="{name:'pTag',params:{id:i.id}}" v-for="i in tagList" :key="i.id"
					class="tag-link">{{i.name}}
				</router-link>
			</div>
		</myCard>
		<myCard title="近期评论" icon="fa-comment">
			<ul class="comment">
				<li class="comment-item" v-for="i in 8">
					<img src="http://placeimg.com/640/480/nightlife" alt="" class="img">
					<span class="author">admin :</span>
					<span class="text">大家好</span>
				</li>
			</ul>
		</myCard>
		<myCard title="近期笔记" icon="fa-book"></myCard>
		<myCard title="网站信息" icon="fa-info"></myCard>
	</div>
</template>

<script>
import myCard from '@/page/components/myCard.vue'
import { notEmpty } from '@/utils'
import { API, getAllList } from '@/api'
export default {
	props: ['toc'],
	data() {
		return {
			tagList: []
		}
	},
	components: {
		myCard
	},
	mounted() {
		this.getTagList()
		// window.addEventListener('scroll', function (e) {
		// console.log(e)
		// let t = document.body.scrollTop() // 目前监听的是整个body的滚动条距离
		// if (t > 0) {
		// 	$('.box').addClass('box-active')
		// } else {
		// 	$('.box').removeClass('box-active')
		// }
		// })
	},
	methods: {
		notEmpty,
		achor(el) {
			const element = document.getElementById(el.id)
			element.scrollIntoView({ behavior: 'smooth' })
		},
		async getTagList() {
			const { data } = await getAllList(API.TAG)
			// console.log(res)
			this.tagList = data
		}
	}
}
</script>
<style lang="scss" scoped>
.my-card {
	margin-bottom: 1rem;
	.about {
		.qr-code {
			text-align: center;
			img {
				padding: 8px;
				border: 1px solid #fafafa;
				width: 60%;
				/* margin: 0 auto; */
			}
		}
		.author {
			text-align: center;
			font-size: 1.125rem;
			line-height: 1.875rem;
			height: 1.875rem;
		}
		.link {
			display: flex;
			justify-content: space-evenly;
			margin-top: 0.625rem;
			.fa {
				position: relative;
				border: 1px solid #f0f0f0;
				padding: 0.625rem;
				border-radius: 0.625rem;
				/* &::after {
					position: absolute;
					top: -0.5rem;
					bottom: -0.5rem;
					left: -0.5rem;
					right: -0.5rem;
					border-radius: 50%;
					content: '';
					border: 1px solid;
				} */
				&:hover {
					cursor: pointer;
					transform: scale(1.2);
				}
				&.fa-weibo:hover {
					color: #fc3c31;
				}
				&.fa-qq:hover {
					color: #4e91d1;
				}
				&.fa-github:hover {
					color: #060606;
				}
				&.fa-weixin:hover {
					color: #248a34;
				}
			}
		}
	}
	.tag {
		display: flex;
		flex-wrap: wrap;
		/* align-items: center; */
		/* align-content: center; */
		justify-content: center;
		&-link {
			font-size: 1.125rem;
			padding: 0.25rem 0.5rem;
			font-weight: 700;
			color: $main-green-dark;
			border-bottom: 1px solid transparent;
			transition: all 0.5 linear;
			&:hover {
				color: $main-green;
				border-color: $main-green;
			}
		}
	}
	.comment {
		display: flex;
		flex-direction: column;
		&-item {
			display: flex;
			align-items: center;
			padding: 0.625rem 0;
			border-bottom: 1px dashed #f0f0f0;

			.img {
				width: 24px;
				height: 24px;
			}
			.author {
				text-indent: 0.5em;
				font-size: 14px;
				color: #666;
			}
			.text {
				text-indent: 0.2em;
				font-size: 14px;
				color: $main-grey-dark;
			}
		}
	}
	&.toc-card {
		position: sticky;
		top: 1rem;
		z-index: 999;
		.toc {
			.toc-item {
				padding: 6px 0;
			}
		}
	}
}
</style>



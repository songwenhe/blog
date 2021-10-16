<template>
	<div class="pay-detail w">
		<div class="top-box">
			<div class="cover">
				<img :src="file_url(currentPost.coverImage)" alt=""
					onerror="this.src='http://www.bianbiangou.cn/index/ICON2.png'">
			</div>
			<div class="info" v-if="notEmpty(currentPost) && notEmpty(currentUser) ">
				<h3 class="title">{{currentPost.title}}</h3>
				<p class="author">讲师：{{currentUser.userName}}</p>
				<p class="price"><i class="fa fa-jpy"></i>{{currentPost.price | toX}}</p>
				<div class="btns">
					<button class="btn" @click="pay">立即购买</button>
				</div>
			</div>
			<div v-html="res"></div>
		</div>
		<div class=""></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { file_url, hashID, notEmpty } from '@/utils'
import * as type from '@/store/mutation_types'
import { alipay } from '@/api'
export default {
	data() {
		return {
			res: ''
		}
	},
	computed: {
		...mapGetters(['currentPost', 'userlist']),
		currentUser() {
			return this.userlist.find((i) => i.id === this.currentPost.userId)
		}
	},
	mounted() {
		this[type.FETCH_USER]()
	},
	methods: {
		file_url,
		notEmpty,
		...mapActions('user', [type.FETCH_USER]),
		async pay() {
			const res = await alipay({
				out_trade_no: hashID(32),
				total_amount: this.currentPost.price,
				subject: 'sadsad'
			})
			this.res = res
			this.$message.success('购买成功')
			// window.open(
			// 	'https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.wap.pay&sign=ViJodAaT9VBgJn4Y5Hswmb5fom8jZqn48%2FSIGUpC7PlXB1%2F6bYrQ65nSMMGkjqzVeyVHySxa5s6LGOYJwKUc3tAWct%2FUyqgK%2F%2BlferpNYlY7C56Sqg2zNSEnRxMPhQ1oIrMD7zLBUrejD%2BXiyiqGz09nmf003Rk72CKVDNvkyQo3lwxqCB%2BVCIvRH0oG3Mm%2F3jE8XtQbZ9uuEAHlz6ukboN0phtuzoiOx9SO86lcmK16QCqx3kK2xuoYpjJ7YIzcEZRaZLKn7wkDcpHXzk2j%2BcfK53%2BR%2BK0NbqVeyyqzkZBlGeylQCzOTVue%2BmBtJj97jUMx1VOWJt1slluFy3zqlg%3D%3D&version=1.0&app_id=2021000117618822&sign_type=RSA2&timestamp=2021-10-15+14%3A16%3A42&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json'
			// )
			// const div = document.createElement('div')
			// div.setAttribute('dangerouslySetInnerHTML', res)
			// document.body.appendChild(div)
			// var ifrm = document.createElement('iframe')
			// // ifrm.setAttribute('src', 'http://google.com/')
			// ifrm.innerHTML = res
			// ifrm.style.width = '100px'
			// ifrm.style.height = '100px'
			// document.body.appendChild(ifrm)
			// this.$nextTick(() => {
			// 	this.$refs.hidden.innerHTML = res
			// })
			// document.create
			// document.body.innerHTML = res
		}
	}
}
</script>

<style lang="scss" scoped>
.pay-detail {
	padding-top: 20px;
	.top-box {
		display: flex;
		padding: 20px;
		background-color: #fff;
		.cover {
			img {
				height: 240px;
				width: 400px;
				/* height: 100%; */
			}
		}
		.info {
			padding-left: 20px;
			flex: 1;
			display: flex;
			flex-direction: column;
			.title {
				font-size: 24px;
				color: #333;
				line-height: 1.2;
				font-weight: normal;
				margin: 0;
			}
			.author {
				font-size: 14px;
				color: #666;
			}
			.price {
				margin-bottom: auto;
				color: #333;
				font-size: 28px;
				font-family: '微软雅黑';
			}
			.btns {
				.btn {
					color: white;
					font-size: 20px;
					line-height: 40px;
					line-height: 40px;
					width: 140px;
					text-align: center;
					outline: none;
					border: none;
					background-color: $main-red;
					vertical-align: middle;
					display: inline-block;
					cursor: pointer;
					&:hover {
						opacity: 0.7;
					}
				}
			}
		}
	}
}
</style>
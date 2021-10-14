<template>
	<div class="pay-detail w">
		<div class="top-box">
			<div class="cover">
				<img src="http://placeimg.com/640/480/people" alt=""
					onerror="this.src='http://placeimg.com/640/480/sports'">
			</div>
			<div class="info">
				<h3 class="title">{{currentPost.title}}</h3>
				<p class="author">讲师：{{currentUser.userName}}</p>
				<p class="price"><i class="fa fa-jpy"></i>{{currentPost.price | toX}}</p>
				<div class="btns">
					<button class="btn" @click="pay">立即购买</button>
				</div>
			</div>
		</div>
		<div class=""></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { file_url, hashID } from '@/utils'
import * as type from '@/store/mutation_types'
import { alipay } from '@/api'
export default {
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
		...mapActions('user', [type.FETCH_USER]),
		async pay() {
			const res = await alipay({
				out_trade_no: hashID(32),
				total_amount: this.currentPost.price,
				subject: 'sadsad'
			})
			// document.body.innerHTML = res
			console.log(document)
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
				width: auto;
				height: 240px;
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
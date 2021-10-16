<template>
	<div class="my-follow">
		<Card title="我的关注">
			<ul class="star-list">
				<li class="star-item" v-for="i in list" :key="i.id">
					<img :src="file_url(i.fileUrl)" alt=""
						onerror="this.src='http://www.bianbiangou.cn/index/ICON2.png'">
					<div class="info">
						<p class="author">{{i.userName}}</p>
						<p class="desc">{{i.description}}</p>
					</div>
					<button class="btn"><i class="fa fa-star"></i>已关注</button>
				</li>
			</ul>
		</Card>
	</div>
</template>

<script>
import Card from './card.vue'
import { API, starUserList } from '@/api'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation_types'
import { notEmpty, file_url } from '@/utils'
export default {
	props: ['user'],
	components: {
		Card
	},
	data() {
		return {
			list: []
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
			this.list = data
		}
	},
	mounted() {
		this.getList()
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
</style>
<template>
	<div class="plist">
		<el-row :gutter="60" class="w">
			<el-col :span="18" class="list">
				<postList :list="list"></postList>
			</el-col>
			<el-col :span="6">
				<Asider></Asider>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Asider from '@/page/components/asider.vue'
import { API, getPageList } from '@/api'
import { aMixin } from '@/mixin'
import postList from '@/page/components/postList.vue'
export default {
	mixins: [aMixin],
	data() {
		return {
			list: []
		}
	},
	components: {
		Asider,
		postList
	},
	mounted() {
		this.getList()
	},

	methods: {
		async getList() {}
	}
}
</script>

<style lang="scss" scoped>
.plist {
	@include base_layout;
	/* .list  */
	.aside {
		height: 100%;
		/* background-color: #fff; */
	}
}
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
			border: 1px solid transparent;
			border-left: 0;
			border-right: 0;
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
}
</style>

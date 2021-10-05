<template>
	<div class="index">
		<el-row :gutter="60" class="container w">
			<el-col :span="18" class="list">
				<div class="item" v-for="i in 6">
					<div class="cover">
						<span class="ribbon">原理</span>
						<img src="http://placeimg.com/640/480/cats" alt="" class="img">
					</div>
					<div class="info">
						<div class="title">啊实打实大苏打</div>
						<div class="desc">啊实打实打算</div>
						<div class="other">
							<div class="date"><i class="fa fa-clock-o"></i>2021-05-11</div>
							<div class="view"><i class="fa fa-eye"></i>浏览(56)</div>
							<div class="comment"><i class="fa fa-commenting-o"></i>评论(0)</div>
						</div>
					</div>
					<div class="btns">
						<button class="btn">查看笔记</button>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<!-- <div class="aside">
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
					<myCard title="标签云" icon="fa-tag">
						<div class="tag">
							<a href="javascript:;" v-for="i in 12" class="tag-link">html</a>
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
				</div> -->
				<Asider></Asider>
			</el-col>
		</el-row>
	</div>
</template>

<script>
// import myCard from '@/page/components/myCard.vue'
import Asider from '@/page/components/asider.vue'
export default {
	data() {
		return {}
	},
	components: {
		Asider
	}
}
</script>

<style lang="scss" scoped>
.index {
	height: 100%;
}
.container {
	padding: 1.25rem 0;
	.list {
		height: 100%;
		/* background-color: #fff; */
		.item {
			position: relative;
			padding: 1rem;
			background-color: #fff;
			margin-bottom: 1.25rem;
			display: flex;
			border-radius: 0.125rem;
			box-shadow: 1px 2px 2px 2px #0002;
			.cover {
				padding: 0.625rem;
				.img {
					min-width: 6rem;
					height: 6rem;
					overflow: hidden;
					&:hover {
						transform: scale(1.05);
					}
				}
			}
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 1rem;
				.title {
					color: #303030;
					font-size: 1.4rem;
					/* font-weight: 700; */
				}
				.desc {
					font-size: 1rem;
					color: #808080;
				}
				.other {
					display: flex;
					& > div {
						color: #a0a0a0;
						margin-right: 10px;
						font-size: 0.875rem;
					}
					.fa {
						margin-right: 0.2rem;
					}
				}
			}
			.btns {
				display: flex;
				align-items: flex-end;
				/* justify-content: flex-end; */
				.btn {
					cursor: pointer;
					width: 6.25rem;
					height: 1.875rem;
					border: 1px solid $main-blue;
					/* border-radius: 0.375rem; */
					background-color: transparent;
					color: $main-blue-dark;
					transition: all 0.5;
					&:hover {
						color: #fff;
						background-color: $main-blue;
					}
				}
			}
		}
	}
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

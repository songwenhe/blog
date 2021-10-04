<template>
	<div class="home-container">
		<!-- <div class="home-text">name: {{ name }}</div> -->
		<!-- <el-row :gutter="20" class="panel-group"> -->
		<el-row :gutter="20" class="panel-group">
			<el-col span="6" class="panel-card">
				<div class="panel-card__item">
					<div class="panel-card__item--left">
						<span class="number">37</span>
						<span class="title">博客总数</span>
					</div>
					<div class="panel-card__item--right">
						<i class="fa fa-cube" aria-hidden="true"></i>
					</div>
				</div>
			</el-col>
			<el-col span="6" class="panel-card">
				<div class="panel-card__item">
					<div class="panel-card__item--left">
						<span class="number">37</span>
						<span class="title">标签总数</span>
					</div>
					<div class="panel-card__item--right">
						<i class="fa fa-comments-o" aria-hidden="true"></i>
					</div>
				</div>
			</el-col>
			<el-col span="6" class="panel-card">
				<div class="panel-card__item">
					<div class="panel-card__item--left">
						<span class="number">37</span>
						<span class="title">文章分类</span>
					</div>
					<div class="panel-card__item--right">
						<i class="fa fa-comments-o" aria-hidden="true"></i>
					</div>
				</div>
			</el-col>
			<el-col span="6" class="panel-card">
				<div class="panel-card__item">
					<div class="panel-card__item--left">
						<span class="number">37</span>
						<span class="title">留言条数</span>
					</div>
					<div class="panel-card__item--right">
						<i class="fa fa-comments-o" aria-hidden="true"></i>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	computed: {
		...mapGetters(['name'])
	}
}
</script>

<style lang="scss" scoped>
.home {
	&-container {
		margin: 30px;
	}
}
.panel {
	&-group {
		/* background-color: #f0f0f0; */
	}
	&-card {
		transition: all 0.5s;
		&__item {
			box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
			border-radius: 0.625rem;
			width: 100%;
			/* height: 108px; */
			padding: 1.4rem 0;
			cursor: pointer;
			font-size: 12px;
			position: relative;
			overflow: hidden;
			color: #666;
			background: #fff;
			border-color: rgba(0, 0, 0, 0.05);
			transition: all 0.5s;
			display: flex;
			align-items: center;
			text-align: center;
			/* justify-content: center; */
			&--left {
				flex: 3;
				display: flex;
				flex-direction: column;
				.number {
					font-size: 2.375rem;
					font-weight: 700;
					line-height: 1.65857;
				}
				.title {
					font-size: 1.125rem;
					color: #bab8b8;
				}
			}
			&--right {
				flex: 2;
				.fa {
					font-size: 3.75rem;
				}
			}
		}
		&:hover {
			transform: translateY(4px);
		}
	}
}
</style>

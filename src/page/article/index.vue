<template>
	<div class="aritcle">
		<el-row :gutter="60" class="w">
			<el-col :span="18" class="detail">
				<div class="info">
					<div class="date"><i
							class="fa fa-clock-o"></i>{{currentPost.createTime | formatDate}}</div>
					<div class="view"><i class="fa fa-eye"></i>浏览({{currentPost.view || 0}})</div>
					<div class="comment"><i
							class="fa fa-commenting-o"></i>评论({{currentPost.replyNum || 0}})
					</div>
				</div>
				<h1 class="title">{{currentPost.title}}</h1>
				<div v-html="currentPost.htmlContent" class="content"></div>
			</el-col>
			<el-col :span="6">
				<Asider></Asider>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Asider from '@/page/components/asider.vue'
import { mapGetters } from 'vuex'
export default {
	components: {
		Asider
	},
	computed: {
		...mapGetters(['currentPost'])
	}
}
</script>

<style lang="scss" scoped>
.aritcle {
	@include base_layout;
	.detail {
		@include box_shadow(#0001);
		padding: 0.9375rem 0;
		background-color: #fff;
		.info {
			justify-content: flex-end;
			@include icons;
		}
		.title {
			margin: 0;
			padding: 0.5rem 0 1.2rem;
		}
		.content {
		}
	}
}
</style>
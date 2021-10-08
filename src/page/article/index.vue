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
				<div v-html="currentPost.htmlContent" class="content" v-hljs ref="html"></div>
			</el-col>
			<el-col :span="6">
				<Asider :toc="this.headlist"></Asider>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Asider from '@/page/components/asider.vue'
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			headlist: []
		}
	},
	components: {
		Asider
	},
	mounted() {},
	computed: {
		...mapGetters(['currentPost'])
	},
	mounted() {
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
		::v-deep .content {
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
}
</style>
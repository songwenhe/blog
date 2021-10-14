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
	props: ['id'],
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
	watch: {
		id() {
			this.getList()
		}
	},
	methods: {
		async getList() {
			const { list } = await getPageList(API.NOTE, { keyword: this.id })
			this.list = list
		}
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
</style>

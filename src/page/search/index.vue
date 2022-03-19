<template>
	<div class="plist">
		<el-row :gutter="60" class="w">
			<el-col :span="18" class="list">
				<postList :list="list" @handle="gotoDetail"></postList>
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
import { mapMutations } from 'vuex'
import * as types from '@/store/mutation_types'
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
		id(val) {
			this.getList()
		}
	},
	methods: {
		...mapMutations('post', [types.SET_CURRENT_POST]),
		async getList() {
			const { list } = await getPageList(API.NOTE, { keyword: this.id })
			this.list = list.filter((i) => i.status === 1 && i.type !== 0)
		},
		gotoDetail(i) {
			this[types.SET_CURRENT_POST](i)
			this.$router.push({ name: 'pArticle', params: { id: i.id } })
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

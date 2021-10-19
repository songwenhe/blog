<template>
	<div class="plist">
		<el-row :gutter="60" class="w">
			<el-col :span="18" class="list">
				<postList :list="list" @handle="gotoDetail"></postList>
				<el-pagination @size-change="handleSizeChange"
					@current-change="handleCurrentChange($event,getList)" class="t-pagination"
					:current-page.sync="query.page" :page-size="query.size"
					layout="prev, pager, next, jumper" :total="total" v-if="notEmpty(list)">
				</el-pagination>
			</el-col>
			<el-col :span="6">
				<Asider></Asider>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Asider from '@/page/components/asider.vue'
import { API, getTagById } from '@/api'
import { notEmpty } from '@/utils'
import { aMixin } from '@/mixin'
import postList from '@/page/components/postList.vue'
import { mapMutations } from 'vuex'
import * as types from '@/store/mutation_types'
export default {
	mixins: [aMixin],
	props: ['id'],
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
		notEmpty,
		...mapMutations('post', [types.SET_CURRENT_POST]),
		async getList() {
			const res = await getTagById({ tagsId: this.id })
			this.list = res
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

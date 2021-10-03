<template>
	<el-card class="comment">
		<TableHeader v-model="query.keyword" @search="getList" :showLeft="false"
			@clear="getList" />
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border
			style="width: 100%" fit highlight-current-row>
			<el-table-column align="center" label="笔记标题" min-width="95">
				<template v-slot={row}>
					<div class="t-ellipsis">{{row.notesId}}</div>
				</template>
			</el-table-column>

			<el-table-column align="center" label="内容" min-width="95">
				<template v-slot={row}>
					<div class="t-ellipsis">{{row.content}}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="评论用户" min-width="95">
				<template v-slot={row}>
					<div class="t-ellipsis">{{row.userId}}</div>
				</template>
			</el-table-column>
			<!-- <el-table-column align="center" "center" label="评论时间" min-width="95">
				<template v-slot={row}>
					{{row.createTime | formatDate}}
				</template>
			</el-table-column> -->
			<el-table-column align="center" class-name="t-btns" label="操作" min-width="95">
				<template v-slot={row}>
					<el-button slot="reference" class="t-btn" type="danger" icon="el-icon-delete"
						@click="deleteById(row.id)">
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange"
			@current-change="handleCurrentChange($event,getList)" class="t-pagination"
			:current-page.sync="query.page" :page-size="query.size"
			layout="prev, pager, next, jumper" :total="total">
		</el-pagination>
	</el-card>
</template>

<script>
import { deleteOne, getPageList, API } from '@/api'

import { aMixin } from '@/mixin'

export default {
	data() {
		return {
			key: '',
			list: [],
			listLoading: false,
			isEdit: false
		}
	},
	mixins: [aMixin],
	mounted() {
		this.getList()
	},
	methods: {
		async getList() {
			this.listLoading = true
			const { total, list } = await getPageList(API.COMMENT, this.query)
			this.listLoading = false
			this.total = total
			this.list = list
		},
		async deleteById(id) {
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			})
				.then(async () => {
					const { success, message } = await deleteOne(API.COMMENT, { id })
					this.$message[success ? 'success' : 'error'](message)
					this.getList()
				})
				.catch(() => {})
		}
	}
}
</script>

<style lang="scss" scoped>
.comment {
	/* background-color: #000; */
}
</style>	
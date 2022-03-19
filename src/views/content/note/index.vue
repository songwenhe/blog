<template>
	<el-card class="note">
		<TableHeader @add="handleAdd" :showLeft="false" v-model="query.keyword"
			@search="getList" @clear="getList" />
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border
			ref="multipleTable" tooltip-effect="dark" style="width: 100%" fit
			highlight-current-row>
			<el-table-column align="center" label="封面图" min-width="95">
				<template v-slot={row}>
					<el-avatar shape="square" :size="80" :src="_url(row.coverImage)"
						v-if="row.coverImage"></el-avatar>
					<el-avatar shape="square" :size="80" v-else></el-avatar>
				</template>
			</el-table-column>
			<el-table-column align="center" label="标题" min-width="120">
				<template v-slot={row}>
					<div class="t-ellipsis">{{row.title}}</div>
				</template>
			</el-table-column>

			<el-table-column align="center" label="笔记分类" min-width="95">
				<template v-slot={row}>
					<el-tag type="warning">{{getName(row.lx)}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="笔记类型" min-width="95">
				<template v-slot={row}>
					<el-tag :type="['danger','primary','success'][row.type]" effect="dark">
						{{findStateById(row.type)}}
					</el-tag>
				</template>

			</el-table-column>
			<el-table-column align="center" label="统计" min-width="95">
				<template v-slot={row}>
					<p>评论： {{row.replyNum || 0}}</p>
					<p>点赞： {{row.likeNum || 0}}</p>
				</template>

			</el-table-column>
			<el-table-column align="center" label="笔记状态" min-width="95">
				<template v-slot={row}>
					<el-tag effect="dark" :type="['primary','success'][row.status]">
						{{BASE_POST_STATE[row.status]}}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建时间" min-width="120">
				<template v-slot={row}> {{row.createTime | formatDate}}
				</template>

			</el-table-column>
			<el-table-column align="center" label="操作" min-width="100">
				<template v-slot={row}>
					<div class="t-btns">
						<template v-if="row.status === 0">
							<el-link type="primary" @click="handleAudit(row,1)"
								:style="{marginRight:'10px'}">
								通过审核</el-link>
						</template>
						<template v-else>
							<el-link type="success" @click="handleAudit(row,0)"
								:style="{marginRight:'10px'}">
								下架文章</el-link>
						</template>
						<el-link type="danger" @click="deleteById(row.id)">删除文章</el-link>
					</div>
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
import {
	insertOne,
	editOne,
	deleteOne,
	getAllList,
	getPageList,
	API
} from '@/api'
import { aMixin } from '@/mixin'
import { POST_STATE, BASE_POST_STATE } from '@/utils/global'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as type from '@/store/mutation_types'
export default {
	data() {
		return {
			list: [],
			listLoading: false,
			dialogFormVisible: false,
			form: {},
			BASE_POST_STATE
		}
	},
	mixins: [aMixin],
	computed: {
		...mapGetters('post', [type.GET_TYPE])
	},
	methods: {
		...mapActions('post', [type.FETCH_TYPE]),
		...mapMutations('post', [type.SET_CURRENT_POST]),
		getName(id) {
			return this[type.GET_TYPE](id)?.name ?? 'unkonw'
		},
		findStateById(type) {
			return POST_STATE.find((i) => i.type === type)?.text ?? 'unkown'
		},
		async handleAudit(row, status) {
			const { success } = await editOne(API.NOTE, {
				id: row.id,
				status
			})
			success && this.$message.success(['下架成功', '发布成功'][status])
			success && this.getList()
		},
		async getList() {
			this.listLoading = true
			const { total, list } = await getPageList(API.NOTE, this.query)
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
					const { success, message } = await deleteOne(API.NOTE, { id })
					this.$message[success ? 'success' : 'error'](message)
					this.getList()
				})
				.catch(() => {})
		},
		editById(row) {
			this.SET_CURRENT_POST(row)
			this.$router.push({ name: 'NoteDetail', params: { id: row.id } })
		},
		handleAdd() {
			this.$router.push({ name: 'NoteDetail' })
		}
	},
	mounted() {
		this[type.FETCH_TYPE]()
		this.getList()
	}
}
</script>

<style lang="scss" scoped>
.note {
	/* background-color: #000; */
}
</style>
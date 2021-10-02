<template>
	<el-card class="category">
		<TableHeader @add="handleAdd" v-model="query.keyword" @search="getList"
			@clear="getList" />
		<el-table v-loading=" listLoading" :data="list" element-loading-text="Loading" border
			style="width: 100%" fit highlight-current-row>
			<el-table-column align="center" label="分类名称" min-width="95">
				<template v-slot={row}>
					{{row.name}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类描述" min-width="95">
				<template v-slot={row}>
					<div class="t-ellipsis">{{row.description}}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类图标" min-width="95">
				<template v-slot={row}>

					<i :class="'fa fa-2x '+row.icon" v-if="row.icon"></i>
					<span v-else>暂无</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类状态" min-width="95">
				<template v-slot={row}>
					<el-switch v-model="row.available" active-text="开启" inactive-text="关闭"
						active-value="true" inactive-value="false">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建时间" min-width="95">
				<template v-slot={row}>
					{{row.createTime | formatDate}}
				</template>
			</el-table-column>
			<el-table-column align="center" class-name="t-btns" label="操作" min-width="95">
				<template v-slot={row}>
					<!-- {{ scope.$index }} -->
					<el-button class="t-btn" type="success" icon="el-icon-edit"></el-button>
					<el-button class="t-btn" type="danger" icon="el-icon-delete"
						@click="deleteById(row.id)"> </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange"
			@current-change="handleCurrentChange($event,getList)" class="t-pagination"
			:current-page.sync="query.page" :page-size="query.size"
			layout="prev, pager, next, jumper" :total="total">
		</el-pagination>

		<!-- 添加分类 -->
		<el-dialog title="添加分类" width="30%" :visible.sync="dialogFormVisible"
			@close="resetForm('categoryForm')" :close-on-click-modal="false" class="t-dialog"
			key="categoryForm">
			<el-form :model="categoryForm" :rules="rules" label-width="80px" ref="categoryForm">
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="categoryForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="分类描述" prop="description">
					<el-input v-model="categoryForm.description" type="textarea" autocomplete="off"
						resize="none">
					</el-input>
				</el-form-item>
				<el-form-item label="分类图标" prop="icon">
					<el-input v-model="categoryForm.icon" autocomplete="off">
						<i slot="suffix" :class="'fa fa-2x '+categoryForm.icon"></i>
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer t-btns">
				<el-button type="info" @click="dialogFormVisible = false" class="t-btn">取 消
				</el-button>
				<el-button type="success" @click="submitForm('categoryForm')" class="t-btn">添 加
				</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
import { addNoteType, getPageList, deleteNoteType } from '@/api/noteType'
import { hashID } from '@/utils'
import { aMixin } from '@/mixin'

export default {
	data() {
		return {
			key: '',
			list: [],
			listLoading: false,
			dialogFormVisible: false,
			categoryForm: {},
			currentPage: 1,
			rules: {
				name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
				icon: [{ required: true, message: '请输入分类图标', trigger: 'blur' }]
			}
		}
	},
	mixins: [aMixin],
	mounted() {
		this.getList()
	},
	methods: {
		handleAdd() {
			this.dialogFormVisible = true
		},
		async getList() {
			console.log('111')
			this.listLoading = true
			const { total, list } = await getPageList(this.query)
			this.listLoading = false
			this.total = total
			this.list = list
		},
		async deleteById(id) {
			const { success, message } = await deleteNoteType({ id })
			this.$message[success ? 'success' : 'error'](message)
			this.getList()
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				const { success, message } = await addNoteType({
					id: hashID(),
					...this[formName]
				})
				this.dialogFormVisible = false
				success && this.getList()
				// console.log(res)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.category {
	/* background-color: #000; */
}
</style>	
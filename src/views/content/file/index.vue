<template>
	<el-card class="tag">
		<TableHeader @add="handleAdd" v-model="query.keyword" @search="getList"
			@clear="getList" />

		<el-pagination @size-change="handleSizeChange"
			@current-change="handleCurrentChange($event,getList)" class="t-pagination"
			:current-page.sync="query.page" :page-size="query.size"
			layout="prev, pager, next, jumper" :total="total">
		</el-pagination>

		<!-- 分类处理 -->
		<el-dialog :title="isEdit?'修改':'添加'+'标签'" width="30%"
			:visible.sync="dialogFormVisible" @close="resetForm('tagForm')"
			:close-on-click-modal="false" class="t-dialog" key="tagForm">
			<el-form :model="tagForm" :rules="rules" label-width="80px" ref="tagForm">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="tagForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="标签描述" prop="description">
					<el-input v-model="tagForm.description" type="textarea" autocomplete="off"
						resize="none" :autosize="{ minRows: 3, maxRows: 4}">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer t-btns">
				<el-button type="info" @click="dialogFormVisible = false" class="t-btn">取 消
				</el-button>
				<el-button type="success" @click="submitForm('tagForm')" class="t-btn">
					{{isEdit?'修 改':'添 加'}}
				</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
import { insertOne, editOne, deleteOne, getPageList, API } from '@/api'

import { hashID, deepClone } from '@/utils'
import { aMixin } from '@/mixin'

export default {
	mixins: [aMixin],
	data() {
		return {
			key: '',
			list: [],
			listLoading: false,
			dialogFormVisible: false,
			tagForm: {},
			rules: {
				name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
			},
			isEdit: false
		}
	},
	mounted() {
		this.getList()
	},
	methods: {
		handleAdd() {
			this.isEdit = false
			this.dialogFormVisible = true
			this.tagForm = {}
		},
		async getList() {
			this.listLoading = true
			const { total, list } = await getPageList(API.TAG, this.query)
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
					const { success, message } = await deleteOne(API.TAG, { id })
					this.$message[success ? 'success' : 'error'](message)
					this.getList()
				})
				.catch(() => {})
		},
		editById(row) {
			this.isEdit = true
			this.dialogFormVisible = true
			this.tagForm = deepClone(row)
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (!valid) return
				console.log(this[formName])
				console.log(this.isEdit)
				if (this.isEdit === false) {
					const { success, message } = await insertOne(API.TAG, {
						...this[formName],
						id: hashID()
					})
					this.dialogFormVisible = false
					success && this.getList()
				} else {
					const { success, message } = await editOne(API.TAG, {
						...this[formName]
					})
					this.dialogFormVisible = false
					success && this.getList()
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.tag {
	/* background-color: #000; */
}
</style>	
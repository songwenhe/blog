<template>
	<el-card class="tag">
		<TableHeader @add="handleAdd" v-model="query.keyword" @search="getList"
			@clear="getList" />
		<el-table v-loading=" listLoading" :data="list" element-loading-text="Loading" border
			style="width: 100%" fit highlight-current-row>
			<el-table-column align="center" label="头像" min-width="95">
				<template v-slot={row}>
					{{row.file_url}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="用户名" min-width="95">
				<template v-slot={row}>
					{{row.userName}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="邮箱" min-width="95">
				<template v-slot={row}>
					<div class="t-ellipsis">{{row.email}}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="手机号" min-width="95">
				<template v-slot={row}>
					<div>{{row.phone}}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="状态" min-width="95">
				<template v-slot={row}>
					<el-switch v-model="row.state" active-text="正常" inactive-text="禁用"
						:active-value="1" :inactive-value="0" @change="modifyState($event,row)">
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
					<el-button class="t-btn" type="success" icon="el-icon-edit"
						@click="editById(row)">
					</el-button>
					<el-button slot="reference" class="t-btn" type="danger" icon="el-icon-delete"
						@click="deleteById(row.id)">
					</el-button>
					<el-button slot="reference" class="t-btn" type="primary" icon="el-icon-refresh-right
" @click="resetPassword(row.id)">
					</el-button>

				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange"
			@current-change="handleCurrentChange($event,getList)" class="t-pagination"
			:current-page.sync="query.page" :page-size="query.size"
			layout="prev, pager, next, jumper" :total="total">
		</el-pagination>

		<!-- 分类处理 -->
		<el-dialog :title="isEdit?'修改':'添加'+'标签'" width="30%"
			:visible.sync="dialogFormVisible" @close="resetForm('userForm')"
			:close-on-click-modal="false" class="t-dialog" key="userForm">
			<el-form :model="userForm" :rules="rules" label-width="80px" ref="userForm">
				<el-form-item label="用户头像" prop="file_url">
					<!-- <el-input v-model="userForm.file_url" autocomplete="off"></el-input> -->
					<!-- <el-upload class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload> -->
				</el-form-item>
				<el-form-item label="用户名称" prop="userName">
					<el-input v-model="userForm.userName">
					</el-input>
				</el-form-item>
				<!-- <el-form-item label="用户密码" prop="passWord">
					<el-input type="password" v-model="userForm.passWord">
					</el-input>
				</el-form-item> -->
				<el-form-item label="用户邮箱" prop="email">
					<el-input v-model="userForm.email">
					</el-input>
				</el-form-item>
				<el-form-item label="用户电话" prop="phone">
					<el-input v-model="userForm.phone">
					</el-input>
				</el-form-item>
				<el-form-item label="用户年龄" prop="age">
					<el-input type="number" v-model="userForm.age">
					</el-input>
				</el-form-item>
				<el-form-item label="个人简介" prop="description">
					<el-input v-model="userForm.description" type="textarea" autocomplete="off"
						resize="none" :autosize="{ minRows: 3, maxRows: 4}" F>
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer t-btns">
				<el-button type="info" @click="dialogFormVisible = false" class="t-btn">取 消
				</el-button>
				<el-button type="success" @click="submitForm('userForm')" class="t-btn">
					{{isEdit?'修 改':'添 加'}}
				</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
import {
	insertOne,
	deleteOne,
	API,
	getUser,
	changePassword,
	editUser
} from '@/api'
import { hashID, deepClone } from '@/utils'
import { aMixin } from '@/mixin'

export default {
	data() {
		return {
			key: '',
			list: [],
			listLoading: false,
			dialogFormVisible: false,
			userForm: {},
			rules: {
				name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
			},
			isEdit: false,
			imageUrl: ''
		}
	},
	mixins: [aMixin],
	mounted() {
		this.getList()
	},
	methods: {
		handleAdd() {
			this.isEdit = false
			this.dialogFormVisible = true
		},
		async getList() {
			this.listLoading = true
			const { total, list } = await getUser(API.USER, this.query)
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
					const { success, message } = await deleteOne(API.USER, { id })
					this.$message[success ? 'success' : 'error'](message)
					this.getList()
				})
				.catch(() => {})
		},
		async modifyState(state, { id }) {
			const { success, message } = await editUser(API.USER, {
				id,
				state
			})
			this.$message[success ? 'success' : 'error'](message)
			this.getList()
		},
		editById(row) {
			this.isEdit = true
			this.dialogFormVisible = true
			this.userForm = deepClone(row)
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
					const { success, message } = await insertOne(API.USER, {
						...this[formName],
						id: hashID()
					})
					this.dialogFormVisible = false
					success && this.getList()
				} else {
					const { success, message } = await editUser(API.USER, {
						...this[formName]
					})
					this.dialogFormVisible = false
					success && this.getList()
				}
			})
		},
		async resetPassword(id) {
			this.$confirm('此操作将密码重置为：123456, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			})
				.then(async () => {
					const { success } = await changePassword({ id, password: 123456 })
					this.$message[success ? 'success' : 'error'](message)
					// this.getList()
				})
				.catch((e) => {
					console.log(e)
				})
		}
	},
	handleAvatarSuccess(r) {
		console.log(`r`, r)
	},
	beforeAvatarUpload(r) {
		console.log(`r`, r)
	}
}
</script>

<style lang="scss" scoped>
.tag {
	/* background-color: #000; */
}
</style>	
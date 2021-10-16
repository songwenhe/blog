<template>
	<div class="setting">
		<Card title="账号设置">
			<div class="left">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small"
					label-width="80px" class="ruleForm">
					<el-form-item label="用户账号">
						<el-input v-model="user.userName" readonly></el-input>
					</el-form-item>
					<el-form-item label="旧密码" prop="oldPassword">
						<el-input type="password" v-model="ruleForm.oldPassword"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="password">
						<el-input type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="confirmPassword">
						<el-input type="password" v-model="ruleForm.confirmPassword"></el-input>
					</el-form-item>
				</el-form>
				<div class="btns">
					<button class="btn grey" @click="reset">重置</button>
					<button class="btn" @click="submit">修改密码</button>
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
import Card from './card.vue'
import { deepClone, handleMsg } from '@/utils'
import { changePassword } from '@/api'
export default {
	props: ['user'],
	components: {
		Card
	},
	// mounted() {
	// 	this.ruleForm = deepClone(this.user)
	// },
	// watch: {
	// 	user(val) {
	// 		this.ruleForm = deepClone(val)
	// 	}
	// },
	data() {
		const validatePwd = (rule, value, callback) => {
			// if(val.trim().length === 0)
			if (value.length === 0) return callback(new Error('请输入确认密码'))
			if (value !== this.ruleForm.password) {
				return callback(new Error('两次密码不一致'))
			}
			callback()
		}
		return {
			ruleForm: {
				oldPassword: '',
				password: '',
				confirmPassword: ''
			},
			rules: {
				oldPassword: [
					{ required: true, message: '请输入原密码', trigger: 'blur' }
				],
				password: [
					{ message: '请输入新密码', trigger: 'blur', required: true }
				],
				confirmPassword: [
					{ required: true, validator: validatePwd, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		reset() {
			this.$refs.ruleForm.resetFields()
		},
		submit() {
			this.$refs.ruleForm.validate(async (valid) => {
				if (!valid) return
				const { success, message } = await changePassword({
					id: this.user.id,
					password: this.ruleForm.password
				})
				handleMsg(success, message, () => {
					this.reset()
				})
				console.log(res)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.ruleForm {
}
.btns {
	display: flex;
	justify-content: space-around;
	width: 60%;
	margin: 0 auto;
}
</style>
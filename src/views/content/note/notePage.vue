<template>
	<div class="note-page">
		<div class="header">
			<el-form :model="postForm" :rules="rules" ref="postForm" label-width="100px"
				class="header">
				<div class="img">
					<el-form-item prop="name">
						<img src="http://placeimg.com/640/480/people" alt="" class="img">
					</el-form-item>
				</div>
				<div class="ipt">
					<el-form-item label="活动名称" prop="name">
						<el-select v-model="postForm.type">
							<el-option value="1">1</el-option>
							<el-option value="2">2</el-option>
							<el-option value="3">3</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="活动名称" prop="name">
						<el-input v-model="postForm.name"></el-input>
					</el-form-item>
					<el-form-item label="活动名称" prop="name">
						<el-input v-model="postForm.name"></el-input>
					</el-form-item>
				</div>
			</el-form>

		</div>
		<div class="wangEditor"></div>
		<div class="t-btns">
			<el-button type="info" class="t-btn" @click="back">返回</el-button>
			<el-button type="primary" class="t-btn" @click="sendPost">发布</el-button>
		</div>
	</div>
</template>

<script>
import E from 'wangeditor'
import { aMixin } from '@/mixin'
export default {
	data() {
		return {
			title: '',
			editor: null,
			postForm: {}
		}
	},
	mixins: [aMixin],
	mounted() {
		const editor = new E('.wangEditor')
		editor.create()
		this.editor = editor
	},
	methods: {
		getVal() {
			console.log(this.editor.txt.html())
			console.log(this.editor.txt.text())
		},
		setVal() {
			this.editor.txt.html('<p>sss</p>')
		},
		async sendPost() {
			// const res = await
		}
	},
	beforeDestroy() {
		// 调用销毁 API 对当前编辑器实例进行销毁
		this.editor.destroy()
		this.editor = null
	}
}
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-evenly;
	width: 100%;
	.img {
		max-width: 12.5rem;
		width: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		width: 50%;
	}
}
.wangEditor {
	margin-top: 1.25rem;
}
.t-btns {
	text-align: center;
	margin-top: 2rem;
	.t-btn {
		width: 40%;
		height: 2rem;
	}
}
</style>
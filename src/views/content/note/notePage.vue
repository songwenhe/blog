<template>
	<div class="note-page">
		<el-input v-model="title"></el-input>
		<div class="wangEditor"></div>
		<div class="t-btns">
			<el-button type="info" class="t-btn" @click="back">返回</el-button>
			<el-button type="primary" class="t-btn" @click="setVal">发布</el-button>
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
			editor: null
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
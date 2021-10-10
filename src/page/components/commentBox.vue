<template>
	<div class="comment-box">
		<el-input type="textarea" :autosize="autosize" :value="value" resize="none"
			class="comment-editor" @input="input">
		</el-input>
		<button class="comment-button">提交评论</button>
	</div>
</template>

<script>
import { notEmpty } from '@/utils'
export default {
	props: {
		value: {
			type: String
		},
		isReply: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			editor: null,
			content: ''
		}
	},

	computed: {
		autosize() {
			return this.isReply
				? { minRows: 1, maxRows: 2 }
				: { minRows: 3, maxRows: 4 }
		}
	},
	methods: {
		notEmpty,
		input(v) {
			// console.log(e)
			this.$emit('input', v)
		}
	},
	mounted() {}
}
</script>

<style lang="scss" scoped>
.comment-box {
	::v-deep.comment-editor {
		margin-bottom: 0.1rem;
		.el-textarea__inner {
			border-radius: 0;
			&:hover {
				color: $main-blue-dark;
			}
		}
	}
	.comment-button {
		width: 100%;
		height: 2.5rem;
		background-color: $main-blue-dark;
		color: #fff;
		border: none;
		outline: none;
		cursor: pointer;
		&:hover {
			background-color: $main-blue;
		}
	}
}
</style>
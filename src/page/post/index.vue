<template>
	<div class="pPost w">
		<div class="w content-box">
			<el-input v-model="title" type="text" placeholder="请输入文章标题" class="title-ipt">
			</el-input>
			<div class="editor"></div>
			<button class="btn" :class="isDisabled&&'disabled'" @click="showDialog">发布</button>
		</div>

		<el-dialog title="发布文章" :visible.sync="dialogVisible" width="50%" class="post-dialog">
			<el-alert title="请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容" type="error" :closable="false" />
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"
				class="post-form">
				<el-form-item prop="name" label-width="0" class="cover-item">
					<el-upload class="post-cover" :action="BASE_URL+'file/uploadFile'"
						:show-file-list="false" :on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload" name="files" :data="{owerId:userId}">
						<img v-if="ruleForm.coverImage" :src="_url(ruleForm.coverImage)"
							class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="文章分类" prop="lx">
					<el-select v-model="ruleForm.lx" placeholder="请选择所属分类" filterable>
						<el-option-group v-for="type in _types" :key="type.id" :label="type.name">
							<el-option v-for="item in type.children" :key="item.id" :label="item.name"
								:value="item.id">
							</el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
				<el-form-item label="文章标签" prop="name">
					<el-select v-model="ruleForm.tag" multiple filterable allow-create
						default-first-option placeholder="请选择文章标签">
						<el-option v-for="tag in tags" :key="tag.id" :label="tag.name"
							:value="tag.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="笔记类型" prop="name">
					<el-radio-group v-model="ruleForm.type">
						<el-radio :label="i.type" v-for="i in POST_STATE" :key="i.type">{{i.text}}
						</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="success" @click="dialogVisible = false">保存草稿</el-button>
				<el-button type="primary" @click="dialogVisible = false">发布文章</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import wangEditor from 'wangeditor'
import { notEmpty } from '@/utils'
import { aMixin } from '@/mixin'
import { POST_STATE } from '@/utils/global'
import { mapActions, mapGetters } from 'vuex'
import * as type from '@/store/mutation_types'
export default {
	data() {
		return {
			title: '',
			contentHtml: '',
			dialogVisible: false,
			ruleForm: {},
			rules: {},
			POST_STATE
		}
	},
	mixins: [aMixin],
	computed: {
		...mapGetters(['types', 'userId', 'tags']),
		isDisabled() {
			const title = this.title?.trim()
			const content = this.contentHtml?.trim()
			return !notEmpty(title) || !notEmpty(content)
		},
		_types() {
			const parent = this.types.filter((i) => i.pid === null)
			return parent.map((i) => {
				const children = this.types.filter((j) => j.pid === i.id)
				return {
					...i,
					// hasChildren: children.length !== 0,
					children
				}
			})
		}
	},
	methods: {
		...mapActions('post', [type.FETCH_TYPE, type.FETCH_TAG]),
		showDialog() {
			this.dialogVisible = true
		},
		handleAvatarSuccess(res, file) {
			this.$set(this.ruleForm, 'coverImage', res)
			// console.log('res :>> ', res)
			// console.log('file :>> ', file)
		},
		beforeAvatarUpload() {},
		fetchCategory() {},
		fetchTag() {}
	},
	mounted() {
		this[type.FETCH_TYPE]()
		this[type.FETCH_TAG]()
		const editor = new wangEditor('.editor')
		editor.config.height = 600
		editor.config.onchangeTimeout = 500
		editor.config.onchange = (newHtml) => {
			this.contentHtml = newHtml
		}
		editor.create()
		this.editor = editor
	}
}
</script>

<style lang="scss" scoped>
.content-box {
	padding: 1rem 0;
	.title-ipt {
		margin-bottom: 1rem;
	}
	::v-deep .editor {
		.w-e-toolbar {
			z-index: 1 !important;
		}
		.w-e-text-container {
			z-index: 2 !important;
		}
	}
	.btn {
		margin-top: 1rem;
		cursor: pointer;
		width: 100%;
		height: 40px;
		color: #fff;
		border: none;
		background-color: $main-red-dark;
	}
}
::v-deep .post-dialog {
	.el-dialog__header {
		padding-bottom: 1.5rem;
	}
	.el-dialog__body {
		padding: 0 40px;
	}
	.dialog-footer {
		display: flex;
		justify-content: center;
		button {
			border-radius: 0;
		}
	}
	.post-form {
		padding: 1rem 0;
		.cover-item {
			text-align: center;
			.el-form-item__content {
				line-height: 0;
			}
		}
		.post-cover {
			.el-upload {
				background-color: #f0f0f099;
			}
			.avatar {
				height: 140px;
				width: auto;
			}
		}
	}
}
</style>

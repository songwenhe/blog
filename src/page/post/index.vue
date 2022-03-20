<template>
	<div class="pPost w">
		<div class="w content-box">
			<el-input v-model="title" type="text" placeholder="请输入文章标题" class="title-ipt">
			</el-input>
			<div class="editor"></div>
			<button class="btn" :class="isDisabled&&'disabled'" @click="showDialog">发布</button>
		</div>

		<el-dialog :title="isEdit?'修改文章':'发布文章'" :visible.sync="dialogVisible" width="50%"
			class="post-dialog" @close="clearForm('ruleForm')" key="sendPost">
			<el-alert title="请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容" type="error" :closable="false" />
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"
				class="post-form">
				<el-form-item prop="coverImage" label-width="0" class="cover-item">
					<el-upload class="post-cover" :action="BASE_URL+'file/uploadFile'"
						:show-file-list="false" :on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload" name="files" :data="{owerId:userId}">
						<img v-if="ruleForm.coverImage" :src="_url(ruleForm.coverImage)"
							class="avatar"
							onerror="this.src='http://www.bianbiangou.cn/index/ICON2.png'">
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
				<el-form-item label="文章标签" prop="tag">
					<el-select v-model="ruleForm.tag" placeholder="请选择文章标签" @change="tagChange"
						@keyup="keyup">
						<el-option v-for="tag in tags" :key="tag.id" :label="tag.name"
							:value="tag.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="笔记类型" prop="type">
					<el-radio-group v-model="ruleForm.type">
						<el-radio :label="i.type" v-for="i in POST_STATE" :key="i.type">{{i.text}}
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<template v-if="ruleForm.type === 1">
					<el-form-item label="定价" prop="price">
						<el-input type="number" v-model="ruleForm.price"></el-input>
					</el-form-item>
				</template>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<!-- <el-button type="success" @click="sendPost(0)">保存草稿</el-button> -->
				<el-button type="primary" @click="sendPost(0)">{{isEdit?'修改文章':'发布文章'}}
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import wangEditor from 'wangeditor'
import { notEmpty, handleMsg } from '@/utils'
import { aMixin } from '@/mixin'
import { POST_STATE } from '@/utils/global'
import { mapActions, mapGetters } from 'vuex'
import * as type from '@/store/mutation_types'
import { API, insertOne, getById, editOne, getAllList, notesLike } from '@/api'
import notePageVue from '@/views/content/note/notePage.vue'
export default {
	data() {
		return {
			title: '',
			contentHtml: '',
			dialogVisible: false,
			ruleForm: {
				coverImage: '',
				lx: '',
				tag: '',
				type: '',
				price: ''
			},
			rules: {
				coverImage: [
					{ required: true, message: '请选择笔记封面', trigger: 'blur' }
				],
				lx: [{ required: true, message: '请选择笔记类型', trigger: 'blur' }],
				tag: [{ required: true, message: '请选择笔记标签', trigger: 'blur' }],
				type: [{ required: true, message: '请选择笔记类型', trigger: 'blur' }],
				price: [{ required: true, message: '请输入笔记价格', trigger: 'blur' }]
			},
			POST_STATE,
			tagId: '',
			currentTag: {}
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
		},
		isEdit() {
			return notEmpty(this.$route.query.id)
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
		// todo tag delete add
		tagChange(e) {
			// this.console.log(e)
			this.tagId = e
		},
		removeTag(e) {
			console.log(e)
		},
		beforeAvatarUpload() {},
		fetchCategory() {},
		handleTag() {
			const payload = {
				articleId,
				createTime,
				id,
				tagId,
				updateTime
			}
			this.handleTag.forEach((v) => {})
		},
		sendPost(status) {
			this.$refs.ruleForm.validate(async (valid) => {
				if (!valid) return
				const payload = {
					...this.ruleForm,
					htmlContent: this.contentHtml?.trim(),
					title: this.title?.trim(),
					status,
					userId: this.userId,
					createTime: new Date(),
					updateTime: new Date()
				}
				if (!this.isEdit) {
					const { success, message, data } = await insertOne(API.NOTE, payload)
					handleMsg(success, message, () => {
						this.sendTag(data)
						this.$router.push({ name: 'pIndex' })
					})
					// this.$message[success ? 'success' : 'error'](message)
					this.dialogVisible = false
					this.handleTag()
				} else {
					const { success } = await editOne(API.NOTE, {
						id: this.$route.query.id,
						...this.ruleForm
					})
					handleMsg(success, '修改成功', () => {
						this.sendTag(this.$route.query.id)
						this.$router.push({ name: 'pIndex' })
					})
					this.dialogVisible = false
				}

				// if (success) {
				// }
			})
		},
		async sendTag(articleId) {
			// for (const tagId of this.tagId) {
			// console.log(tag)
			if (!this.isEdit) {
				const res = await insertOne(API.TAG_OPERATE, {
					tagId: this.tagId,
					createTime: Date.now(),
					updateTime: Date.now(),
					articleId
				})
				console.log('添加成功')
			} else {
				console.log(notEmpty(this.currentTag))
				// return
				if (notEmpty(this.currentTag)) {
					const res = await editOne(API.TAG_OPERATE, {
						...this.currentTag,
						tagId: this.tagId,
						updateTime: Date.now()
					})
				} else {
					const res = await insertOne(API.TAG_OPERATE, {
						tagId: this.tagId,
						createTime: Date.now(),
						updateTime: Date.now(),
						articleId
					})
				}
				console.log('修改成功')
			}
			// }
		},
		clearForm(formName) {
			this.$refs[formName].resetFields()
		},
		keyup(e) {
			console.log(e)
		},
		async fetchPost() {
			if (this.isEdit) {
				const { success, data } = await getById(API.NOTE, {
					id: this.$route.query.id
				})
				// console.log(data)
				this.title = data.title
				this.editor.txt.html(data.htmlContent)
				console.log(success, data)
				this.ruleForm.coverImage = data.coverImage
				this.ruleForm.lx = data.lx
				this.ruleForm.type = data.type
				this.ruleForm.price = data.price
			} else {
				this.ruleForm = {}
			}
		},
		async fetchAllTag() {
			if (this.isEdit) {
				const { data } = await getAllList(API.TAG_OPERATE)
				this.currentTag = data.find((i) => i.articleId === this.$route.query.id)
				if (notEmpty(this.currentTag)) {
					this.ruleForm.tag = this.currentTag.tagId
				}
			}
		}
	},
	mounted() {
		this.fetchPost()
		this.fetchAllTag()
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
	/* ::v-deep .editor {
		.w-e-toolbar {
			z-index: 1 !important;
		}
		.w-e-text-container {
			z-index: 2 !important;
		}
	} */
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
			.el-form-item__error {
				left: 50%;
				transform: translateX(-50%);
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

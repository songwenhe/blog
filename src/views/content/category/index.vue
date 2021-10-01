<template>
	<el-card class="category">
		<TableHeader @add="handleAdd" />
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border
			style="width: 100%" fit highlight-current-row>
			<el-table-column align="center" label="分类名称" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类描述" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类图标" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类状态" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="添加事件" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" class-name="t-btns" label="操作" min-width="95">
				<template slot-scope="scope">
					<!-- {{ scope.$index }} -->
					<el-button class="t-btn" type="success" icon="el-icon-edit"></el-button>
					<el-button class="t-btn" type="danger" icon="el-icon-delete"> </el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			class="t-pagination" :current-page.sync="currentPage" :page-size="100"
			layout="prev, pager, next, jumper" :total="1000">
		</el-pagination>
		<!-- 添加笔记 -->
		<el-dialog title="收货地址" width="30%" :visible.sync="dialogFormVisible"
			class="t-dialog">
			<el-form :model="form">
				<el-form-item label="活动名称" placeholder="请选择活动区域">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动名称" placeholder="请选择活动区域">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动名称" placeholder="请选择活动区域">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动名称" placeholder="请选择活动区域">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer t-btns">
				<el-button type="info" @click="dialogFormVisible = false" class="t-btn">取 消
				</el-button>
				<el-button type="primary" @click="dialogFormVisible = false" class="t-btn">确 定
				</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			list: [{}],
			listLoading: false,
			dialogFormVisible: false,
			form: {}
		}
	},
	methods: {
		handleSelectionChange(e) {
			console.log(e)
		},
		handleAdd() {
			this.dialogFormVisible = true
		},
		handleSizeChange(e) {
			console.log(e)
		},
		handleCurrentChange(e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
.category {
	/* background-color: #000; */
}
</style>
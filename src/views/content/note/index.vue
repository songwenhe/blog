<template>
	<el-card class="note">
		<TableHeader @add="handleAdd" />
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border
			ref="multipleTable" tooltip-effect="dark" style="width: 100%"
			@selection-change="handleSelectionChange" fit highlight-current-row>
			<el-table-column align="center" label="标题" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="封面图" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="笔记类型" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="回复数量" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="点赞数量" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建时间" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" min-width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加笔记 -->
		<el-dialog title="收货地址" width="30%" :visible.sync="dialogFormVisible"
			class="t-dialog">
			<el-form :model="form">
				<el-form-item label="活动名称" placeholder="请选择活动区域">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动区域">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			listLoading: false,
			dialogFormVisible: false,
			form: {}
		}
	},
	methods: {
		handleSelectionChange(e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
.note {
	/* background-color: #000; */
}
</style>
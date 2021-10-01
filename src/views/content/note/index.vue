<template>
	<el-card class="note">
		<TableHeader />
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border
			fit highlight-current-row>
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
			<el-table-column align="center" label="发布时间" min-width="95">
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
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			listLoading: false
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.note {
	/* background-color: #000; */
}
</style>
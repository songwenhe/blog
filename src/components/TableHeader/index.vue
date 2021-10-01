<template>
	<div class="table-header">
		<div class="btns">
			<el-button type="primary" icon="el-icon-edit"></el-button>
			<!-- <el-button type="info" icon="el-icon-message"></el-button>
			<el-button type="warning" icon="el-icon-star-off"></el-button> -->
			<el-button type="danger" icon="el-icon-delete"></el-button>
		</div>
		<div class="search">
			<el-input placeholder="请输入内容" v-model="input" clearable>
			</el-input>
			<el-button icon="el-icon-search" type="primary"></el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.table-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0 1.5rem;
	.el-button {
		padding: 0.75rem;
		margin-left: 0;
		margin-right: 0.1rem;
		border-radius: 0;
		transition: all 0.2s linear;
		&--primary {
			background-color: $main-blue;
			/* background-color: transparent; */
		}
		&:hover {
			opacity: 0.6;
		}
	}
	.btns {
		border: 1px solid #f0f0f0;
		border-radius: 0.25rem;
		padding: 0.5rem;
	}
	.search {
		display: flex;
		align-items: center;
		.el-button {
			margin-left: 0.2rem;
		}
	}
}
</style>
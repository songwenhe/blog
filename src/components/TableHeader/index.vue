<template>
	<div class="table-header">
		<div class="t-btns" v-if="showLeft">
			<el-button class="t-btn" type="success" icon="el-icon-plus" @click="$emit('add')">
			</el-button>
			<!-- <el-button class="t-btn" type="danger" plain icon="el-icon-delete"
				@click="$emit('delete')"> </el-button> -->
		</div>
		<div class="search" v-if="showRight">
			<el-input placeholder="请输入内容" :value="value" @input="input" @clear="$emit('clear')"
				clearable>
			</el-input>
			<el-button icon="el-icon-search" type="primary" @click="$emit('search')">
			</el-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showLeft: {
			type: Boolean,
			default: true
		},
		showRight: {
			type: Boolean,
			default: true
		},
		value: {
			type: String
		}
	},
	data() {
		return { search: this.value }
	},
	methods: {
		input(val) {
			this.$emit('input', val)
		}
	}
}
</script>

<style lang="scss" scoped>
.table-header {
	display: flex;
	/* justify-content: space-between; */
	align-items: center;
	padding: 0 0 1.5rem;
	.el-button {
		padding: 0.75rem;
		margin-left: 0;
		margin-right: 0.1rem;
		border-radius: 0;
	}
	.t-btns {
		margin-right: auto;
		border: 1px solid #f0f0f0;
		border-radius: 0.25rem;
		padding: 0.5rem;
	}
	.search {
		margin-left: auto;
		display: flex;
		align-items: center;
		.el-button {
			margin-left: 0.2rem;
		}
	}
}
</style>
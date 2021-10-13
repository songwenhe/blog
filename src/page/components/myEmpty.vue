<template>
	<div class="my-empty">
		<i class="fa" :class="icon" :style="{fontSize:size+'px'}"></i>
		<p class="desc">{{desc}}</p>
	</div>
</template>

<script>
export default {
	name: 'myEmpty',
	props: {
		icon: {
			type: String,
			default: 'fa-file-o'
		},
		size: {
			type: String,
			default: '60'
		},
		desc: {
			type: String,
			default: '暂无数据'
		}
	}
}
</script>

<style lang="scss" scoped>
.my-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40px 0;
	width: 100%;
	background-color: #fafafa;
	color: #999;
	.desc {
		color: #666;
		font-size: 1.1rem;
		letter-spacing: 0.1em;
	}
}
</style>
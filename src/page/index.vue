<template>
	<div class="page">
		<Header />
		<Content />
		<Footer />
	</div>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'
import Content from './content.vue'
export default {
	data() {
		return {}
	},
	components: {
		Header,
		Footer,
		Content
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #f0f0f0;
	display: flex;
	flex-direction: column;
}
.header {
	height: 3.75rem;
}
.content {
	flex: 1;
}
.footer {
	height: 3.75rem;
}
</style>

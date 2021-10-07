<template>
	<header class="header">
		<div class="w">
			<nav class="nav">
				<ul class="nav-list">
					<router-link :to="{name:i.name}" class="nav-item" tag="li"
						v-for="(i,idx) in myNav" :key="idx">
						{{i.meta.title}}
					</router-link>

				</ul>
			</nav>
			<div class="tool">tool</div>
			<div class="info">info</div>
		</div>
	</header>
</template>

<script>
import { notEmpty } from '@/utils'
export default {
	data() {
		return {
			activeIndex: ''
		}
	},
	computed: {
		myNav() {
			const nav = this.$router.options.routes.filter((i) => i.hasPage)[0]
				.children
			return nav.filter((i) => notEmpty(i.meta?.title))
		}
	},
	mounted() {
		console.log('this.$router :>> ', this.$router)
	}
}
</script>

<style lang="scss" scoped>
.header {
	/* height: 3.75rem; */
	background-color: #fff;
	display: flex;
	.w {
		display: flex;
	}
	.nav {
		flex: 3;
		.nav-list {
			display: flex;
			height: 100%;
			.nav-item {
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				/* text-align: center; */
				flex: 1;
				margin: 0 1.25rem;
				font-size: 1rem;
				border-bottom: 2px solid transparent;
				&:hover {
					color: indianred;
				}
				&.router-link-active {
					border-color: indianred;
				}
			}
		}
	}
	.tool {
		flex: 2;
	}
	.info {
		flex: 1;
	}
}
</style>

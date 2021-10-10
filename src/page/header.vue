<template>
	<header class="header">
		<div class="w">
			<nav class="nav">
				<ul class="nav-list">
					<router-link :to="{name:i.name}" class="nav-item" tag="li"
						v-for="(i,idx) in myNav" :key="idx">
						{{i.meta.title}}
					</router-link>

					<!-- <router-link :to="{name:i.name}" class="nav-item" tag="li"
						v-for="(i,idx) in myNav" :key="idx">
						{{i.meta.title}}
					</router-link> -->
					<div v-for="i in fliterList" :key="i.id" class="nav-item">
						<template v-if="notEmpty(i.children)">
							<el-dropdown trigger="click">
								<span class="el-dropdown-link">
									<i class="fa" :class="i.icon"></i>{{i.name}}<i
										class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="j in i.children" :key="j.id">
										<router-link :to="{name:'pList',params:{id:i.id}}" tag="li">
											<span class="fa" :class="j.icon">{{j.name}}</span>
										</router-link>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
						<template v-else>
							<router-link :to="{name:'pList',params:{id:i.id}}" tag="li">
								<span class="fa" :class="i.icon">{{i.name}}</span>
							</router-link>
						</template>
					</div>

				</ul>
			</nav>
			<!-- <div class="tool">tool</div> -->
			<!-- <div class="info">info</div> -->
		</div>
	</header>
</template>

<script>
import { API, getAllList } from '@/api'
import { notEmpty } from '@/utils'
export default {
	data() {
		return {
			activeIndex: '',
			list: []
		}
	},

	computed: {
		myNav() {
			const nav = this.$router.options.routes.filter((i) => i.hasPage)[0]
				.children
			return nav.filter((i) => i.show)
		},
		fliterList() {
			const parent = this.list.filter((i) => i.pid === null)
			const all = parent.map((i) => {
				const children = this.list.filter((j) => j.pid === i.id)
				return {
					...i,
					// hasChildren: children.length !== 0,
					children
				}
			})
			return all
		}
	},
	methods: {
		notEmpty,
		async getList() {
			const { data } = await getAllList(API.NOTE_TYPE)
			this.list = data
		}
	},
	mounted() {
		this.getList()
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
			::v-deep.nav-item {
				min-width: 6.25rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				/* text-align: center; */
				/* flex: 1; */
				margin: 0 1.25rem;
				font-size: 1rem;
				border-bottom: 2px solid transparent;
				&:hover {
					color: indianred;
				}
				&.router-link-active {
					border-color: indianred;
				}
				.el-dropdown {
					font-size: 1rem;
					&:hover {
						color: indianred;
					}
				}
				.fa {
					margin-right: 0.2rem;
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

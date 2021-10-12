<template>
	<header class="header">
		<div class="w">
			<nav class="nav">
				<ul class="nav-list">
					<router-link :to="{name:i.name}" class="nav-item fa"
						:class="['nav-item_'+i.name,i.meta.icon]" tag="li" v-for="(i,idx) in myNav"
						:key="idx">
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
									<el-dropdown-item v-for="j in i.children" :key="j.id"
										class="dropdown-item">
										<router-link :to="{name:'pList',params:{id:i.id}}" tag="li">
											<span class="fa dropdown-text" :class="j.icon">{{j.name}}</span>
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
			<div class="login-box">
				<div class="edit-post">
					<button class="edit-btn" @click="goto"><i class="fa fa-edit"></i>写文章</button>
				</div>
				<el-dropdown trigger="click" class="login-dropdown" @command="handleCommand">
					<span class="el-dropdown-link">
						<img src="http://placeimg.com/640/480/city" alt="" class="login-avatar"><i
							class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="info"><i class="fa fa-sign-out"></i>个人中心
						</el-dropdown-item>
						<el-dropdown-item command="logout"><i class="fa fa-user-o"></i>退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<!-- <div class="info">info</div> -->
		</div>
	</header>
</template>

<script>
import { API, getAllList } from '@/api'
import { notEmpty } from '@/utils'
import { mapActions } from 'vuex'
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
		...mapActions('user', ['logout']),
		notEmpty,
		async getList() {
			const { data } = await getAllList(API.NOTE_TYPE)
			this.list = data
		},
		handleCommand(e) {
			if (e === 'info') {
				this.$router.push({ name: 'pInfo' })
			} else {
				this.$router.replace({ name: 'login' })
			}
		},
		goto() {
			this.$router.push({ name: 'pPost' })
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
		.nav-list {
			display: flex;
			height: 100%;
			/* .nav-item_ */
			::v-deep.nav-item {
				min-width: 5.25rem;
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
				.fa {
					margin-right: 0.2rem;
				}
				.el-dropdown-link {
					font-size: 1rem;
					color: #000;
				}
			}
			.nav-item_pIndex {
				order: -1;
			}
			.nav-item_pMusic {
				order: 1;
			}
		}
	}
	.login-box {
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.edit-post {
			display: flex;
			align-items: center;
			padding-right: 4rem;
			.edit-btn {
				width: 120px;
				height: 36px;
				background-color: transparent;
				border: 1px solid $main-red;
				outline: none;
				color: $main-red;
				&:hover {
					color: $main-white;
					cursor: pointer;
					background-color: $main-red-dark;
				}
			}
		}
		.login-dropdown {
			cursor: pointer;
			.el-dropdown-link {
				display: flex;
				align-items: center;
			}
			.login-avatar {
				width: 36px;
				height: 36px;
			}
		}
	}
}
</style>

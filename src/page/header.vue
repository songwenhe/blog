<template>
  <header class="header">
    <div class="w">
      <!-- <div class="logo">
				考研文章分享系统
			</div> -->
      <nav class="nav">
        <ul class="nav-list">
          <router-link
            :to="{ name: i.name }"
            class="nav-item fa"
            :class="['nav-item_' + i.name, i.meta.icon]"
            tag="li"
            v-for="(i, idx) in myNav"
            :key="idx"
          >
            {{ i.meta.title }}
          </router-link>
        </ul>
      </nav>
      <div class="search-box">
        <el-input placeholder="搜索文章..." v-model="keyword">
          <i
            slot="suffix"
            class="fa fa-search"
            :class="{ disabled: !isSearch }"
            @click="search"
          ></i>
        </el-input>
      </div>
      <div class="login-box">
        <template v-if="isLogin">
          <div class="edit-post">
            <button class="edit-btn" @click="goto">
              <i class="fa fa-edit"></i>写文章
            </button>
          </div>
          <el-dropdown
            trigger="click"
            class="login-dropdown"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <img
                :src="file_url(currentUser.fileUrl)"
                alt=""
                class="login-avatar"
                onerror="this.src='http://www.bianbiangou.cn/index/ICON2.png'"
              /><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info"
                ><i class="fa fa-sign-out"></i>个人中心
              </el-dropdown-item>
              <el-dropdown-item command="home" v-if="isAuth"
                ><i class="fa fa-home"></i>后台系统
              </el-dropdown-item>
              <el-dropdown-item command="logout"
                ><i class="fa fa-user-o"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <div v-else>
          <button class="login-btn" @click="gotoLogin">登录</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { API, getAllList } from "@/api";
import { notEmpty, file_url } from "@/utils";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: "",
      list: [],
      keyword: "",
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
    myNav() {
      const nav = this.$router.options.routes.filter((i) => i.hasPage)[0]
        .children;
      return nav.filter((i) => i.show);
    },
    fliterList() {
      const parent = this.list.filter(
        (i) => i.pid === null && i.available === 1
      );
      const all = parent.map((i) => {
        const children = this.list.filter(
          (j) => j.pid === i.id && i.available === 1
        );
        return {
          ...i,
          // hasChildren: children.length !== 0,
          children,
        };
      });
      return all;
    },
    isAuth() {
      return this.currentUser?.state === 1;
    },
    isLogin() {
      return notEmpty(this.currentUser);
    },
    isSearch() {
      return this.keyword.trim().length > 0;
    },
  },
  methods: {
    ...mapActions("user", ["logout"]),
    notEmpty,
    file_url,
    async getList() {
      const { data } = await getAllList(API.NOTE_TYPE);
      this.list = data;
    },

    search() {
      this.$router.push({
        name: "pSearch",
        params: { id: this.keyword.trim() },
      });
    },
    handleCommand(e) {
      if (e === "info") {
        this.$router.push({ name: "pInfo" });
      } else if (e === "home") {
        this.$router.push({ name: "Home" });
      } else {
        this.logout().then(() => {
          localStorage.clear();
          // location.reload()
          this.$router.replace("/");
        });
      }
    },
    goto() {
      this.$router.push({ name: "pPost" });
    },
    gotoLogin() {
      this.$router.push({ name: "logign" });
    },
  },
  watch: {},
  mounted() {
    this.getList();
    console.log("this.$router :>> ", this.$router);
  },
};
</script>

<style lang="scss" scoped>
.header {
  /* height: 3.75rem; */
  background-color: #fff;
  display: flex;
  .w {
    display: flex;
    align-items: center;
    .logo {
      font-size: 24px;
      color: indianred;
      text-shadow: 3px 0px 1px #f2eaea4a;
    }
  }
  .nav {
    align-self: stretch;

    .nav-list {
      display: flex;
      height: 100%;
      /* .nav-item_ */
      ::v-deep.nav-item {
        height: 100%;
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
  ::v-deep.search-box {
    padding-left: 20px;
    display: flex;
    align-items: center;
    flex: 1;
    .el-input__inner {
      border-radius: 0;
      height: 36px;
      background-color: #fafafa;
      &:focus {
        border-color: $main-red;
        background-color: #fff;
      }
    }
    .el-input__suffix {
      display: flex;
      align-items: center;
      .fa {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        /* background-color: rgba($color: $main-red, $alpha: 0.6); */
        font-size: 20px;
        width: 30px;
        height: 30px;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
        &::before {
          color: $main-black;
          margin-right: 0;
        }
      }
      /* top: 50%; */
      /* transform: translateY(-50%); */
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
      padding: 0 10px;
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
    .login-btn {
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
}
</style>

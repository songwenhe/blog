<template>
  <div class="info">
    <template v-if="!only">
      <div class="top-banner">
        <div class="brief">
          <div class="img-box mask">
            <img
              :src="file_url(user.fileUrl)"
              alt=""
              onerror="this.src='http://www.bianbiangou.cn/index/ICON2.png'"
            />
            <el-upload
              class="icon avatar-uploader"
              :action="BASE_URL + 'file/uploadFile'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="files"
              :data="{ owerId: user.userId }"
            >
              <i class="fa fa-camera-retro"></i>
              <p>修改我的头像</p>
            </el-upload>
          </div>
          <div class="content">
            <p class="title">{{ user.userName }}</p>
            <p class="desc">
              {{ user.description || "这个人太懒了，没有简介" }}
            </p>
            <p class="time">
              {{
                user.createTime ? user.createTime : user.updateTime | formatDate
              }}
              <span>加入</span>
            </p>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <el-tabs tab-position="right" class="my-tabs" v-model="activeTab">
          <el-tab-pane label="个人资料" :lazy="true" name="myInfo" key="myInfo">
            <myInfo :user="user" @updateUser="updateUser"></myInfo>
          </el-tab-pane>
          <el-tab-pane
            label="账号设置"
            :lazy="true"
            name="setting"
            key="setting"
          >
            <setting :user="user"></setting>
          </el-tab-pane>
          <el-tab-pane label="我的文章" :lazy="true" name="myNote" key="myNote">
            <myNote :id="user.id"></myNote>
          </el-tab-pane>
          <el-tab-pane label="我的购买" :lazy="true" name="myPay" key="myPay">
            <myPay :id="user.id"></myPay>
          </el-tab-pane>
          <el-tab-pane
            label="收藏文章"
            :lazy="true"
            name="starNote"
            key="starNote"
          >
            <starNote :user="user" :userlist="userlist"></starNote>
          </el-tab-pane>
          <el-tab-pane
            label="我的关注"
            :lazy="true"
            name="myFollow"
            key="myFollow"
          >
            <myFollow :user="user"></myFollow>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template v-else>
      <div class="info-box">
        <h1>
          {{ user.userName }}
          <el-link type="primary" @click="back">我的信息</el-link>
        </h1>
        <myInfo :user="user" @updateUser="updateUser" :only="only"></myInfo>
      </div>
    </template>
  </div>
</template>

<script>
import myInfo from "./myInfo";
import setting from "./setting";
import myNote from "./myNote";
import payList from "./payList";
import starNote from "./starNote";
import myPay from "./myPay";
import myFollow from "./myFollow";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { deepClone, file_url, handleMsg, notEmpty } from "@/utils";
import { BASE_URL } from "@/utils/global";
import { API, editUser, getById } from "@/api";
import * as types from "@/store/mutation_types";
export default {
  components: {
    myInfo,
    setting,
    myNote,
    payList,
    starNote,
    myFollow,
    myPay,
  },
  data() {
    return {
      activeTab: "myInfo",
      BASE_URL,
      user: {},
      // only: false
    };
  },
  computed: {
    ...mapGetters(["currentUser", "userlist", "userId"]),
    id() {
      return this.$route.query.id;
    },
    only() {
      return notEmpty(this.id);
    },
  },
  mounted() {
    this.fetchUser();
    this[types.FETCH_USER]();
  },
  watch: {
    "$route.query.id"(id) {
      // if (notEmpty(id)) {
      this.fetchUser();
      // }
    },
  },
  methods: {
    ...mapMutations("user", [types.SET_CRTUSER]),
    ...mapActions("user", [types.FETCH_USER]),
    file_url,
    async handleAvatarSuccess(res, file) {
      this.$set(this.user, "fileUrl", res);
      // this._avatar = res
      const { success, message } = await editUser({
        id: this.user.id,
        fileUrl: res,
      });
      handleMsg(success, "", () => {
        this.updateUser(this.user);
      });
    },
    updateUser(user) {
      this[types.SET_CRTUSER](user);
    },
    beforeAvatarUpload() {},
    async fetchUser() {
      // if(this.userId)
      let id = this.only ? this.id : this.userId;
      console.log(id);
      const { data } = await getById(API.USER, { id });
      this.user = data;
    },
    back() {
      this.$router.replace("/page/info");
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  .top-banner {
    margin-top: 8px;
    width: 250px;
    height: 500px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
    display: flex;
    .brief {
      height: 125px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .img-box {
        position: relative;

        border: 4px solid #fff;
        left: 12.5%;
        width: 200px;
        height: 200px;

        // transform: translateY(-50%);
        .icon {
          display: none;
          cursor: pointer;
          position: absolute;
          flex-direction: column;
          align-items: center;
          content: "";
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #f0f0f0;
          font-size: 30px;
          p {
            white-space: nowrap;
            margin-top: 10px;
            font-size: 14px;
          }
          .fa-upload {
            font-size: 30px;
          }
        }
        &.mask {
          &:hover:before {
            border-radius: 50%;
            cursor: pointer;
            position: absolute;
            content: "";
            background-color: rgba(0, 0, 0, 0.5);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
        &:hover {
          .icon {
            display: flex;
          }
        }
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        .title {
          margin: 20px auto;
          font-size: 26px;
          font-weight: 600;
        }
        .desc {
          margin: 20px;
          font-size: 18px;
        }
        .time {
          margin: 20px;
          font-size: 12px;
          span {
            margin-left: 5px;
          }
        }
        /* &.mask {
				
				} */
      }
    }
  }
  ::v-deep.my-tabs {
    padding: 8px;
    .el-tabs__nav {
      width: 190px;
    }
    .el-tabs__active-bar {
      background-color: transparent;
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }
    .el-tabs__item {
      height: 48px;
      width: 100%;
      background-color: #fff;
      color: $main-black;
      text-align: center;
      &:hover {
        background: #f0f0f0;
        font-weight: 500;
        color: #222226;
      }
      &.is-active {
        border-color: transparent;
        background: #f0f0f5;
        font-weight: 500;
        color: #222226;
      }
    }
  }
}

.info-box {
  padding: 10px;
}
</style>
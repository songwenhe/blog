<template>
  <div class="pay-detail w">
    <div class="top-box">
      <div class="cover">
        <img
          :src="file_url(currentPost.coverImage)"
          alt=""
          onerror="this.src='https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3a0a404b0e2424ca80703bb12d26b41~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp'"
        />
      </div>
      <div class="info" v-if="notEmpty(currentPost) && notEmpty(currentAuthor)">
        <h3 class="title">
          {{ currentPost.title }}
          <el-link
            type="primary"
            @click="goto"
            :style="{ fontSize: '20px' }"
            v-if="isAuthor"
            >编辑</el-link
          >
        </h3>
        <p class="author">讲师：{{ currentAuthor.userName }}</p>
        <p class="price">
          <i class="fa fa-jpy"></i>{{ currentPost.price | toX }}
        </p>
        <div class="btns">
          <button class="btn" @click="pay">立即购买</button>
        </div>
      </div>
    </div>
    <div class="alipay-box"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { file_url, hashID, notEmpty } from "@/utils";
import * as type from "@/store/mutation_types";
import { alipay, insertOne, API, getById, starNoteList } from "@/api";
export default {
  props: ["id"],
  data() {
    return {
      currentPost: {},
      isPurchase: false,
    };
  },
  computed: {
    ...mapGetters(["userlist", "userId", "currentUser"]),
    currentAuthor() {
      return this.userlist.find((i) => i.id === this.currentPost.userId);
    },
    isLogin() {
      return notEmpty(this.currentUser);
    },
    isAuthor() {
      return this.currentAuthor.id && this.currentAuthor.id === this.userId;
    },
  },
  mounted() {
    this.fetchPost();
    this.fetchMyOrder();
    this[type.FETCH_USER]();
  },
  methods: {
    file_url,
    notEmpty,
    ...mapActions("user", [type.FETCH_USER]),
    goto() {
      this.$router.push({ name: "pPost", query: { id: this.currentPost.id } });
    },
    async fetchPost() {
      const { data } = await getById(API.NOTE, { id: this.id });
      this.currentPost = data;
    },
    async fetchMyOrder() {
      const { data } = await starNoteList({ id: this.userId, type: 2 });
      const res = data.map((i) => Object.values(i)[0]);
      // const res = data?.find((i) => i.id === this.id)
      // console.log(res)
      this.isPurchase = res.findIndex((i) => i.id === this.id) !== -1;
    },
    async pay() {
      if (!this.isLogin) return this.$message.error("请先登录!");
      if (this.isAuthor) return this.$message.error("不能购买自己文章");
      if (this.isPurchase) return this.$message.error("不能重复购买");
      const html = await alipay({
        out_trade_no: hashID(32),
        total_amount: this.currentPost.price,
        subject: "sadsad",
      });
      // this.$message.success('购买成功')
      const div = document.createElement("div");
      div.innerHTML = html;

      document.body.appendChild(div);
      const forms = document.forms;
      let len = forms.length - 1;
      document.forms[len].setAttribute("target", "_blank");
      document.forms[len].submit();
      document.body.removeChild(div);

      const result = await insertOne(API.FOCUSON, {
        createTime: new Date(),
        memberId: this.id,
        type: 2,
        userId: this.userId,
      });
      this.fetchMyOrder();
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-detail {
  padding-top: 20px;
  .top-box {
    display: flex;
    padding: 20px;
    background-color: #fff;
    .cover {
      img {
        height: 240px;
        width: 240px;
        /* height: 100%; */
      }
    }
    .info {
      padding-left: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 24px;
        color: #333;
        line-height: 1.2;
        font-weight: normal;
        margin: 0;
      }
      .author {
        font-size: 14px;
        color: #666;
      }
      .price {
        margin-bottom: auto;
        color: #333;
        font-size: 28px;
        font-family: "微软雅黑";
      }
      .btns {
        .btn {
          color: white;
          font-size: 20px;
          line-height: 40px;
          line-height: 40px;
          width: 140px;
          text-align: center;
          outline: none;
          border: none;
          background-color: $main-red;
          vertical-align: middle;
          display: inline-block;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="pay">
    <div class="w pay-box">
      <h3>付费专区</h3>
      <el-row>
        <el-col
          :span="8"
          v-for="i in list"
          :key="i.id"
          :offset="index > 0 ? 2 : 0"
          class="pay-item"
        >
          <el-card :body-style="{ padding: '0px' }" class="pay-box">
            <div class="pay-item-box">
              <div class="img-box">
                <img
                  :src="file_url(i.coverImage)"
                  alt=""
                  @click="gotoDetail(i)"
                  onerror="this.src='https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3a0a404b0e2424ca80703bb12d26b41~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp'"
                />
              </div>
              <div class="content-box">
                <div class="title-box">
                  <span class="warp">新品</span>
                  <p class="title" @click="gotoDetail(i)">{{ i.title }}</p>
                </div>
                <p class="tag">{{ i.title }}</p>
                <div class="info">
                  <span class="author">{{ findUserById(i.userId) }}</span>
                  <span class="date"
                    >日期：{{ i.createTime | formatDate }}</span
                  >
                </div>
                <div class="pay-price">
                  <span><em class="fa fa-jpy"></em>{{ i.price | toX }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { API, getPageList } from "@/api";
import { file_url } from "@/utils";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as type from "@/store/mutation_types";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this[type.FETCH_USER]();
    this.getPayList();
  },
  computed: {
    ...mapGetters(["userlist", `user/${type.GET_USER}`]),
  },
  methods: {
    file_url,
    ...mapMutations("post", [type.SET_CURRENT_POST]),
    ...mapActions("user", [type.FETCH_USER]),
    async getPayList() {
      const { list, total } = await getPageList(API.NOTE, {
        type: 1,
        size: 999,
        status: 1,
      });
      this.list = list;
      // console.log(res)
    },
    findUserById(id) {
      const user = this[`user/${type.GET_USER}`](id);
      return user?.userName ?? "default";
    },
    gotoDetail(item) {
      // this[type.SET_CURRENT_POST](item)
      this.$router.push({ name: "pPayDetail", params: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-box {
  h3 {
    font-size: 24px;
    color: #333;
    height: 31px;
    line-height: 31px;
  }
  .pay-item {
    overflow: hidden;
    width: 100%;
    padding: 0 0.5%;
    .pay-box {
      margin-bottom: 20px;
      .pay-item-box {
        display: flex;
        background-color: #fff;
        border-radius: 0.625rem;
        overflow: hidden;
        width: 100%;
        height: 100%;
        .img-box {
          margin-right: 16px;
          height: 210px;
          // max-height: 12.5rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            /* margin: 0 -0.625rem; */
          }
        }
        .content-box {
          padding: 0 14px;
          .title-box {
            display: flex;
            align-items: center;
            .warp {
              margin-right: 10px;
              padding: 0 6px;
              color: #fff;
              border-radius: 2px;
              background-color: red;
              font-size: 14px;
              line-height: 22px;
            }
            .title {
              font-size: 20px;
              line-height: 28px;
            }
          }

          .info {
            display: flex;
            padding: 8px 0;
            color: #666;
            height: 17px;
            font-size: 12px;

            .date {
              margin-left: 10px;
            }
          }
          .pay-price {
            color: #ff1d00;
            text-align: left;
            padding: 32px 0 16px;
            // margin-right: 10px;
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
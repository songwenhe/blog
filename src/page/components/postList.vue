<template>
  <div class="post-list">
    <template v-if="notEmpty(list)">
      <div class="item" v-for="i in list" :key="i.id">
        <div class="info">
          <div class="like num-card">
            <span>{{ i.likeNum || 0 }}</span>
            <span>投票</span>
          </div>
          <div class="reply num-card">
            <span>{{ i.replyNum || 0 }}</span>
            <span>回答</span>
          </div>
          <div class="view num-card">
            <span>{{ i.view || 0 }}</span>
            <span>阅读</span>
          </div>
        </div>
        <div class="cover">
          <div class="title">
            <el-button type="text" class="btn" @click="handleClick(i)">
              {{ i.title }}
            </el-button>
          </div>
          <div class="other">
            <div class="tag">
              <el-button size="mini" class="btn" @click="handleClick(i)" plain>
                {{ i.title }}
              </el-button>
            </div>
            <div class="author">
              <span>{{ getName(i.userId) }}</span>
              <span
                ><i class="fa fa-clock-o"></i>
                {{ i.createTime | formatDate }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <myEmpty desc="暂无文章" />
    </template>
  </div>
</template>

<script>
import { notEmpty } from "@/utils";
import myEmpty from "@/page/components/myEmpty.vue";
import { mapGetters, mapActions } from "vuex";
import * as type from "@/store/mutation_types";
export default {
  name: "postList",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  components: {
    myEmpty,
  },
  computed: {
    ...mapGetters("post", [type.GET_TYPE]),
  },
  methods: {
    ...mapActions("post", [type.FETCH_TYPE]),
    notEmpty,
    _url(path) {
      return this.IMG_URL + path;
    },
    handleClick(e) {
      this.$emit("handle", e);
    },
    getName(id) {
      console.log(this[type.GET_TYPE](id));
      return this[type.GET_TYPE](id)?.name || "无名";
    },
  },
  mounted() {
    this[type.FETCH_TYPE]();
  },
};
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
  /* background-color: #fff; */
  .item {
    padding: 1rem;
    background-color: #fff;
    margin-bottom: 1.25rem;
    display: flex;
    border-radius: 0.125rem;
    @include box_shadow; /* box-shadow: 1px 2px 2px 2px #0002; */
    .info {
      display: flex;
      .num-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
        padding: 5px;
      }
      .like {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
      }
      .reply {
        color: #008050;
        border-radius: 5px;
        border: 1px solid #008050;
      }
      .view {
        color: #ac560e;
      }
    }
    .cover {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0.625rem;
      width: 8rem;
      overflow: hidden;
      .title {
        .btn {
          color: #212529;
          font-size: 1.875rem;
        }
      }
      .other {
        display: flex;
        justify-content: space-between;
        .tag {
          .btn {
            font-size: 0.875rem;
            color: #005a38;
            background-color: #e5f4ef;
          }
        }
        .author {
          display: flex;
          align-items: center;
          .fa {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="label-container">
    <div class="w">
      <div class="top">
        <el-row>
          <el-col>
            <h4>标签</h4>
            <p class="text">
              标签不仅能组织和归类你的内容，还能关联相似的内容。正确的使用标签将让你的内容被更多人发现和解决。
            </p>
            <div class="search-box">
              <el-input
                placeholder="搜索标签"
                v-model="params.keyword"
                @change="search"
              >
                <i slot="suffix" class="fa fa-search"></i>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tags">
        <el-row :gutter="20">
          <el-col :span="6" v-for="i in list" :key="i.id">
            <el-card :body-style="{ padding: '10px' }" class="tag-card">
              <div style="padding: 14px" class="tag-box">
                <router-link :to="{ name: 'pList', params: { id: i.id } }">
                  <span class="fa dropdown-text" :class="i.icon">{{
                    i.name
                  }}</span>
                </router-link>
                <div class="top">
                  <p>{{ i.description ? i.description : "暂无" }}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { API, getPageList } from "@/api";

export default {
  data() {
    return {
      params: {
        size: 999,
        page: 1,
        keyword: "",
      },
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const data = await getPageList(API.TAG, this.params);
      this.list = data.list;
    },
    search() {
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 70px;
  h4 {
    font-weight: 700;
    font-size: 24px;
  }
  ::v-deep.search-box {
    width: 200px;
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
}
.tags {
  margin-top: 20px;
  .tag-card {
    margin-bottom: 20px;
    .tag-box {
      span {
        background-color: #cce2da;
        color: #00965e;
        padding: 5px;
        border-radius: 2px;
        height: 25px;
        line-height: 15px;
        text-align: center;
      }
    }
  }
}
</style>
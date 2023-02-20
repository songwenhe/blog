<template>
  <el-card class="note">
    <TableHeader
      @add="handleAdd"
      :showLeft="false"
      v-model="query.keyword"
      @search="getList"
      @clear="getList"
    />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="封面图" min-width="95">
        <template v-slot="{ row }">
          <el-avatar
            shape="square"
            :size="80"
            :src="_url(row.coverImage)"
            v-if="row.coverImage"
          ></el-avatar>
          <el-avatar shape="square" :size="80" v-else></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" min-width="120">
        <template v-slot="{ row }">
          <div class="t-ellipsis">{{ row.title }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="文章分类" min-width="120">
        <template v-slot="{ row }">
          <el-tag type="primary">{{ getName(row.lx) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章类型" min-width="95">
        <template v-slot="{ row }">
          <el-tag
            :type="['danger', 'primary', 'success'][row.type]"
            effect="dark"
          >
            {{ findStateById(row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="统计" min-width="95">
        <template v-slot="{ row }">
          <p>评论： {{ row.replyNum || 0 }}</p>
          <p>点赞： {{ row.likeNum || 0 }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章状态" min-width="95">
        <template v-slot="{ row }">
          <el-tag effect="dark" :type="['primary', 'success'][row.status]">
            {{ BASE_POST_STATE[row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="120">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template v-slot="{ row }">
          <div class="t-btns">
            <el-link
              type="primary"
              @click="handleNote(row)"
              style="marginright: 8px"
              >审核文章
            </el-link>
            <el-link type="danger" @click="deleteById(row.id)"
              >删除文章</el-link
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange($event, getList)"
      class="t-pagination"
      :current-page.sync="query.page"
      :page-size="query.size"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title=""
      width="30%"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      custom-class="t-dialog"
    >
      <div class="note-box">
        <h2 class="note-title">
          {{ currentPost.title }}
        </h2>
        <!-- <div class="notes-tool">
					<el-tag type="primary">{{currentPost.lxName}}</el-tag>
					<span>{{currentPost.createTime}}</span>
				</div> -->
        <div class="note-content" v-html="currentPost.htmlContent"></div>
      </div>
      <div slot="footer" class="dialog-footer t-btns">
        <el-button type="info" @click="dialogFormVisible = false" class="t-btn"
          >取 消
        </el-button>
        <el-button type="success" @click="handleAudit" class="t-btn">
          {{ currentPost.status === 0 ? "发 布" : "下架" }}
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  insertOne,
  editOne,
  deleteOne,
  getAllList,
  getPageList,
  API,
} from "@/api";
import { aMixin } from "@/mixin";
import { POST_STATE, BASE_POST_STATE } from "@/utils/global";
import { mapGetters, mapActions, mapMutations } from "vuex";
import * as type from "@/store/mutation_types";
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {},
      BASE_POST_STATE,
      currentPost: {},
    };
  },
  mixins: [aMixin],
  computed: {
    ...mapGetters("post", [type.GET_TYPE]),
  },
  methods: {
    ...mapActions("post", [type.FETCH_TYPE]),
    ...mapMutations("post", [type.SET_CURRENT_POST]),
    getName(id) {
      return this[type.GET_TYPE](id)?.name ?? "unkonw";
    },
    findStateById(type) {
      return POST_STATE.find((i) => i.type === type)?.text ?? "unkown";
    },
    async handleAudit() {
      const status = this.currentPost.status === 0 ? 1 : 0;
      const { success } = await editOne(API.NOTE, {
        id: this.currentPost.id,
        status,
      });
      if (success) {
        this.$message.success(["下架成功", "发布成功"][status]);
        this.getList();
      }
      this.dialogFormVisible = false;
    },
    async getList() {
      this.listLoading = true;
      const { total, list } = await getPageList(API.NOTE, this.query);
      this.listLoading = false;
      this.total = total;
      this.list = list;
    },
    async deleteById(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const { success, message } = await deleteOne(API.NOTE, { id });
          this.$message[success ? "success" : "error"](message);
          this.getList();
        })
        .catch(() => {});
    },
    editById(row) {
      this.SET_CURRENT_POST(row);
      this.$router.push({ name: "NoteDetail", params: { id: row.id } });
    },
    handleAdd() {
      this.$router.push({ name: "NoteDetail" });
    },
    handleNote(row) {
      this.dialogFormVisible = true;
      // const lx = this[type.GET_TYPE](row.lx)
      // this.currentPost = { ...row, lxName: lx.name }
      this.currentPost = row;
    },
  },
  mounted() {
    this[type.FETCH_TYPE]();
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.note {
  /* background-color: #000; */
  ::v-deep.el-dialog {
    .el-dialog__body {
      padding: 0;
    }
  }
  .note-box {
    padding: 10px 20px;
    .note-title {
      margin: 0 0 10px;
      font-size: 30px;
    }
    .note-content {
      border-radius: 4px;
      background-color: #f0f0f0;
      border: 1px solid #f0f0f0;
      padding: 10px;
    }
  }
}
</style>
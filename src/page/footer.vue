<template>
  <div class="footer">
    <div class="w">
      <div v-for="i in fliterList" :key="i.id" class="nav-item">
        <template v-if="notEmpty(i.children)">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="fa" :class="i.icon"></i>{{ i.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="j in i.children"
                :key="j.id"
                class="dropdown-item"
              >
                <router-link
                  :to="{ name: 'pList', params: { id: j.id } }"
                  tag="li"
                >
                  <span class="fa dropdown-text" :class="j.icon">{{
                    j.name
                  }}</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link :to="{ name: 'pList', params: { id: i.id } }" tag="li">
            <span class="fa" :class="i.icon">{{ i.name }}</span>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { API, getAllList } from "@/api";
import { notEmpty, file_url } from "@/utils";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return { activeIndex: "", list: [], keyword: "" };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(["currentUser"]),
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
  },
  methods: {
    notEmpty,
    async getList() {
      const { data } = await getAllList(API.NOTE_TYPE);
      this.list = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  margin-bottom: 30px;
  .w {
    display: flex;
    align-items: center;
  }
  .nav-item {
    height: 100%;
    min-width: 5.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* flex: 1; */
    margin: 0 1.25rem;
    font-size: 1rem;
    border-bottom: 2px solid transparent;
    .fa {
      margin-right: 0.2rem;
    }
    .el-dropdown-link {
      font-size: 1rem;
      color: #000;
    }
  }
}
</style>

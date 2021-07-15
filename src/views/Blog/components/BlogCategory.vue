<template>
  <div class="blog-category" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategories } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  //总数据量为articleCount每个分类下的数据*分类数
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalarticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: "全部", id: -1, articleCount: totalarticleCount },
        ...this.data,
      ];
      //返回数据 需要获取数据id
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogCategories(); //获取文章分类
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      //跳转全部页
      if (item.id === -1) {
        this.$router.push({
          name: " Blog",
          query,
        });
      }
      //跳转到分类页
      else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category {
  width: 250px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  h2 {
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 0;
  }
}
</style>
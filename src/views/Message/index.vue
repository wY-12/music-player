<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      @submit="handleSubmit"
      :isListLoading="isLoading"
    />
  </div>
</template>

<script>
import MessageArea from "@/Components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import * as MessageApi from "@/api/message";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    this.$refs.messageContainer.addEventListener(
      "scroll",
      this.handleMainScroll
    );
  },
  beforeDestroy() {
    this.$refs.messageContainer.removeEventListener(
      "scroll",
      this.handleMainScroll
    );
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleMainScroll() {
      this.$bus.$emit("mainScroll", this.$refs.messageContainer);
    },
    async fetchData() {
      return await MessageApi.getMessage(this.page, this.limit);
    },

    //加载更多
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = dom.scrollTop + dom.clientHeight - dom.scrollHeight;
      if (dec <= range) {
        this.fetchMore();
      }
    },
    //提交评论
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(data, callback) {
      const resp = await MessageApi.postMessage(data);
      callback("感谢留言");
      this.data.rows.unshift(resp);
    },
  },
};
</script>

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
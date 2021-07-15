<template>
  <div class="page-container">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;
    </a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;
    </a>
    <a
      v-for="(n, i) in numbers"
      :key="i"
      @click="handleClick(n)"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;
    </a>
    <a
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;|
    </a>
  </div>
</template>

<script>
export default {
  props: {
    //当前页码
    current: {
      type: Number,
      default: 1,
    },
    //总数量
    total: {
      type: Number,
      default: 0,
    },
    //页容量
    limit: {
      type: Number,
      default: 10,
    },
    //可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    //总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    //最小页数 当前页码 - 可见页码的一班
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },

    //最大页数  最小页数 + 可见页码数-1
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    //获取页码量 页面格式
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleClick(newpage) {
      if (newpage < 1) {
        newpage = 1;
      }
      if (newpage > this.pageNumber) {
        newpage = this.pageNumber;
      }
      if (newpage === this.current) {
        return;
      }

      this.$emit("pageChange", newpage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.page-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;

  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">{{
        item.name
      }}</span>
      <span
        v-if="item.aside"
        @click="handleClick(item)"
        :class="{ active: item.isSelect }"
        class="articleCount"
        >{{ item.aside }}</span
      >
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
//制作右边栏的分类项目
export default {
  //组件递归
  name: "RightList",
  props: {
    //需要传入[ name:分类的名称 isSelect:true 是否选中  children:[]]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      //抛出事件

      this.$emit("select", item);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1.5em;
  }
  .articleCount {
    font-size: 12px;
    margin-left: 1em;
    color: @gray;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
</style>
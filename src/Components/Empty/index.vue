<template>
  <div class="empty-container">
    <icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import icon from "../Icon";
export default {
  components: {
    icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.empty-container {
  .self-center();
  color: @gray;
  text-align: center;
}
.icon-container {
  font-size: 72px;
}
</style>
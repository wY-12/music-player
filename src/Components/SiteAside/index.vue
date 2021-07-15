<template>
  <div class="site-aside-container">
    <Avatar url="http://mdrs.yuanjin.tech/FgMwAPYq17So9nwVH44ltDHo7u3c" />
    <h1 class="title">站内</h1>
    <Menu />
    <Contact />
    <p class="footer">黑ICP备17001719号</p>
  </div>
</template>

<script>
import Avatar from "@/Components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
export default {
  components: {
    Menu,
    Contact,
    Avatar,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  box-sizing: border-box;
  padding: 20px 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container {
  margin: 0 auto;
}
.footer {
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin: 0;
}
.title {
  font-size: 1.2em;
  text-align: center;
  color: #fff;
}
</style>
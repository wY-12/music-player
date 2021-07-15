<template>
  <div
    class="carouselitem-container"
    @mousemove="handlemouseMove"
    @mouseleave="handlemouseLeave"
    ref="container"
  >
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="this.showWords"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/Components/ImageLoader";

export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外层边框 (小)
      innerSize: null, //内层边框（大）
      mouseX: 0, //鼠标位置X
      mouseY: 0, //鼠标位置Y
    };
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;

    //获取各个边框宽度
    this.setSize();
    //初始化鼠标位置
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  computed: {
    //计算属性
    imagePosition() {
      //获取高出的高度
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.containerSize.width - this.innerSize.width;
      const extraHeight = this.containerSize.height - this.innerSize.height;
      const left = (extraWidth / this.innerSize.width) * this.mouseX;
      const top = (extraHeight / this.innerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  methods: {
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";
      //描述层

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "1s 0.5s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    handlemouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    handlemouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carouselitem-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    transition: 0.2s;
  }
  .title,
  .desc {
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    opacity: 0;
    color: #fff;
    letter-spacing: 3px;
    left: 30px;
    text-shadow: 2px 0 0 rgb(0, 0, 0, 0.5), -2px 0 0 rgba(0, 0, 0, 0.5),
      0 2px 0 rgba(0, 0, 0, 0.5), 0 -2px 0 rgba(0, 0, 0, 0.5);
  }

  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>
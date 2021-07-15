<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import debounce from "@/utils/debounce";
export default {
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  components: {
    RightList,
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //通过设置activeAnchor为正确的值 来改变选中效果
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }

      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }

        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          //在范围内

          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          //在范围之下
          return;
        } else {
          //在范围之上
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  computed: {
    tocWithSelect() {
      //计算属性 根据toc属性以及activeAnchor得到的带有isSelect属性的toc数组
      //映射map数组 添加属性
      const getToc = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getToc(t.children),
        }));
      };

      return getToc(this.toc);
    },
    //得到toc对应的元素数组对象
    doms() {
      const doms = [];

      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  created() {
    //事件总线检测 滚动条 的滚动
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  width: 250px;
  height: 100%;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
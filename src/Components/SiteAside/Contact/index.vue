<template>
  <ul class="contact-container">
    <li>
      <a href="">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>Github</span>
      </a>
    </li>
    <li>
      <a href="">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>670067843@qq.com</span>
      </a>
    </li>
    <li>
      <a
        href="tencent://message/?Menu=yes&uin=670067843&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>670067843</span>
      </a>
      <div class="pop">
        <img
          src="http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png"
          alt=""
        />
      </div>
    </li>
    <li>
      <a href="">
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>wang670067843</span>
      </a>
      <div class="pop">
        <img
          src="http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png"
          alt=""
        />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/Components/Icon";
export default {
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.contact-container {
  list-style: none;

  padding: 20px;
  padding-top: 0;
  margin: 0;
  @itemheight: 30px;
  color: @gray;
  li {
    height: @itemheight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-content: center;
    font-size: 14px;
    color: @gray;
  }
  .icon {
    font-size: 26px;
    width: 36px;
    color: @gray;
    &.weixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }
  .pop {
    position: absolute;
    left: 0;
    background: #fff;
    border-radius: 5px;
    bottom: @itemheight + 5px;
    padding: 10px 15px;
    transform: scaleY(0);
    transition: 0.3s;
    transform-origin: center bottom;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background: #fff;
      transform: translateX(-50%) rotate(45deg);
      left: 50%;
      bottom: -4px;
    }
  }
}
</style>
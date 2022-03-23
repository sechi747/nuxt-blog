<template>
  <footer class="footer">
    <div class="wrapper">
      <div>
        © 2022 -2022 ·
        <a href="https://beian.miit.gov.cn/" target="_blank">
          <span>鲁ICP备2021019080号-1</span>
        </a>
        ·
        <a href="/">PlantSechi</a>
        <br />网站已运行 <span id="days">0</span> 天 ·
        <span id="busuanzi_container_site_pv">
          你是本站的第
          <span id="busuanzi_value_site_pv"></span>个访问者！
        </span>
        <br />Powered by
        <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a>
        &
        <a href="https://github.com/anghunk/nuxt-blog">Github</a>
        &
        <a href="/feed.xml" target="_blank">Rss</a>
      </div>
    </div>

    <!-- 返回顶部 -->
    <div
      class="back_top top-btn"
      @mouseover="enterBackTop"
      @mouseout="outBackTop"
      ref="backTop"
      :style="{ opacity: opacity }"
      v-show="gotop"
      @click="handleScrollTop"
    >
      <div>
        <i></i>
        <i></i>
      </div>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up mx-auto"><polyline points="18 15 12 9 6 15"></polyline></svg> -->
    </div>

    <!-- 不蒜子计数 -->
    <script
      async
      src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
    ></script>
  </footer>
</template>

<script>
export default {
  props: ["ele"],
  data() {
    return {
      opacity: "1",
      gotop: false,
      scrollHeight: 140,
      scrollTop: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    enterBackTop() {
      this.opacity = "1";
    },
    outBackTop() {
      this.opacity = "1";
    },
    handleScroll(e) {
      const that = this;
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      that.scrollTop > this.scrollHeight
        ? (this.gotop = true)
        : (this.gotop = false);
    },
    handleScrollTop() {
      const that = this;
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding-bottom: 20px;
  .wrapper {
    background: none;
    box-shadow: none;
    color: #333;
    font-size: 15px;
    padding: 4px 10px;
    text-align: center;
    margin: 0;
    div {
      a {
        color: inherit;
      }
    }
  }
  .top-btn {
    position: fixed;
    right: 33px;
    bottom: 90px;
    -ms-flex-pack: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 5px 5px 0 rgb(0 0 0 / 10%);
    justify-content: center;
    transition: all 0.4s ease;
    width: 40px;
    height: 40px;
    z-index: 999;
    overflow: hidden;
    padding: 5px;
    &:hover {
      box-shadow: 0 5px 5px 0 rgb(0 0 0 / 20%);
      cursor: pointer;
    }
    div {
      position: relative;
      width: 100%;
      height: 100%;
      i {
        position: absolute;
        top: 15px;
        background: #666;
        width: 15px;
        height: 2px;
      }

      i:nth-child(1) {
        transform: rotate(-45deg);
        left: 2px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
      }

      i:nth-child(2) {
        transform: rotate(45deg);
        right: 2px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
      }
    }
  }
}
@media print, screen and (max-width: 48em) {
  .footer {
    width: 100%;
  }
}
</style>

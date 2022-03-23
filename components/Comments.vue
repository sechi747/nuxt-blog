<template>
  <div class="wrapper">
    <div class="archive">
      <h4>评论~</h4>
      <div id="artalk">
        <a @click="onclickcomment()" class="reload">点击加载评论功能</a>
      </div>
      <link href="https://cdn.imhan.cn/list/artalk.css" rel="stylesheet" />
      <script src="https://cdn.imhan.cn/list/artalk.min.js"></script>
      <script src="https://cdn.imhan.cn/list/main.js"></script>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  methods: {
    onclickcomment () {
      let link = location.pathname;
      console.log(link);
      window.location.href = link + "#artalk";
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .archive {
    padding: 25px 4% 15px !important;
    margin-top: 20px;
    h4 {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 22px;
    }
    .reload {
      background: var(--bg-main);
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      transition: all 0.2s linear;
      display: block;
      text-align: center;
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }
}
</style>
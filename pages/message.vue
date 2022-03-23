<template>
  <div>
    <HeaderMe />
    <div class="wrapper">
      <div class="archive">
        <h2>{{ article.attributes.title }}</h2>
        <div class="article-content markdown-body" v-html="article.html"></div>
      </div>
    </div>
    <Comments />
  </div>
</template>

<script>
import HeaderMe from "@/components/HeaderMe";
import Comments from '@/components/Comments'
export default {
  components: {
    HeaderMe,
    Comments
  },
  async asyncData ({ params }) {
    // 调用 message.md 内的数据
    const article = await import(`~/content/message.md`);
    return {
      article
    };
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  .archive {
    padding: 25px 2% 15px;
    .article-content {
      font-size: inherit;
      line-height: 1.8;
      color: inherit;
      margin-top: 20px;
    }
  }
}
</style>
<template>
  <div>
    <h1 class="article-title">{{ article.attributes.title }}</h1>
    <div class="article-meta">
      <div>Sechi /</div>
      <div class="article-date">{{ formatDate(article.attributes.date) }} /</div>
      <div class="article-category">
        <nuxt-link
          class="link"
          :to="`/categories/${category}`"
          v-for="category in article.attributes.categories"
          :key="category"
        >{{ category }} </nuxt-link>
      </div>
    </div>
    <div class="wrapper">
      <article class="article article-post">
        <div class="markdown-body article-content" v-html="article.html"></div>
        <Imgbig />
        <div class="article-tags">
          标签:
          <nuxt-link
            class="link"
            :to="`/tags/${tag}`"
            v-for="tag in article.attributes.tags"
            :key="tag"
          >{{ tag }}</nuxt-link>
        </div>
        <div class="article-other">
          <div class="article-updated">最后更新时间: {{ formatDate(article.attributes.updated) }}</div>
          <p>版权声明：网站文章所有版权如无特殊说明，均归本人所有。允许转载，标明出处即可。</p>
        </div>
      </article>
    </div>
<!--    <Comments />-->
  </div>
</template>

<script>
import { formatDate } from "@/util";
import Imgbig from "@/components/Imgbig";
// import Comments from '@/components/Comments';
export default {
  components: {
    Imgbig,
    // Comments,
  },
  async asyncData ({ params }) {
    const article = await import(`~/content/posts/${params.slug}.md`);
    return {
      article,
    };
  },
  methods: {
    formatDate (date) {
      return formatDate(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-title {
  margin: 0;
  color: var(--color-main);
  font-weight: 500;
  font-size: 24px;
  line-height: 1.2;
  padding: 8px 0;
  text-align: center;
  margin-top: 14px;
}
.article-meta {
  padding: 0;
  margin: 6px 0;
  color: #6e7173;
  font-size: 15px;
  text-indent: 0.15em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0.8;
  .article-date {
    margin-right: 0;
  }
  .article-category {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .link {
      margin-right: 6px;
      color: #6e7173;
      &:hover {
        color: #000;
      }
    }
  }
}
.wrapper {
  .article {
    padding: 25px 5% 15px;

    .article-content {
      font-size: inherit;
      line-height: 2;
      color: inherit;
      padding-top: 15px;
      word-break: normal;
      border-bottom: 2px dashed #ccc;
      padding-bottom: 20px;
    }
    .article-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 20px;
      .link {
        background: #f6f7f8;
        margin-left: 10px;
        padding: 0 6px;
        border-radius: 4px;
        color: #6a6a6a;
        font-size: 15px;
        &:hover {
          background: #d9dbdd;
        }
      }
    }
    .article-other {
      margin: 0.6rem 0 1rem;
      font-size: 15px;
      color: #404041;
      .link {
        margin-left: 10px;
        color: inherit;
      }
    }
  }
  .article-ps {
    padding: 0 1%;
    opacity: 0.9;
    font-size: 0.96rem;
    a {
      color: #0366d6;
      text-decoration: underline;
    }
  }
}
</style>

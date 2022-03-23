<template>
  <div>
    <HeaderMe />
    <div class="wrapper">
      <div class="article">
        <div class="archive">
          <h1 class="title">
            正在查看
            <span>{{keyword}}</span> 分类下的文章
          </h1>
          <div class="archive-list">
            <div class="archive-item" v-for="archive in archives" :key="archive.date">
              <h2 class="archive-time">{{archive.date}}</h2>
              <ul
                class="article-list"
                v-for="article in archive.articles"
                :key="article.attributes.title"
              >
                <li class="article-item">
                  <span class="article-date">{{ formatDateArticle(article.attributes.date) }}</span>
                  <nuxt-link
                    class="article-link"
                    :to="article.path"
                    :title="article.attributes.title"
                  >{{ article.attributes.title }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMe from "@/components/HeaderMe";
import { formatArticles, formatDateArticle } from '@/util'
export default {
  components: {
    HeaderMe,
  },
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const context = await require.context('~/content/posts', true, /\.md$/)
    let articles = await context.keys().map(key => ({
      ...context(key),
      date: context(key).attributes.date,
      path: `/posts/${key.replace('.md', '').replace('./', '')}/`
    }))
    const keyword = route.params.slug
    articles = articles.filter(article => {
      return article.attributes.categories.indexOf(keyword) !== -1
    })
    return { archives: formatArticles(articles, articles.length), keyword }
  },
  methods: {
    formatDateArticle (date) {
      return formatDateArticle(date)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .article {
    padding: 0;
    .archive-category {
      margin-bottom: 1rem;
      a {
        display: inline-block;
        margin-right: 20px;
        padding: 4px 10px 0;
        font-size: 17px;
        color: inherit;
        border-bottom: 2px solid #24a19c;
      }
      .nuxt-link-active {
        position: relative;
        z-index: 1;
        color: #fff;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 90%;
          background-image: linear-gradient(#dadada66, #24a19c);
          z-index: -1;
        }
      }
    }
    .title {
      font-size: 16px;
      font-weight: normal;
      color: #888;
      margin-bottom: 10px;
      span {
        color: var(--color-main);
      }
    }
    .archive {
      padding: 10px 0 15px;
      .archive-list {
        font-size: 17px;
        line-height: 2;
        padding-bottom: 0.8em;
        .archive-item {
          .archive-time {
            font-weight: 600;
            margin: 0;
            font-size: 1.5rem;
          }
          .article-list {
            list-style: none;
            margin: 15px 0;
            .article-item {
              .article-date {
                padding-right: 0.7em;
                color: #3e3939e0;
              }
              a {
                color: var(--color-main);
              }
            }
          }
        }
      }
    }
  }
}
</style>

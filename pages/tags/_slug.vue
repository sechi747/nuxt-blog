<template>
  <div>
    <HeaderMe />
    <div class="wrapper">
      <div class="archive">
        <div class="widget">
          <h2>标签</h2>
          <div class="tag-list">
            <nuxt-link class="tag-item" :to="`/tags/${tag}`" v-for="tag in tags" :key="tag">{{tag}}</nuxt-link>
          </div>
        </div>
        <h1 v-if="showTagTip" class="title">正在查看 "{{keyword}}" 标签下的文章</h1>
        <div class="archive-list">
          <div class="archive-item" v-for="archive in archives" :key="archive.date">
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
</template>

<script>
import HeaderMe from "@/components/HeaderMe";
import {formatArticles, formatDateArticle} from '@/util'

export default {
  components: {
    HeaderMe
  },
  data () {
    return {
      tags: []
    }
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
      return article.attributes.tags.indexOf(keyword) !== -1
    })
    return { archives: formatArticles(articles, articles.length), keyword }
  },
  computed: {
    showTagTip() {
      return this.$route.params.slug
    }
  },
  methods: {
    formatDateArticle (date) {
      return formatDateArticle(date)
    },
    getTags (articles) {
      const tags = []
      articles.forEach(article => {
        article.attributes.tags.forEach(tag => {
          if (tags.filter(item => item === tag).length === 0) {
            tags.push(tag)
          }
        })
      })
      return tags
    }
  },
  // 获取标签云
  async fetch () {
    const context = await require.context('~/content/posts', true, /\.md$/)
    const articles = await context.keys().map(key => ({
      ...context(key),
      path: `/posts/${key.replace('.md', '').replace('./', '')}`
    }))
    this.tags = this.getTags(articles)
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  .archive {
    padding: 25px 2% 15px;
    .widget {
      .tag-list {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 10px;
        margin-top: 20px;
          a {
            display: inline-block;
            padding: 4px 10px;
            margin-right: 6px;
            margin-bottom: 6px;
            white-space: nowrap;
            color: inherit;
            border-radius: 14px;
            background-color: rgba(213, 214, 212,0.3);
            &:hover {
              background-color: rgba(213, 214, 212,0.9);
            }
          }
      }
    }
    .title {
      font-size: 16px;
      font-weight: normal;
      color: #888;
    }
    .archive-list {
      font-size: inherit;
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
            .article-link {
              color: var(--color-main);
            }
          }
        }
      }
    }
  }
}
</style>

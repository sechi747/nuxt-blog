import path from 'path'
import glob from 'glob'
import Mode from 'frontmatter-markdown-loader/mode'
import MarkdownIt from 'markdown-it'
const markdownPaths = ['posts']

let remove_console = []

if (process.env.NODE_ENV === 'production') {
  remove_console.push("transform-remove-console")
}

export default {
  router: {
    base: '/nuxt-blog/'
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: '7070'
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'PlantSechi',
    meta: [
      { charset: 'utf-8' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '这是我的个人博客PlantSechi，涉及一些技术笔记和个人碎碎念，使用nuxt.js搭建' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js' },
      { src: 'https://hm.baidu.com/hm.js?a208e37fb9dcf52ff1537c055a0adb18' },
      { src: '/js/main.js' }
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/app.scss',
    '@/assets/css/reset.scss',
    '@/assets/css/article.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {
      src: '~/plugins/baidu',
    }

  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    'nuxt-content-body-html',
    '@nuxtjs/feed',
  ],
    /*
    ** Rss feed.xml
    */
    feed: [
      {
        create: async (feed) => {
          const $content = require('@nuxt/content').$content;
          feed.options = {
            title: 'PlantSechi',
            link: 'https://plantsechi.top/feed.xml',
            description:
              '这是我的个人博客，涉及一些技术笔记和个人碎碎念，使用nuxt.js搭建',
          };

          const posts = await $content('posts')
            .sortBy('date', 'desc')
            .fetch();
          posts.forEach((post) => {
            const url = `https://plantsechi.top/posts/${post.slug}`;
            feed.addItem({
              id: url,
              title: post.title,
              description: post.description,
              date: new Date(post.date),
              content: post.article,
              link: url,
              author: {
                name: 'Sechi',
                email: 'sechichen@gmail.com',
                link: 'https://plantsechi.top',
              },
            });
          });
        },
        path: '/feed.xml',
        type: 'rss2',
        data: ['posts', 'xml'],
      },
  ],
  generate: {
    routes: dynamicMarkdownRoutes(),
    subFolders: false
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    babel: {
      'plugins': remove_console
    },
    loaders: {
      sass: {
        implementation: require("sass")
      }
    },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push(
        {
          test: /\.md$/,
          include: path.resolve(__dirname, 'content'),
          loader: 'frontmatter-markdown-loader',
          options: {
            // mode: [Mode.VUE_COMPONENT, Mode.META],
            markdownIt: markdownRenderer(),
          },
        }
      )
    }
  },
}

function dynamicMarkdownRoutes () {
  return [].concat(
    ...markdownPaths.map(mdPath => {
      return glob.sync(`${mdPath}/*.md`, { cwd: 'content' })
        .map(filepath => `${mdPath}/${path.basename(filepath, '.md')}`)
    })
  )
}

function markdownRenderer () {
  const md = MarkdownIt({ html: true, breaks: true })
  md.use(require('markdown-it-prism'))
  return md
}


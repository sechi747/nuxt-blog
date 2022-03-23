import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fc140df0 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _7d022862 = () => interopDefault(import('..\\pages\\link.vue' /* webpackChunkName: "pages/link" */))
const _af43887c = () => interopDefault(import('..\\pages\\message.vue' /* webpackChunkName: "pages/message" */))
const _6895aa2e = () => interopDefault(import('..\\pages\\categories\\_slug.vue' /* webpackChunkName: "pages/categories/_slug" */))
const _24b03da8 = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _6086b30c = () => interopDefault(import('..\\pages\\tags\\_slug.vue' /* webpackChunkName: "pages/tags/_slug" */))
const _bca45866 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _fc140df0,
    name: "about"
  }, {
    path: "/link",
    component: _7d022862,
    name: "link"
  }, {
    path: "/message",
    component: _af43887c,
    name: "message"
  }, {
    path: "/categories/:slug?",
    component: _6895aa2e,
    name: "categories-slug"
  }, {
    path: "/posts/:slug?",
    component: _24b03da8,
    name: "posts-slug"
  }, {
    path: "/tags/:slug?",
    component: _6086b30c,
    name: "tags-slug"
  }, {
    path: "/",
    component: _bca45866,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

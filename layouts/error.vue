<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <p>好巧啊，在这里遇见你了。</p>
    <p>
      但是很可惜，这个页面是不存在的，点击
      <NuxtLink to="/">Home page</NuxtLink>返回在主页吧！
    </p>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>


<style lang="scss" scoped>
div {
  p {
    a {
      color: #4bb3c6;
      font-weight: 600;
    }
  }
}
</style>
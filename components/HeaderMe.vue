<template>
  <div class="header-me">
    <div class="my-name" @click="backToIndex">
      <span>Sechi</span>
    </div>
    <div class="article-meta">
      <div class="article-category">
        <nuxt-link to="/categories/技术">技术</nuxt-link>
        <nuxt-link to="/categories/随笔">随笔</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backToIndex() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss" scoped>
.header-me {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .my-name {
    height: 50px;
    width: 80px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -10px;
        right: -10px;
        border: 5px solid #24acf2;
        border-image: linear-gradient(45deg, gold, deeppink) 1;
        clip-path: inset(0px round 10px);
        animation: clippath 3.6s infinite linear;
      }
      &::after {
        animation: clippath 3.6s infinite -1.6s linear;
      }
    }
    span {
      color: var(--color-main);
      font-size: 26px;
      user-select: none;
    }
  }
  .article-meta {
    padding: 0;
    margin: 12px 0;
    color: #6e7173;
    font-size: 15px;
    text-indent: 0.15em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0.8;
    .article-category {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      a {
        display: inline-block;
        margin-right: 6px;
        padding: 0 6px;
        color: #6e7173;
        &:hover {
          color: #000;
        }
      }
    }
  }

  @keyframes clippath {
    0% {
      clip-path: inset(0 0 90% 0);
      filter: hue-rotate(0deg);
    }
    25% {
      clip-path: inset(0 90% 0 0);
    }
    50% {
      clip-path: inset(90% 0 0 0);
    }
    75% {
      clip-path: inset(0 0 0 90%);
    }
    100% {
      clip-path: inset(0 0 90% 0);
      filter: hue-rotate(360deg);
    }
  }

}
</style>

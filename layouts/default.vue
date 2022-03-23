<template>
  <div class="layout">
    <Header />
    <div class="opacity"></div>
    <div class="body">
      <div class="container">
        <Main />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './component/Header'
import Main from './component/Main'
import Footer from './component/Footer'

export default {
  components: {
    Header,
    Main,
    Footer
  },

}
</script>

<style lang="scss">
.layout {
  background: #EEEEEE;
  background-size: cover;
  min-height: 100vh;
  // background-image: linear-gradient(to bottom right, #74959A, #98B4AA);
  .opacity {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }
  .body {
    position: relative;
    .container {
      max-width: 850px;
      margin: 0 auto;
      padding: 20px 2% 30px;
      border-radius: 4px;
      position: relative;
      height: 100%;
      z-index: 1;
    }
  }
}

@media (max-width: 900px) {
  .layout {
    .body {
      padding: 0;
      display: block;
      .container {
        max-width: 100%;
        width: 100%;
        padding-top: 16px;
      }
    }
  }
}
</style>

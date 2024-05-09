<template>
  <div class="app">
    <Header />
    <router-view></router-view>
  </div>
  
</template>

<script setup>
import Header from "./components/Header/Header.vue"
</script>

<style scoped>
@font-face {
  font-family: "BMJUA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
.jua-regular {
  font-family: "BMJUA", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.jua-regular-large {
  font-family: "BMJUA", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: large;
}
.app {
    display: flex;
    flex-direction: column;
  }
</style>
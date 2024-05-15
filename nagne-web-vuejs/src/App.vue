<template>
  <div class="app">
    <TheHeader />
    <router-view></router-view>
  </div>
  
</template>

<script setup>
import TheHeader from "./components/Header/TheHeader.vue"
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
  width : 100%;
  height : 100%;
}

</style>
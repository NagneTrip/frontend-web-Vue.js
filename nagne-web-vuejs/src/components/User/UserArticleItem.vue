<template>
  <div class="user-article-item">
    <img :src="userArticle.imageUrls[0]" alt="">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  userArticle: Object,
});


</script>

<style scoped>
.user-article-item {
  width: 250px;
  height: 250px;
  transition: 0.2s all;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
}

.user-article-item:hover {
  scale: 1.1;
  transition: 0.2s all;
}

img {
  width: 250px;
  height: 250px;
}
</style>
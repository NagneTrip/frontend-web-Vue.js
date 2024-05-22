<template>
  <div class="user-article-item" @click="move">
    <img :src="bookMarkItem.imageUrls[0]" onerror="this.src='/src/assets/logo/sad_logo.png'" alt="" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  bookMarkItem: Object,
});

const move = () => {
  router.push({ name: 'articleDetail', params: { 'id': props.bookMarkItem.id } })
}

</script>

<style scoped>
.user-article-item {
  width: 250px;
  height: 250px;
  background-color: antiquewhite;
  transition: 0.2s all;
  border-radius: 12px;
  cursor: pointer;
}

.user-article-item img {
  width: 250px;
  height: 250px;
}

.user-article-item:hover {
  scale: 1.1;
  transition: 0.2s all;
}
</style>
<template>
  <div class="side-bestarticle">
    <div class="header">
      <p class="title jua-regular">베스트 나그네</p>
      <div class="buttons">
        <button class="filter" :class="{isSelected : sortState==='like'}" @click="changeSortState('like')">
          <p class="jua-regular">좋아요순</p>
        </button>
        <button class="filter" :class="{isSelected : sortState==='comment'}" @click="changeSortState('comment')">
          <p class="jua-regular">댓글순</p>
        </button>
      </div>
    </div>
    <div class="article-container">
      <template v-if="!isLoading">
        <BestArticleItem v-for="(bestArticle, index) in bestArticles" :bestArticle="bestArticle"
          :key="bestArticle.id" />
      </template>
      <img v-if="isLoading" class="spinner" src="/assets/blue_spinner.svg" alt="">
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import BestArticleItem from './BestArticleItem.vue';
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '@/store/auth.js'
const authStore = useAuthStore();

const bestArticles = ref([]);
const isLoading = ref(false);
const sortState = ref('like');

onMounted(async() => {
  await fetchBestArticles();
})

watch(sortState, async ()=>{
  await fetchBestArticles();
})

const fetchBestArticles = async () => {
  isLoading.value = true;
  await axios.get(import.meta.env.VITE_EC2_ADDR+`/api/articles/best?sort=${sortState.value}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
  }).then(({ data }) => {
    isLoading.value = false;
    bestArticles.value = data.response.articles;
    
  }).finally(() => {
    
  }
  )
}

const changeSortState = (changeTo)=> {
  sortState.value = changeTo;
}

</script>

<style scoped>
.side-bestarticle {
  width: 100%;
  height: 960px;
  padding: 20px 10px 20px 10px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 32px;
  margin: 0;
  color: rgb(121, 121, 121);
}

.buttons {
  display: flex;
  gap: 6px;
}

.filter {
  width: 60px;
  height: 20px;
  border-radius: 12px;
  border: none;
}

.filter:hover {
  background-color: rgb(65, 139, 244);
  transition: 0.2s all;
  scale: 1.1;

  p {
    color: white;
  }
}

.filter p {
  font-size: 12px;
  color: rgb(118, 173, 255);
  margin: 0;
}

.isSelected {
  background-color: rgb(65, 139, 244);
  
  p {
    color: white;
  }
}

.article-container {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
}
.spinner {
  width: 100px;
  height: 100px;
  margin : 80px auto auto auto;
}
</style>
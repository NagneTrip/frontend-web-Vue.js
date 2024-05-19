<template>
    <div class="side-bestarticle">
      <div class="header">
        <p class="title jua-regular">베스트 나그네</p>
        <div class="buttons">
          <button class="filter"><p class="jua-regular">좋아요순</p></button>
          <button class="filter"><p class="jua-regular">댓글순</p></button>
        </div>
      </div>
      <div class="article-container">
        <BestArticleItem v-for="(bestArticle, index) in bestArticles" :bestArticle="bestArticle" :key="bestArticle.id"/>
      </div>
    </div>
</template>

<script setup>
import axios from "axios";
import BestArticleItem from './BestArticleItem.vue';
import {ref, onMounted} from 'vue';
import {useAuthStore} from '@/store/auth.js'
const authStore = useAuthStore();

const bestArticles = ref([]);

onMounted(()=>{
  getBestArticles();
})

const getBestArticles = async ()=> {
  await axios.get('http://localhost:8080/api/articles/best', {
    headers : {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
  }).then(({data})=>{
    bestArticles.value = data.response.articles;
  })
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
.filter p{
  font-size: 12px;
  color: rgb(118, 189, 255);
  margin: 0;
}

.article-container {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
}
</style>
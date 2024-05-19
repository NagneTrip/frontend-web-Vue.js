<template>
    <div class="user-article-item" @click="openArticleDetail">
      {{ userArticle.content }}
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    userArticle: Object,
  });

  const openArticleDetail = ()=> {
    alert(props.userArticle.id)
  }
  </script>
  
  <style scoped>
  .user-article-item {
    width: 250px;
    height: 250px;
    background-color: antiquewhite;
    cursor: pointer;
  }
  </style>
  
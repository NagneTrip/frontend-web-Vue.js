<template>
    <div class="user-article">
      <UserArticleItem
        v-for="(userArticle, index) in userArticles"
        :userArticle="userArticle"
        :key="userArticle.id"
      />
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import UserArticleItem from './UserArticleItem.vue';
  
  const props = defineProps({
    userArticles: Object,
  });
  </script>
  
  <style scoped>
  .user-article {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px; /* 아이템 간의 간격을 설정 */
  }
  </style>
  
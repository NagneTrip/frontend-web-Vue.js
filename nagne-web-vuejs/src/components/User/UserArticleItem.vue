<template>
    <div class="user-article-item">
      {{ userArticle.content }}
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {useRouter} from "vue-router";
  const router = useRouter();
  
  const props = defineProps({
    userArticle: Object,
  });


  </script>
  
  <style scoped>
  .user-article-item {
    width: 250px;
    height: 250px;
    background-color: antiquewhite;
    cursor: pointer;
  }
  </style>
  
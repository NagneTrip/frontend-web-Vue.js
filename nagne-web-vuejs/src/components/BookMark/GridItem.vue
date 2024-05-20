<template>
    <div class="user-article-item">
      {{ bookMarkItem.content }}
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {useRouter} from "vue-router";
  const router = useRouter();
  
  const props = defineProps({
    bookMarkItem: Object,
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
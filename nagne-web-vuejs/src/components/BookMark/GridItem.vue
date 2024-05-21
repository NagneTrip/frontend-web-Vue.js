<template>
    <div class="user-article-item" @click="move">
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
  console.log(props.bookMarkItem)

  const move = ()=> {
    router.push({name: 'articleDetail', params : {'id' : props.bookMarkItem.id}})
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
  .user-article-item:hover {
    scale: 1.1;
    transition: 0.2s all;
  }
  </style>
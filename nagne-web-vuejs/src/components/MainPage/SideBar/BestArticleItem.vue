<template>
    <div class="best-article">
      <div class="img-box">
        <img src="@/assets/logo/logo_img.png" alt="" :width="60" :height="60">
      </div>
      <div class="content-box">
        <p class="jua-regular">{{ truncatedContent }}</p>
        <div class="article-info">
          <div class="user-info">
            <p class="jua-regular nickname">{{ bestArticle.userNickname }}</p>
            <img :src="`src/assets/tier/${bestArticle.userTier}.svg`" :width="13" :height="13" alt="" class="tier-img" />
          </div>
          <p class="date ">{{ bestArticle?.createdDate.split("T")[0] }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {computed} from 'vue';
  const props = defineProps({
    bestArticle: Object,
  });
  
  const truncatedContent = computed(() => {
    if (props.bestArticle.content.length > 15) {
      return props.bestArticle.content.slice(0, 15) + '...';
    }
    return props.bestArticle.content;
  });
  </script>
  
  <style scoped>
  p {
    margin: 0;
  }
  
  .best-article {
    display: flex;
    gap: 8px;
    border-top: 1px solid rgb(219, 219, 219);
    padding-top: 15px;
  }
  
  .content-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .article-info {
    display: flex;
    justify-content: space-between;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 2px
  }

  .nickname {
    color: rgb(87, 87, 87);
    font-size: 15px;
  }

  .date {
    font-size: 13px;
  }
  </style>
  
<template>
  <div class="article-wrapper">
    <div class="article">
      <img src="@/assets/logo.png" />
      <p>{{ article.content }}</p>
      <p>좋아요 : {{ article.likeCount }}</p>
      <p>북마크 : {{ article.isBookmarked }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  article: Object,
})
</script>

<style scoped>
.article-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
}

.article {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  border-bottom: 1.5px solid rgb(228, 228, 228);
}

.article img {
  justify-content: center;
  border-radius: 25px;
  background-color: rgb(194, 194, 194);
  margin-bottom: 30px;
  width: 100%;
}


</style>
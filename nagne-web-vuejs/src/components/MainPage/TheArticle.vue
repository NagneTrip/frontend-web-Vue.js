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
import axios from 'axios';
import { onMounted } from 'vue';

const props = defineProps({
  article: Object,
})

// 백엔드 수정되면 삭제 예정
onMounted(() => {
  const token = window.localStorage.getItem('token'); //로컬스토리지에서 토큰 로드

  axios.get(`http://localhost:8080/api/users/${props.article.id}`, { //게사글 작성자 정보 불러오기
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(error => {
    });
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
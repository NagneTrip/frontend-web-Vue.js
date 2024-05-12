<template>
  <div class="article-wrapper">
    <div class="article">
      <div class="img-container">
        <img :src="article.imageUrls.length ? article.imageUrls : './src/assets/logo/logo.png'" />
        <div class="image-overlay"></div>
        <p>{{ article.content }}</p>
        <div class="article-bottom">
          <p>좋아요 : {{ article.likeCount }}</p>
          <p>북마크 : {{ article.isBookmarked }}</p>
        </div>
        <div class="overlay-text" @click="openArticleModal">
          <div class="overlay-button jua-regular">
            <p>클릭하여</p>
            <p>상세보기</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
const token = window.localStorage.getItem("token"); //로컬스토리지에서 토큰 로드

const props = defineProps({
  article: Object,
});
const emit = defineEmits([
  "openArticleModal",
])

const openArticleModal=()=>{
  emit('openArticleModal', props.article.id);
}

// 백엔드 수정되면 삭제 예정
onMounted(() => {
  // axios
  //   .get(`http://localhost:8080/api/users/${props.article.id}`, {
  //     //게사글 작성자 정보 불러오기
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(({ data }) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {});
});
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

.img-container {
  position: relative;
  width: 100%;
  height: auto; /* 이미지의 높이에 맞추어 자동 조정 */
}

.article-main {
  cursor: pointer;
}

.article img {
  width: 100%;
  height: auto;
  border-radius: 25px;
  display: block; /* 이미지가 div의 크기에 맞춰지도록 */
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0); /* 초기 배경색은 투명 */
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.overlay-text {
  position: absolute;
  top: 50%;  /* 부모 컨테이너의 정중앙에서 시작 */
  left: 50%; /* 부모 컨테이너의 정중앙에서 시작 */
  transform: translate(-50%, -5%); /* 자신의 크기의 절반만큼 오프셋을 주어 정확히 중앙에 위치하도록 조정 */
  width: 100%; /* 부모의 전체 너비 사용 */
  height: 100%; /* 부모의 전체 높이 사용 */
  color: white;
  text-align: center; /* 텍스트 중앙 정렬 */
  display: none; /* 초기 상태는 숨김 */
  cursor: pointer;
}

.overlay-text p {
  margin: 2px 30px 2px 30px;
  font-size: 24px;
}

.overlay-button {
  color: rgb(241, 241, 241);
}

.img-container:hover .image-overlay {
  background-color: rgba(0, 0, 0, 0.2); /* 호버 시 반투명 검은색으로 변경 */
  transition: all 0.3s ease;
  cursor: pointer;
}
.img-container:hover .overlay-text {
  display: block;
}

.article-bottom {
  display: flex;
}

/* @media screen and (max-width: 640px) {

.overlay-text {
  left: 30%;
}
}

@media screen and (max-width: 456px) {

.overlay-text {
  left: 25%;
}
} */
</style>

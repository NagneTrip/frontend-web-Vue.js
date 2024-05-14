<template>
  <div class="article-wrapper">
    <div class="article">
      <div class="user-info">
        <div class="user-profile-img">
          <img src="@/assets/logo/logo_img.png" alt="" />
        </div>
        <div class="user-info-text">
          <div class="user-info-main">
            <p class="noto-sans-kr-bold">{{ article.userNickname }}</p>
            <img :src="`src/assets/tier/${article.userTier}.svg`" alt="" class="tier-img" />
          </div>
          <p class="user-info-date noto-sans-kr-regular">2024-05-12</p>
        </div>
      </div>
      <div class="img-container">
        <img :src="'./src/assets/logo/logo.png'" />
        <div class="image-overlay"></div>
        <p>{{ article.content }}</p>
        <div class="article-bottom">
          <div class="social-box">
            <div class="social-left-box">
              <div class="social-like">
                <svg v-show="!isLiked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="social-btn"
                  @click="() => clickSocialBtn('like')">
                  <path
                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </svg>
                <svg v-show="isLiked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="social-btn"
                  @click="() => clickSocialBtn('like')">
                  <path fill="#ff0000"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
                <p class="jua-regular">{{ article?.likeCount }}</p>
              </div>
              <div class="social-comment">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="social-btn"
                  @click="() => clickSocialBtn('comment')">
                  <path
                    d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                </svg>
                <p class="jua-regular">{{ article.commentCount }}</p>
              </div>
              <!-- 좋아요, 댓글, 공유, ... 북마크(저장) 버튼 -->
            </div>
            <div class="social-right-box">
              <div class="social-bookmark">
                <svg v-show="isBookmarked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="social-btn"
                  @click="() => clickSocialBtn('bookMark')">
                  <path
                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
                <svg v-show="!isBookmarked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="social-btn"
                  @click="() => clickSocialBtn('bookMark')">
                  <path
                    d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                </svg>
              </div>
            </div>
          </div>
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
import { ref } from "vue";

import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
const { token, isAuthenticated } = storeToRefs(useAuthStore());
const article = ref({});
const isLiked = article.value.isLiked;
const isBookmarked = article.value.isBookmarked;


onMounted(async () => {
  if (isAuthenticated) { //이미 로그인 되어 있으면 토큰 갱신
    await useAuthStore().getToken();
  }

  axios.get(`http://localhost:8080/api/articles/${props.articleId}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
    .then(({ data }) => {
      article.value = data.response.articleInfo;
    })
    .catch()
})

const props = defineProps({
  articleId: Number,
});
const emit = defineEmits([
  "openArticleModal",
])

const openArticleModal = () => {
  emit('openArticleModal', article.value.id);
}
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

.user-info {
  display: flex;
  gap: 7px;
}

.user-profile-img {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center
}

.user-info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-info-main {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  gap: 5px;
}

.user-info-main p {
  cursor: pointer;
}

.user-info-text p {
  margin: 0;
}

.user-info-date {
  color: #797979;
  padding-left: 2px;
}

.img-container {
  position: relative;
  width: 100%;
  height: auto;
  padding: 5px;
  /* 이미지의 높이에 맞추어 자동 조정 */
}

.article-main {
  cursor: pointer;
}

.article img {
  width: 100%;
  height: auto;
  border-radius: 25px;
  display: block;
  /* 이미지가 div의 크기에 맞춰지도록 */
}

.article .user-info .user-info-main .tier-img {
  width: 20px;
  height: 20px;
  border-radius: 0px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0);
  /* 초기 배경색은 투명 */
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.overlay-text {
  position: absolute;
  top: 50%;
  /* 부모 컨테이너의 정중앙에서 시작 */
  left: 50%;
  /* 부모 컨테이너의 정중앙에서 시작 */
  transform: translate(-50%, -5%);
  /* 자신의 크기의 절반만큼 오프셋을 주어 정확히 중앙에 위치하도록 조정 */
  width: 100%;
  /* 부모의 전체 너비 사용 */
  height: 100%;
  /* 부모의 전체 높이 사용 */
  color: white;
  text-align: center;
  /* 텍스트 중앙 정렬 */
  display: none;
  /* 초기 상태는 숨김 */
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
  background-color: rgba(0, 0, 0, 0.2);
  /* 호버 시 반투명 검은색으로 변경 */
  transition: all 0.3s ease;
  cursor: pointer;
}

.img-container:hover .overlay-text {
  display: block;
}

.article-bottom {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 10px;
}

.social-box {
  width: 95%;
  display: flex;
  justify-content: space-between;
}

.social-left-box {
  display: flex;
  gap: 20px;
}

.social-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.social-like,
.social-comment,
.social-bookmark {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-like p,
.social-comment p,
.social-bookmark p {
  margin: 0;
  cursor: default;
}
</style>

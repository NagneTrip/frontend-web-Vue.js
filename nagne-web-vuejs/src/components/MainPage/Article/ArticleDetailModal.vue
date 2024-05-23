<template>
  <div class="article-detail-page" @click="closeModal">
    <div class="modal-wrapper">

      <div class="modal-box" @click.stop>
        <img v-if="isLoading" src="/assets/blue_spinner.svg" alt="" class="modal-left" />
        <div v-if="!isLoading" class="modal-left" @click="closeDotMenu">
          <template v-if="!isManyImg">
            <img :src="newArticle.imageUrls || '/assets/logo/logo.png'"
              onerror="this.src='/assets/logo/sad_logo.png'" class="modal-left-img" />
          </template>
          <template v-if="isManyImg">
            <ArticleWriteSwiper :imgUrls="imgUrls" class="modal-left-img" />
          </template>

        </div>
        <div class="modal-right" @click="closeDotMenu">
          <div class="modal-right-wrapper" ref="modalRightWrapper" @scroll="handleScroll">
            <div class="right-header">
              <div class="user-info">
                <div>
                  <img :src="newArticle.userProfileImage || '/assets/logo/logo_img.png'"
                    onerror="this.src='/assets/logo/sad_logo.png'" :width="50" :height="50" alt="" />
                </div>
                <div class="user-info-text">
                  <div class="user-info-main">
                    <p class="noto-sans-kr-bold">{{ newArticle.userNickname }}</p>
                    <img :src="`/assets/tier/${newArticle.userTier}.svg`"
                      onerror="this.src='/assets/logo/sad_logo.png'" alt="" class="tier-img" :width="17"
                      :height="17" />
                  </div>
                  <p class="user-info-date noto-sans-kr-regular">{{ newArticle?.createdDate?.split('T')[0] }}</p>
                </div>
              </div>
              <div class="right-button">
                <div class="close-button-wrapper" id="dot-button" @click="toggleDotMenu($event)">
                  <font-awesome-icon :icon="faEllipsisVertical" class="close-button" />
                </div>
                <div class="close-button-wrapper" id="close-button" @click="closeModal">
                  <font-awesome-icon :icon="faXmark" class="close-button" />
                </div>
              </div>
            </div>
            <div class="right-content-box">
              <span class="content-main noto-sans-kr-bold">
                {{ newArticle.content }}
              </span>
              <CommentList :articleId="article.id" ref="commentList" @updateComments="fetchComments = 0"
                :gencomments="fetchComments" />
            </div>
            <div class="right-footer">
              <div class="social-box">
                <div class="social-left-box">
                  <div class="social-like">
                    <svg v-if="!isLiked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="social-btn"
                      @click="() => clickSocialBtn('like')">
                      <path
                        d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                    </svg>
                    <svg v-if="isLiked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="social-btn"
                      @click="() => clickSocialBtn('unlike')">
                      <path fill="#ff0000"
                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                    <p class="jua-regular">{{ likeCount }}</p>
                  </div>
                  <div class="social-comment">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="social-btn"
                      @click="() => clickSocialBtn('comment')">
                      <path
                        d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                    </svg>
                    <p class="jua-regular">{{ commentCount }}</p>
                  </div>
                </div>
                <div class="social-right-box">
                  <div class="social-bookmark">
                    <svg v-if="isBookmarked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="social-btn"
                      @click="() => clickSocialBtn('bookMark')">
                      <path
                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                    </svg>
                    <svg v-if="!isBookmarked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                      class="social-btn" @click="() => clickSocialBtn('bookMark')">
                      <path
                        d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="write-comment-box">
                <div class="comment-input">
                  <input type="text" class="noto-sans-kr-bold" ref="commentInput" v-model="commentContent" />
                </div>
                <button class="jua-regular" @click="postComment">게시</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ul v-show="isDotMenuOpen" class="user-menu list-group" :style="dotMenuStyle">
    <li v-if="isUsersArticle" class="list-group-item" @click="moveTo('modify')">수정하기</li>
    <li v-if="isUsersArticle" class="list-group-item" @click="moveTo('delete')">삭제하기</li>
    <li v-if="!isUsersArticle" class="list-group-item" @click="moveTo('declare')">신고하기</li>
    <li class="list-group-item">공유하기</li>
  </ul>
</template>

<script setup>
import { faXmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import apiClient from '@/apiClient.js';
import { onMounted, ref } from "vue";
import CommentList from "./CommentList.vue";
import { useAuthStore } from "@/store/auth";
import { useWriteStore } from "@/store/write";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const writeStore = useWriteStore();
import { storeToRefs } from "pinia";
import ArticleWriteSwiper from "@/components/Write/Article/ArticleWriteSwiper.vue";
const { getComment } = storeToRefs(writeStore);
const { genComments, resetComments } = writeStore

const newArticle = ref({});

const props = defineProps({
  article: Object,
});

const emit = defineEmits(["closeModal", "like", "unlike", "bookmark", "unbookmark"]);
const closeModal = () => {
  emit("closeModal");
};

const isUsersArticle = ref(false); // 유저 검증

const likeCount = ref(0);
const commentCount = ref(0);
const isLiked = ref(false);
const isBookmarked = ref(false);
const isDotMenuOpen = ref(false);
const dotMenuStyle = ref({}); //게시물 옵션 버튼
const isLoading = ref(false);

const fetchComments = ref(0);
const commentInput = ref(null);
const commentContent = ref("");
const modalRightWrapper = ref(null);
const noMoreData = ref(false);
const lastIndex = ref(1000000000);
const commentList = ref(null);
const imgUrls = ref([]);
const isManyImg = ref(false);

const idByParams = route.params.id;

onMounted(async () => {

  isLoading.value = true;
  if (props) {
    newArticle.value = props.article;
    isLiked.value = props.article.isLiked;
    commentCount.value = props.article.commentCount;
    isBookmarked.value = props.article.isBookmarked;
    likeCount.value = props.article.likeCount;
    commentContent.value = props.article.commentContent;
  }

  //게시글 작성자가 현재 로그인한 유저와 일치하는지 확인
  if (newArticle.value.userId === Number(sessionStorage.getItem('loginUserId'))) {
    isUsersArticle.value = true;
  }

  await fetchArticleDetail();
});

const fetchArticleDetail = async () => {
  await apiClient.get(`/api/articles/${newArticle.value.id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
  }).then(({ data }) => {
    newArticle.value = data.response.articleInfo;
    isLiked.value = newArticle.value.isLiked;
    commentCount.value = newArticle.value.commentCount;
    isBookmarked.value = newArticle.value.isBookmarked;
    likeCount.value = newArticle.value.likeCount;
    commentContent.value = newArticle.value.commentContent;
    isLoading.value = false;
    imgUrls.value = newArticle.value.imageUrls;
    if (imgUrls.value.length > 1) {
      isManyImg.value = true;
    } else {
      isManyImg.value = false;
    }
  })
}

const moveTo = (action) => {
  switch (action) {
    case 'modify':
      if (!idByParams) {
        router.push({ name: 'articleModify', params: { id: newArticle.value.id } });
      } else {
        router.push({ name: 'articleModify', params: { id: idByParams } });
      }

      break;

    case 'delete':
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        deleteArticle();
      }
      break;

    case 'declare':
      // 신고하기
      break;
  }
}

const deleteArticle = async () => {
  if (newArticle.value.userId !== Number(sessionStorage.getItem('loginUserId'))) {
    alert("게시글 삭제에 실패했습니다.");
    return;
  }

  try {
    await apiClient.delete(`/api/articles/${newArticle.value.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    });
    alert("게시글이 삭제되었습니다.");
    emit("closeModal");
    emit("changed");
  } catch (error) {
  }
}

const clickSocialBtn = async (btnName) => {
  if (!store.isAuthenticated || !sessionStorage.getItem('token')) {
    alert('로그인 후 진행하세요!');
    return;
  }

  try {
    switch (btnName) {
      case 'like':
        await apiClient.post('/api/articles/like', { articleId: newArticle.value.id }, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
          .then(() => {
            isLiked.value = true;
            likeCount.value++;
            emit('like');
          })
        break;
      case 'unlike':
        await apiClient.delete(`/api/articles/like/${newArticle.value.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
          .then(() => {
            isLiked.value = false;
            likeCount.value--;
            emit('unlike');
          })
        break;
      case 'bookMark':
        if (!isBookmarked.value) {
          await apiClient.post('/api/bookmark', { articleId: newArticle.value.id }, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          })
            .then(() => {
              isBookmarked.value = true;
              emit('bookmark');
            })
        } else {
          await apiClient.delete(`/api/bookmark/${newArticle.value.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          })
            .then(() => {
              isBookmarked.value = false
              emit('unbookmark');
            })
        }
        break;
      case 'comment':
        if (commentInput.value) {
          commentInput.value.focus();
        }
        break;
    }
  } catch (error) {
    console.error('Error during social button click:', error);
  }
};

const closeDotMenu = (event) => {
  if (!event.target.closest('.right-button')) {
    isDotMenuOpen.value = false;
  }
};

const toggleDotMenu = (event) => {
  isDotMenuOpen.value = !isDotMenuOpen.value;
  if (isDotMenuOpen.value) {
    dotMenuStyle.value = {
      top: `${event.clientY + 20}px`,
      left: `${event.clientX}px`,
    };
  } else {
    dotMenuStyle.value = {};
  }
};

const postComment = async () => {
  await apiClient.post(`/api/comments`, {
    articleId: newArticle.value.id,
    content: commentContent.value,
  }, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
  }).then(({ data }) => {
    alert('댓글이 작성되었습니다.')
    commentContent.value = '';
    writeStore.genComments();
  })
}

</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");

.noto-sans-kr-regular {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.noto-sans-kr-bold {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.user-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 200px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}



.article-detail-page {
  position: fixed;
  /* 고정된 위치 */
  top: 0;
  /* 상단에서 0px 위치 */
  left: 0;
  /* 좌측에서 0px 위치 */
  width: 100%;
  /* 전체 너비 */
  height: 100%;
  /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5);
  /* 반투명 배경 */
  display: flex;
  justify-content: center;
  /* 중앙 정렬 */
  align-items: center;
  /* 중앙 정렬 */
  z-index: 1000;
  /* 다른 요소들 위에 표시 */
}

.modal-wrapper {
  height: 90%;
  overflow-y: scroll;
  scrollbar-width: none
}

.modal-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
}

.modal-left {
  width: 880px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px 0 0 8px;
  box-shadow: 6px 0 6px 4px rgba(0, 0, 0, 0.1);
  /* 오른쪽과 아래쪽에 그림자 */
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-left-img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.modal-right {
  /* 기존 스타일 유지, overflow-y 스타일 제거 */
  width: 480px;
  height: 100%;
  background-color: #f7f7f7;
  border-radius: 0 8px 8px 0;
  /* box-shadow: 6px 4px 6px 0 rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-right-wrapper {
  padding: 20px;
  width: 100%;
  /* 내부 여백 추가 */
  border-left: 1.7px solid rgb(228, 228, 228);
}

@media screen and (min-width: 1300px) {
  .modal-right-wrapper {
    overflow-y: auto;
    /* 내용이 넘칠 경우 세로 스크롤 활성화 */
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }
}

.right-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
}

.user-info {
  display: flex;
  gap: 7px;
}

.user-info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tier-img {
  margin-top: 4px;
}

.user-info-main {
  display: flex;
  align-items: center;
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

.right-button {
  display: flex;
  gap: 5px;
}

.close-button-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
}

.close-button-wrapper:hover {
  background-color: rgb(65, 139, 244);
  transition: all 0.2s;

  .close-button {
    color: white;
    transition: all 0.2s;
  }
}

.close-button-wrapper:active {
  background-color: red;
  transition: all 0.2s;
}

.close-button {
  width: 30px;
  height: 30px;
  color: rgb(125, 125, 125);
}

.right-content-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.content-main {
  width: 90%;
  overflow-wrap: anywhere;
  margin: 10px 0 10px 0;
}

.right-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.social-box {
  width: 90%;
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

.write-comment-box {
  width: 90%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.comment-input {
  width: 100%;
  display: flex;
  align-items: center;
}

.comment-input input {
  width: 100%;
  border: 1px rgb(118, 189, 255) solid;
  border-radius: 15px;
  height: 100%;
  padding: 0 10px 0 10px;
}

.comment-input input:focus {
  border: 1px rgb(65, 139, 244) solid;
}

.write-comment-box button {
  width: 60px;
  height: 40px;
  border-radius: 15px;
  background-color: rgb(118, 189, 255);
  border: none;
  box-shadow: 3px 2px 3px 0 rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
}

@media screen and (max-width: 1300px) {
  .modal-wrapper {
    height: 80%;
    /* overflow-y: scroll; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* 상단 정렬을 보장 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: #fff;

    /* 배경색 설정 */
    /* ::-webkit-scrollbar {
      display: none;
    } */

    /* scrollbar-width: none; */
    border-radius: 8px 8px 8px 8px;
  }

  .modal-box {
    min-height: 100%;
    width: 100%;
    /* 내부 박스의 너비를 100%로 설정 */
    display: flex;
    flex-direction: column;
    /* 콘텐츠를 수직으로 정렬 */
    justify-content: flex-start;
  }

  .modal-left {
    width: 560px;
    height: 560px;
    border-radius: 8px 8px 0 0;
    box-shadow: 6px 6px 0 4px rgba(0, 0, 0, 0.1);
  }

  .modal-right {
    width: 560px;
    min-height: 100%;
    border-radius: 0 0 8px 8px;
    /* box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.1); */
  }

  .modal-right-wrapper {
    width: 100%;
    /* 전체 너비를 차지하도록 설정 */
    height: 100%;
    min-width: 100%;
    overflow: none;
    /* 내용이 넘칠 경우 세로 스크롤 활성화 */
    padding: 20px;
    /* 내부 여백 추가 */
    border-left: 1.7px solid rgb(228, 228, 228);
  }

  #close-button {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .modal-wrapper {
    height: 70%;
    width: 90%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* 상단 정렬을 보장 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    /* 모달에 그림자 효과 추가 */
    background-color: #fff;

    /* 배경색 설정 */
    ::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    border-radius: 8px 8px 8px 8px;
  }

  .modal-box {
    width: 100%;
  }

  .modal-left {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
    box-shadow: 6px 6px 0 4px rgba(0, 0, 0, 0.1);
  }

  .modal-right {
    width: 100%;
    min-height: 100%;
    display: flex;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 464px) {
    .modal-wrapper {
      height: 60%;
    }

    .modal-box {
      min-height: 60%;
    }
  }
}
</style>
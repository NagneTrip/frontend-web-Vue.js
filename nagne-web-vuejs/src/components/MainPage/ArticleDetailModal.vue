<template>
  <div class="article-detail-page" @click="closeModal">
    <div class="modal-wrapper">
      <div class="modal-box" @click.stop>
        <div class="modal-left" @click="closeDotMenu">
          <img
            :src="article.imageUrls.length ? article.imageUrls : './src/assets/logo/logo.png'"
            class="modal-left-img"
          />
        </div>
        <div class="modal-right" @click="closeDotMenu">
          <div class="modal-right-wrapper">
            <div class="right-header">
              <div class="user-info">
                <div>
                  <img src="@/assets/logo/logo_img.png" :width="50" :height="50" alt="" />
                </div>
                <div class="user-info-text">
                  <div class="user-info-main">
                    <p class="noto-sans-kr-bold">User NickName</p>
                    <img src="@/assets/logo/logo_img.png" alt="" class="tier-img" :width="20"
                    :height="20"
                  </div>
                  <p class="user-info-date noto-sans-kr-regular">2024-05-12</p>
                </div>
              </div>
              <div class="right-button">
                <div class="close-button-wrapper" id="dot-button" @click="toggleDotMenu($event)">
                  <font-awesome-icon
                    :icon="faEllipsisVertical"
                    class="close-button"
                  />
                </div>
                <div class="close-button-wrapper" id="close-button" @click="closeModal">
                  <font-awesome-icon :icon="faXmark" class="close-button" />
                </div>
              </div>
            </div>
            <div class="right-content-box">
              <span class="content-main noto-sans-kr-bold">
                게시글 내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글
                내용입니다.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
              </span>
              <!-- 댓글 컴포넌트 -for -->

              <!-- 인스타처럼 게시글 내용과 댓글 모두 댓글 컴포넌트로 -->
              <!-- 이 파일에서 props로 받아온 게시글과, api로 호출한 댓글들을 처리 -->
            </div>
            <div class="right-footer">
              <div class="social-box">
                <div class="social-left-box">
                  <div class="social-like">
                    <svg
                      v-show="!isLiked"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="social-btn"
                    >
                      <path
                        d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                      />
                    </svg>
                    <svg
                      v-show="isLiked"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="social-btn"
                    >
                      <path
                        fill="#ff0000"
                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                      />
                    </svg>
                    <p class="jua-regular">324</p>
                  </div>
                  <div class="social-comment">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="social-btn"
                    >
                      <path
                        d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                      />
                    </svg>
                    <p class="jua-regular">3</p>
                  </div>
                  <!-- 좋아요, 댓글, 공유, ... 북마크(저장) 버튼 -->
                </div>
                <div class="social-right-box">
                  <div class="social-bookmark">
                    <svg
                      v-show="isBookmarked"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      class="social-btn"
                    >
                      <path
                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                      />
                    </svg>
                    <svg
                      v-show="!isBookmarked"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      class="social-btn"
                    >
                      <path
                        d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
                      />
                    </svg>
                    <p class="jua-regular">989</p>
                  </div>
                </div>
              </div>
              <div class="write-comment-box">
                <!-- 댓글 아이콘 -->
                <div class="comment-input">
                  <input type="text" />
                </div>
                <button class="jua-regular">게시</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ul v-show="isDotMenuOpen" class="user-menu list-group" :style="dotMenuStyle">
    <li class="list-group-item">로그인</li>
    <li class="list-group-item">A second item</li>
  </ul>
</template>

<script setup>
import { faXmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { onMounted, ref, onUnmounted } from "vue";

const props = defineProps({
  article: Object,
});
const emit = defineEmits(["closeModal"]);
const closeModal = () => {
  emit("closeModal");
};

const isLiked = ref(false);
const isBookmarked = ref(false);
const isDotMenuOpen = ref(false);
const dotMenuStyle = ref({});

const closeDotMenu = (event) => {
  // 메뉴 버튼 클릭인지 확인
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}



.article-detail-page {
  position: fixed; /* 고정된 위치 */
  top: 0; /* 상단에서 0px 위치 */
  left: 0; /* 좌측에서 0px 위치 */
  width: 100%; /* 전체 너비 */
  height: 100%; /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 중앙 정렬 */
  z-index: 1000; /* 다른 요소들 위에 표시 */
}
.modal-wrapper {
  height: 90%;
}

.modal-box {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
}

.modal-left {
  width: 880px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px 0 0 8px;
  box-shadow: 6px 0 6px 4px rgba(0, 0, 0, 0.1); /* 오른쪽과 아래쪽에 그림자 */
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-left-img {
  width: 100%;
  height: 100%;
}

.modal-right {
  /* 기존 스타일 유지, overflow-y 스타일 제거 */
  width: 480px;
  background-color: #f7f7f7;
  border-radius: 0 8px 8px 0;
  box-shadow: 6px 4px 6px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-right-wrapper {
  padding: 20px; /* 내부 여백 추가 */
  border-left: 1.7px solid rgb(228, 228, 228);
}

@media screen and (min-width: 1300px) {
  .modal-right-wrapper {
    overflow-y: auto; /* 내용이 넘칠 경우 세로 스크롤 활성화 */
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
  border: none;
  height: 100%;
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
    height: 90%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* 상단 정렬을 보장 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 모달에 그림자 효과 추가 */
    background-color: #fff; /* 배경색 설정 */
    ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    border-radius: 8px 8px 8px 8px;
  }

  .modal-box {
    width: 100%; /* 내부 박스의 너비를 100%로 설정 */
    display: flex;
    flex-direction: column; /* 콘텐츠를 수직으로 정렬 */
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
    border-radius: 0 0 8px 8px;
    box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.1);
  }

  .modal-right-wrapper {
    width: 100%; /* 전체 너비를 차지하도록 설정 */
    height: 100%; /* 모달의 높이를 꽉 채우도록 설정 */
    overflow: none; /* 내용이 넘칠 경우 세로 스크롤 활성화 */
    padding: 20px; /* 내부 여백 추가 */
    border-left: 1.7px solid rgb(228, 228, 228);
  }

  #close-button {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .modal-wrapper {
    width: 90%;
    height: 90%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* 상단 정렬을 보장 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 모달에 그림자 효과 추가 */
    background-color: #fff; /* 배경색 설정 */
    ::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    border-radius: 8px 8px 8px 8px;
  }

  .modal-box {
    width: 100%;
    height: 90%;
  }

  .modal-left {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
    box-shadow: 6px 6px 0 4px rgba(0, 0, 0, 0.1);
  }

  .modal-right {
    width: 100%;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>

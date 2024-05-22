<template>
  <div class="comment">
    <div class="comment-box">
      <div class="user-info">
        <div class="user-profile-img">
          <img :src="comment.userProfileImage || '@/assets/logo/logo_img.png'"
            onerror="this.src='/src/assets/logo/sad_logo.png'" class="profile-img" @click="moveTo" :width="50"
            :height="50" alt="" />
        </div>
        <div class="user-info-text">
          <div class="user-info-main" @click="moveTo">
            <p class="noto-sans-kr-bold user-nickname">{{ comment.userNickname }}</p>
            <img :src="`src/assets/tier/${comment.userTier}.svg`" onerror="this.src='/src/assets/logo/sad_logo.png'"
              alt="" class="tier-img" :width="15" :height="15" />
          </div>
          <p class="user-info-date noto-sans-kr-regular">{{ comment?.createdDate?.split("T")[0] }}</p>
        </div>
      </div>
      <div class="dot-button-wrapper" id="dot-button">
        <font-awesome-icon :icon="faEllipsisVertical" class="close-button" />
      </div>
    </div>
    <div class="button-box">
      <div class="comment-content-box">
        <span class="content-main noto-sans-kr-bold">
          {{ comment?.content }}
        </span>
      </div>
      <div class="like-btn-box">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="like-btn">
          <path
            d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="like-btn">
          <path fill="#ff0000"
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
const store = useAuthStore();
const router = useRouter();

const props = defineProps({
  comment: Object,
})

const userInfo = ref({});
onMounted(async () => {
})

const moveTo = () => {
  router.push({ name: 'user', params: { 'id': props.comment.userId } })
}
</script>

<style scoped>
p {
  margin: 0;
}

.comment {
  display: flex;
  flex-direction: column;
  width: 90%;
}

.comment-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  gap: 5px;
}

.user-info-text {
  display: flex;
}


.user-info-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-info-main {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-img {
  cursor: pointer;
}

.user-nickname {
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
}

.tier-img {
  margin-top: 3px;
}

.user-info-date {
  color: #797979;
  font-size: 14px;
}

.button-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.comment-content-box {
  width: 90%;
  display: flex;
  align-items: center;
}

.content-main {
  white-space: pre-wrap;
  /* CSS3에서 줄바꿈과 공백 처리를 위해 공백이 연속되어도 줄바꿈과 함께 공백이 유지되도록 합니다. */
  word-wrap: break-word;
  /* 긴 단어가 해당 요소의 너비를 초과할 경우 줄바꿈될 수 있도록 합니다. */
  overflow-wrap: break-word;
  /* 브라우저가 영역을 벗어나는 단어를 자동으로 줄바꿈하도록 합니다. */

}


.dot-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 15px;
  transition: 0.3s all;

}

.dot-button-wrapper:hover {
background-color: rgb(65, 139, 244);
color: white;
transition: 0.3s all;
scale: 1.05;
}

.like-btn-box {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-btn {
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div class="best-article" @click="moveTo('bestArticle')">
    <div class="left-box">
      <div class="img-box">
        <img
          :src="user.profileImage || '@/assets/logo/logo_img.png'"
          onerror="this.src='/src/assets/logo/sad_logo.png'"
          alt=""
          :width="60"
          :height="60"
        />
      </div>
      <div class="content-box">
        <div class="article-info">
          <div class="user-info">
            <p class="jua-regular nickname" style="font-size: 18px;">{{ user.nickname }}</p>
            <img
              :src="`src/assets/tier/${user.tier}.svg`"
              onerror="this.src='/src/assets/logo/sad_logo.png'"
              :width="13"
              :height="13"
              alt=""
              class="tier-img"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="jua-regular" @click="moveTo">프로필</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router'
const router = useRouter();

const props = defineProps({
  user: Object,
});

onMounted(() => {
  console.log(props.user);
});

const moveTo = ()=> {
    router.push({name : 'user', params : {'id' : props.user.id}})
}
</script>

<style scoped>
.best-article {
  display: flex;
  align-items: center;
  background-color: #eeeeee;
  width: 500px;
  height: 80px;
  margin: 0 auto 0 auto;
  border-radius: 12px;
  justify-content: space-around;
}

.img-box img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
}

.content-box {
    cursor: default;
}

.left-box {
    display: flex;
    align-items: center;
    gap: 5px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

button {
    border: none;
  background-color: #a8c8f9;
  width: 60px;
  height: 35px;
  border-radius: 8px;
  transition: 0.2s all;
}

button:hover {
background-color: #0068ff;
transition: 0.2s all;
scale: 1.05;
}
</style>

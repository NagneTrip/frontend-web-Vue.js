<template>
  <div class="container">
    <p class="header jua-regular-large">로그아웃이 완료되었습니다.</p>
    <img src="@/assets/logo/logo_img.png" :width="200" :height="180" alt=""
      onerror="this.src='/src/assets/logo/sad_logo.png'">
    <p class="jua-regular-large count-notice">3초 뒤 메인 페이지로 이동합니다.</p>
    <p class="jua-regular-large timerCount">{{ timerCount }}</p>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/store/auth";

const store = useAuthStore();
const router = useRouter();
const timerCount = ref(3);

onMounted(() => {

  const countdown = setInterval(() => {
    timerCount.value--;
    if (timerCount.value === 0) {
      clearInterval(countdown);
      router.push({ name: 'main' });
    }
  }, 1000);
});

</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 180px auto 0 auto;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
    scale: 1.0;
  }

  50% {
    transform: rotate(5deg);
    scale: 1.2;
  }

  100% {
    transform: rotate(-5deg);
    scale: 1.1;
  }
}

img {
  animation: rotate 1s infinite alternate ease-in-out;
}

.header {
  color: rgb(118, 189, 255);
  font-size: 40px;
}

.count-notice {
  color: grey;
  font-size: 28px;
}

.timerCount {
  color: rgb(65, 139, 244);
  font-size: 50px;
}
</style>
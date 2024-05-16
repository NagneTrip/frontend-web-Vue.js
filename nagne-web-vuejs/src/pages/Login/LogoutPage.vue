<template>
  <div>
    로그아웃 페이지
    <p>3초 뒤 메인 페이지로 이동합니다.</p>
    <p>{{ timerCount }}</p>
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

<style scoped></style>


<style lang="scss" scoped></style>
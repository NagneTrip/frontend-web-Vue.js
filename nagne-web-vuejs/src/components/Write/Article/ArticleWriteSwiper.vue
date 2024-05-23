<template>
  <swiper v-if="!props" :navigation="true" :spaceBetween="300" :centeredSlides="true" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <swiper-slide class="img-wrapper" v-for="(url, index) in tempUrl" :key="index">
      <img :src="url" class="swipe-img" alt="">
    </swiper-slide>
  </swiper>
  <swiper v-if="props" :navigation="true" :spaceBetween="300" :centeredSlides="true" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <swiper-slide class="img-wrapper" v-for="(url, index) in imgUrls" :key="index">
      <img :src="url" class="swipe-img" alt="">
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ref, watch } from "vue";
import { useWriteStore } from "@/store/write";
import { storeToRefs } from 'pinia';

const store = useWriteStore();
const { selectedImg, tempUrl } = storeToRefs(store);
const modules = ref([Navigation, Pagination]);

const props = defineProps({
  imgUrls: Object,
})
</script>

<style scoped>
.mySwiper {
  width: 800px;
  height: 800px;
  border-radius: 20px;
}

.img-wrapper {
  width: 800px;
  height: 800px;
  object-fit: cover;
}

.swipe-img {
  width: 880px;
  height: 880px;
  object-fit: cover;
}

@media screen and (max-width: 1300px) {
  .mySwiper {
    width: 700px;
    height: 700px;
    border-radius: 20px;
  }

  .img-wrapper {
    width: 700px;
    height: 700px;
  }

  .swipe-img {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}

@media screen and (max-width: 750px) {
  .mySwiper {
    width: 500px;
    height: 500px;
  }

  .img-wrapper {
    width: 500px;
    height: 500px;
  }

  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 이미지 비율을 유지하면서 컨테이너에 맞추기 */
  }
}
</style>

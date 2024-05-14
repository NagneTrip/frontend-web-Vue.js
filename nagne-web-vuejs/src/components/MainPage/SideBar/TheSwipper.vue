<template>
  <swiper
    :navigation="true"
    :spaceBetween="30"
    :centeredSlides="true"
    :loop="true"
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide><div class="swipe-img bg-1"></div></swiper-slide>
    <swiper-slide><div class="swipe-img bg-2"></div></swiper-slide>
    <swiper-slide><div class="swipe-img bg-3"></div></swiper-slide>
    <swiper-slide><div class="swipe-img bg-4"></div></swiper-slide>
    <swiper-slide><div class="swipe-img bg-5"></div></swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ref } from "vue";

const modules = ref([Navigation, Pagination, Autoplay]);
</script>

<style scoped>
.mySwiper {
  max-width: 1120px;
  width: 100%;
  height: 480px;
  border-radius: 20px;
  margin: 30px 0px 10px 0px;
}
.bg-1 {
  background-image: url("./src/assets/swipe/bg1.jpg");
}
.bg-2 {
  background-image: url("./src/assets/swipe/bg2.jpg");
}
.bg-3 {
  background-image: url("./src/assets/swipe/bg3.jpg");
}
.bg-4 {
  background-image: url("./src/assets/swipe/bg4.jpg");
}
.bg-5 {
  background-image: url("./src/assets/swipe/bg5.jpg");
}

.swipe-img {
  max-width: 1120px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

@media screen and (max-width: 1300px) {
  .mySwiper {
    width: 100%;
    max-width: 700px;
    height: 35vw;
    max-height: 360px;
    border-radius: 20px;
  }
}
@media screen and (max-width: 640px) {
  .mySwiper {
    display: none;
  }
}
</style>

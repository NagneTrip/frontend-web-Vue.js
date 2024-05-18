<template>
  <KakaoMap class="map" :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
  :width="'100%'" :height="'89vh'">
    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
  </KakaoMap>

</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};
</script>

<style scoped></style>
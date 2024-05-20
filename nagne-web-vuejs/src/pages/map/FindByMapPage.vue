<template>
  <KakaoMap class="map" :ref="map" :lat="mapLocation.lat" :lng="mapLocation.lng" :draggable="true" :width="'100%'"
    :height="'89vh'" @onLoadKakaoMap="onLoadKakaoMap">
    <!-- 싸피 마커 -->
    <KakaoMapMarker :lat="ssafyLocation.lat" :lng="ssafyLocation.lng"
      :image="{ imageSrc: '/src/assets/map_marker/ssafy_logo.png', imageWidth: 60, imageHeight: 30, imageOption: {} }"
      :infoWindow="{ content: 'SSAFY 광주 캠퍼스', visible: visibleRef }" @mouseOverKakaoMapMarker="mouseOverKakaoMapMarker"
      @mouseOutKakaoMapMarker="mouseOutKakaoMapMarker">
    </KakaoMapMarker>
    <!-- 내 위치 마커 -->
    <KakaoMapMarker v-if="gpsLocation.lat" :lat="gpsLocation.lat" :lng="gpsLocation.lng"
      :image="{ imageSrc: '/src/assets/logo/logo_img.png', imageWidth: 50, imageHeight: 40, imageOption: {} }">
    </KakaoMapMarker>
  </KakaoMap>
  <button type="button" class="btn btn-secondary gps-btn" @click="setGPSLoca">
    <font-awesome-icon :icon="faLocationCrosshairs" class="icon" id="faArrowUp" />
  </button>
  <TourList class="left-sidebar"></TourList>
</template>

<script setup>
/* global kakao */
import axios from "axios";
import TourList from "@/components/Map/Find/TourList.vue";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted, watch } from 'vue';
import { useMapStore } from '@/store/map';
import { useAuthStore } from '@/store/auth';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const authStore = useAuthStore();
const mapStore = useMapStore();
const map = ref(null);
const isGps = ref(false);
const ssafyLocation = ref({
  lat: 35.203949958272645, // 위도
  lng: 126.81073155701664, // 경도
});
const mapLocation = ref({
  lat: 35.20249158945052,
  lng: 126.81045491427376,
});
const gpsLocation = ref({});

const onLoadKakaoMap = async (mapRef) => {
  map.value = mapRef;
  isGps.value = true;
  getLoaction();

  //관광지 데이터 호출
  await fetchAttractionData();
};

//관광지 데이터 호출
const fetchAttractionData = async () => {
  if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
    return;
  }

  await axios()
}

const getLoaction = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    mapStore.userLocation = { lat, lng };
    gpsLocation.value = mapStore.userLocation;
  }, (error) => {
    console.error("Geolocation error:", error);
  });
}

const setGPSLoca = () => {
  if (map.value && gpsLocation.value.lat && gpsLocation.value.lng) {
    map.value.panTo(new kakao.maps.LatLng(gpsLocation.value.lat, gpsLocation.value.lng));
  }
};

const visibleRef = ref(false);
const mouseOverKakaoMapMarker = () => {
  visibleRef.value = true;
};

const mouseOutKakaoMapMarker = () => {
  visibleRef.value = false;
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 89vh;
}

.gps-btn {
  width: 50px;
  height: 50px;
  background-color: #2a79ff;
  color: white;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.gps-btn:hover {
  background-color: aliceblue;
  border: #2a79ff 1px dashed;
  scale: 1.2;
  transition: all 0.2s;

  #faArrowUp {
    color: #2a79ff;
  }
}
</style>

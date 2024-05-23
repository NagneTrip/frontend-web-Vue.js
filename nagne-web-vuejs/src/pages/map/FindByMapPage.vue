<template>
  <div>
    <KakaoMap
      class="map"
      ref="map"
      :lat="mapLocation.lat"
      :lng="mapLocation.lng"
      :draggable="true"
      :width="'100%'"
      :height="'89vh'"
      @onLoadKakaoMap="onLoadKakaoMap"
    >
      <!-- 싸피 마커 -->
      <KakaoMapMarker
        :lat="ssafyLocation.lat"
        :lng="ssafyLocation.lng"
        :image="{
          imageSrc: '/assets/map_marker/ssafy_logo.png',
          imageWidth: 60,
          imageHeight: 30,
          imageOption: {},
        }"
        :infoWindow="{ content: 'SSAFY 광주 캠퍼스', visible: visibleRef }"
        @mouseOverKakaoMapMarker="mouseOverKakaoMapMarker"
        @mouseOutKakaoMapMarker="mouseOutKakaoMapMarker"
      >
      </KakaoMapMarker>
      <!-- 내 위치 마커 -->
      <KakaoMapMarker
        v-if="gpsLocation.lat"
        :lat="gpsLocation.lat"
        :lng="gpsLocation.lng"
        :image="{
          imageSrc: '/assets/logo/logo_img.png',
          imageWidth: 50,
          imageHeight: 40,
          imageOption: {},
        }"
      >
      </KakaoMapMarker>
      <!-- 로드된 관광지 목록으로 마커 -->
      <KakaoMapMarker
        v-for="(attraction, index) in attractionsList"
        :key="attraction.id"
        :lat="attraction.latitude"
        :lng="attraction.longitude"
        :image="{
          imageSrc: `/assets/map_marker/${markerLogo(attraction.attractionTypeId)}.png`,
          imageWidth: 50,
          imageHeight: 40,
        }"
        :clickable="true"
        @onClickKakaoMapMarker="()=>openModal(attraction)"
      >
      </KakaoMapMarker>
    </KakaoMap>
    <button type="button" class="btn btn-secondary gps-btn" @click="setGPSLoca">
      <font-awesome-icon :icon="faLocationCrosshairs" class="icon" id="faArrowUp" />
    </button>
    <TourList
      :attractionsList="attractionsList"
      @load-attraction="loadAttraction"
      @update-filter="updateFilter"
      @change-keyword="updateKeyword"
    />
  </div>
  <div v-if="showModal" class="modal" @click.self="closeModal">
    <div class="modal-window">
      <button class="close" @click="closeModal"><font-awesome-icon :icon="faXmark" /></button>
      <TourListItem :attraction="chosenAttraction"/>
    </div>
  </div>
</template>

<script setup>
/* global kakao */
import axios from "axios";
import apiClient from "@/apiClient.js";
import TourList from "@/components/Map/Find/TourList.vue";
import { faLocationCrosshairs, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted, watch, computed } from "vue";
import { useMapStore } from "@/store/map";
import { useAuthStore } from "@/store/auth";
import { useAttractionStore } from "@/store/attraction";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { storeToRefs } from "pinia";
import TourListItem from "@/components/Map/Find/TourListItem.vue";
const attractionStore = useAttractionStore();
const authStore = useAuthStore();
const mapStore = useMapStore();
const map = ref(null);
const isGps = ref(false);
const chosenAttraction = ref({});


const ssafyLocation = ref({
  lat: 35.203949958272645, // 위도
  lng: 126.81073155701664, // 경도
});
const mapLocation = ref({
  lat: 35.20249158945052,
  lng: 126.81045491427376,
});
const gpsLocation = ref({});

const keyword = ref("광주");
const lastIndex = ref(100000000);
const attractionsList = ref([]);
const attractionTypeId = ref("");
const baseUrl = ref("/api/attractions?");

const showModal = ref(false);

const openModal = (attraction) => {
  showModal.value = true;
  chosenAttraction.value = attraction;
};

const closeModal = () => {
  showModal.value = false;
}

const onLoadKakaoMap = async (mapRef) => {
  map.value = mapRef;
  isGps.value = true;
  await getLoaction();

  //초기 관광지 데이터 호출
  attractionsList.value = [];
  await fetchFirstAttractionData();
};

const onLoadKakaoMapCustomOverlay = (newCustomOverlay) => {
  overlay.value = newCustomOverlay;
};
const closeOverlay = () => {
  overlay?.value?.setMap(null);
};
const onClickKakaoMapMarker = () => {
  map.value && overlay?.value?.setMap(map.value);
};

//초기 관광지 데이터 호출
const fetchFirstAttractionData = async () => {
  if (!sessionStorage.getItem("token") || !authStore.isAuthenticated) {
    return;
  }
  try {
    const response = await apiClient.get(
      baseUrl.value +
        `keyword=${keyword.value}&attractionTypeId=${attractionTypeId.value}&lastIndex=${lastIndex.value}&size=100`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    );
    attractionsList.value = response.data.response.attractions;
    if (attractionsList.value.length > 0) {
      lastIndex.value = attractionsList.value[attractionsList.value.length - 1].id;
    }
  } catch (error) {
    alert("잘못된 키워드입니다! 다시 확인해주세요.");
  }
};

//무한 스크롤 이벤트가 동작할때 호출
const loadAttraction = async () => {
  await fetchMoreAttractionData();
};

const fetchMoreAttractionData = async () => {
  if (!sessionStorage.getItem("token") || !authStore.isAuthenticated) {
    return;
  }
  await apiClient(
    baseUrl.value +
      `keyword=${keyword.value}&attractionTypeId=${attractionTypeId.value}&lastIndex=${lastIndex.value}&size=100`,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    }
  )
    .then(({ data }) => {
      attractionsList.value.push(...data.response.attractions);
      lastIndex.value = attractionsList.value[attractionsList.value.length - 1].id;
    })
    .catch(() => {
      alert("잘못된 키워드입니다! 다시 확인해주세요.");
    });
};

const updateFilter = async (filterId) => {
  attractionTypeId.value = filterId;
  console.log(attractionTypeId.value);
  lastIndex.value = 10000000;
  //필터 변경되면 다시 초기 부터 로드해야 함
  attractionsList.value = [];
  await fetchFirstAttractionData();
};

const updateKeyword = async (newVal) => {
  keyword.value = newVal;
  lastIndex.value = 10000000;
  //키워드 변경되면 다시 초기 부터 로드해야 함
  attractionsList.value = [];
  await fetchFirstAttractionData();
};

const getLoaction = async () => {
  await navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      mapStore.userLocation = { lat, lng };
      gpsLocation.value = mapStore.userLocation;
    },
    (error) => {
      console.error("Geolocation error:", error);
    }
  );
};

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

const markerLogo = (id) => {
  let result = typeData.value.filter((data) => data.attractionTypeId === id);
  return result[0].name;
};

const typeData = ref([
  { attractionTypeId: "", name: "all", img: "/assets/logo/logo_img.png", isSelected: true },
  { attractionTypeId: 39, name: "food", img: "/assets/map_marker/food.png", isSelected: false },
  {
    attractionTypeId: 38,
    name: "shopping",
    img: "/assets/map_marker/shopping.png",
    isSelected: false,
  },
  {
    attractionTypeId: 28,
    name: "activity",
    img: "/assets/map_marker/activity.png",
    isSelected: false,
  },
  {
    attractionTypeId: 15,
    name: "festival",
    img: "/assets/map_marker/festival.png",
    isSelected: false,
  },
  {
    attractionTypeId: 12,
    name: "nature",
    img: "/assets/map_marker/nature.png",
    isSelected: false,
  },
  {
    attractionTypeId: 32,
    name: "sleep",
    img: "/assets/map_marker/sleep.png",
    isSelected: false,
  },
  {
    attractionTypeId: 14,
    name: "culture",
    img: "/assets/map_marker/culture.png",
    isSelected: false,
  },
  { attractionTypeId: 25, name: "trip", img: "/assets/map_marker/trip.png", isSelected: false },
]);
</script>

<style scoped>
.map {
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

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  padding: 20px;
  text-align: center;
  z-index: 9999;
}

.modal-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  border-radius: 24px;
  text-align: center;
  z-index: 9999;
}

p{
  margin: 0;
}

.close {

  position: absolute;
  top: 30px;
  right: 40px;
  font-size: 40px;
  cursor: pointer;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  background-color: #2a79ff
}
</style>

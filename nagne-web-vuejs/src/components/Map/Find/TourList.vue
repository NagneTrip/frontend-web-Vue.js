<template>
  <div :class="['sidebar', { open: isOpen }]" :style="{ left: isOpen ? '3px' : '-445px' }">
    <div class="sidebar-container">
      <div class="sidebar-header">
        <div class="filter">
          <input type="text" class="attraction-search jua-regular" v-model="attractionSearch"
            @keyup.enter="invSearchAttractionalidEnter">
          <button id="attraction-search-btn" class="jua-regular" @click="SearchAttraction">검색</button>
        </div>
        <button v-show="isOpen" class="btns" id="close-btn" @click="toggleSidebar">
          <font-awesome-icon :icon="faXmark" />
        </button>
        <button v-show="!isOpen" class="btns" id="close-btn" @click="toggleSidebar">
          <font-awesome-icon :icon="faBars" />
        </button>
      </div>
      <div class="list-container">
        <TourListItem v-for="(attraction, index) in attractionsList" :attraction="attraction" :key="index" />
        <InfiniteLoading @infinite="loadData" />
      </div>
    </div>
    <div class="select-btn">
      <div class="select" @click="toggleExpand">
        <img :src="selectBtn[0].img" :alt="selectBtn[0].name" onerror="this.src='/src/assets/logo/sad_logo.png'" />
      </div>
      <transition-group name="slide-fade" tag="div">
        <div v-for="(btn, index) in selectBtn.slice(1)" :key="btn.name" v-if="isExpanded"
          :class="['select', { selected: btn.isSelected }]" @click="toggleSelectButton(btn)">
          <img :src="btn.img" :alt="btn.name" onerror="this.src='/src/assets/logo/sad_logo.png'" />
        </div>
      </transition-group>
    </div>
  </div>
  <div class="cart jua-regular" :style="{ right: rightBar ? '10px' : '-445px' }">
    <div class="close-section">
      <div v-if="rightBar" class="close-section-btn-wrapper" @click="togleRightBar">
        <font-awesome-icon class="close-section-btn" :icon="faXmark" :width="30" :height="30" />
      </div>
      <div v-if="!rightBar" class="close-section-btn-wrapper" @click="togleRightBar">
        <font-awesome-icon class="close-section-btn" :icon="faBars" />
      </div>
      <p>담은 여행지 {{ myAttractions.length }}개</p>
      <div class="space"></div>
    </div>
    <div class="like-section">
      <div class="like-item" v-for="(myAttraction, index) in myAttractions" :key="myAttraction.id">
        <div class="item-info-both">
          <img :src="myAttraction.imageUrl" alt="">
          <p class="myatt-title">{{ myAttraction.title }}</p>
        </div>
        <button @click="deleteItem(myAttraction.id)">삭제</button>
      </div>
    </div>
    <div class="make-plan-section">
      <button>계획 만들기</button>
    </div>

  </div>

</template>

<script setup>
import draggable from "vuedraggable";
import { faBars, faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import TourListItem from "./TourListItem.vue";
import { computed, ref, watch } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { useAttractionStore } from "@/store/attraction";
import { storeToRefs } from "pinia";
const attractionStore = useAttractionStore();
const { myAttractions } = storeToRefs(attractionStore);
const { changeKeyword } = attractionStore;
import { attraction_type } from "@/assets/attraction_type/attraction_type";

const attractionByData = ref({});
const rightBar = ref(false);
const isOpen = ref(true);
const isExpanded = ref(false); // 초기값을 false로 설정하여 처음에는 숨겨진 상태로 시작
const selectedBtn = ref(''); // 선택된 버튼을 저장할 변수
const tripDay = ref(1);
const tripDays = ref(Array(tripDay.value).fill({}));
const attractionSearch = ref("");

const SearchAttraction = () => {
  changeKeyword(attractionSearch.value);
  emit('changeKeyword', attractionSearch.value);
}

watch(tripDay, (newVal) => {
  tripDays.value = Array(newVal).fill({});
});

const deleteItem = (myAttractionId) => {
  attractionStore.deleteMyAttractions(myAttractionId);
}

const switchTypeToName = (typeId) => {
  let result;
  switch (typeId) {
    case 39:
      result = {
        name: "Food",
        img: "/src/assets/map_marker/food.png",
      };
      break;
    case 38:
      result = {
        name: "Shopping",
        img: "/src/assets/map_marker/shopping.png",
      };
      break;
    case 28:
      result = {
        name: "Activity",
        img: "/src/assets/map_marker/activity.png",
      };
      break;
    case 15:
      result = {
        name: "Festival",
        img: "/src/assets/map_marker/festival.png",
      };
      break;
    case 12:
      result = {
        name: "Nature",
        img: "/src/assets/map_marker/nature.png",
      };
      break;
    case 32:
      result = {
        name: "Sleep",
        img: "/src/assets/map_marker/sleep.png",
      };
      break;
    case 14:
      result = {
        name: "Culture",
        img: "/src/assets/map_marker/culture.png",
      };
      break;
    case 25:
      result = {
        name: "Trip",
        img: "/src/assets/map_marker/trip.png",
      };
      break;
  }
  return result;
}

const tripPlan = computed(() => `Trip for ${tripDay.value} day(s)`);

const props = defineProps({
  attractionsList: Object,
});

watch(props.attractionsList, (newval) => {
  console.log(newval)
})

const emit = defineEmits(["loadAttraction", "updateFilter", "changeKeyword"]);

const updateTripDay = (how) => {
  if (how == '+') {
    if (tripDay.value >= 4) {
      tripDay.value = 4;
    }
    else {
      tripDay.value++;
    }
  } else {
    if (tripDay.value <= 1) {
      tripDay.value = 1;
    } else {
      tripDay.value--;
    }
  }


}

const loadData = () => {
  emit("loadAttraction");
};

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
}

const togleRightBar = () => {
  rightBar.value = !rightBar.value;
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (!isOpen.value) {
    // 리스트가 닫힐 때 'all' 버튼을 선택 상태로 변경하고 다른 버튼 초기화
    selectBtn.value.forEach((btn) => {
      btn.isSelected = btn.name === "all";
    });
    emit("updateFilter", selectBtn.value.find((btn) => btn.name === "all").attractionTypeId);
  } else {
    // 리스트가 열릴 때 'all' 버튼을 선택 해제 상태로 변경
    const allButton = selectBtn.value.find((btn) => btn.name === "all");
    if (allButton) {
      allButton.isSelected = false;
    }
  }
};

const toggleSelectButton = (btn) => {
  if (isExpanded.value) {
    selectBtn.value.forEach((b) => {
      b.isSelected = b === btn;
    });
    emit("updateFilter", btn.attractionTypeId);
  }
};

const tripSchedule = () => {
  switch (tripDay.value) {
    case 1:
      return '당일여행';
    case 2:
      return '1박 2일';
    case 3:
      return '2박 3일';
    case 4:
      return '3박 4일';
  }
}

const selectBtn = ref([
  { attractionTypeId: "", name: "all", img: "/src/assets/logo/logo_img.png", isSelected: true },
  { attractionTypeId: 39, name: "food", img: "/src/assets/map_marker/food.png", isSelected: false },
  {
    attractionTypeId: 38,
    name: "shopping",
    img: "/src/assets/map_marker/shopping.png",
    isSelected: false,
  },
  {
    attractionTypeId: 28,
    name: "activity",
    img: "/src/assets/map_marker/activity.png",
    isSelected: false,
  },
  {
    attractionTypeId: 15,
    name: "festival",
    img: "/src/assets/map_marker/festival.png",
    isSelected: false,
  },
  {
    attractionTypeId: 12,
    name: "nature",
    img: "/src/assets/map_marker/nature.png",
    isSelected: false,
  },
  {
    attractionTypeId: 32,
    name: "sleep",
    img: "/src/assets/map_marker/sleep.png",
    isSelected: false,
  },
  {
    attractionTypeId: 14,
    name: "culture",
    img: "/src/assets/map_marker/culture.png",
    isSelected: false,
  },
  { attractionTypeId: 25, name: "trip", img: "/src/assets/map_marker/trip.png", isSelected: false },
]);

// 리스트 상태가 변경될 때마다 'all' 버튼 상태를 적절히 설정
watch(isExpanded, (newVal) => {
  if (!newVal) {
    const allButton = selectBtn.value.find((btn) => btn.name === "all");
    if (allButton) {
      allButton.isSelected = true;
    }
    emit("updateFilter", allButton.attractionTypeId);
  } else {
    const allButton = selectBtn.value.find((btn) => btn.name === "all");
    if (allButton) {
      allButton.isSelected = false;
    }
  }
});
</script>

<style scoped>
.p {
  margin: 0;
}

.sidebar {
  display: inline-block;
  width: 570px;
  height: 85vh;
  background-color: none;
  color: white;
  position: fixed;
  top: 110px;
  z-index: 99;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  transition: all 0.3s;
  overflow: hidden;
}

.sidebar-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.sidebar-header {
  width: 95%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter {
  display: flex;
  gap: 8px;
}

.filter button {
  width: 75px;
  height: 40px;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.filter button:hover {
  transform: scale(1.1);
  background-color: blue;
  transition: all 0.2s;
}

.attraction-search {
  padding-left: 20px;
  width: 360px;
  height: 40px;
  border: 1px solid #5a96fc;
  border-radius: 12px;
  letter-spacing: 2px;
  font-size: 20px;
}

.attraction-search:active {
  outline: none;
  border: none;
}

#attraction-search-btn {
  background-color: rgb(89, 147, 255);
  width: 60px;
  color: white;
}

#attraction-search-btn:active {
  background-color: rgb(18, 95, 238);
}

#close-btn {
  width: 30px;
  height: 30px;
  background-color: rgb(206, 206, 206);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

#close-btn:hover {
  transform: scale(1.1);
  transition: all 0.2s;
  background-color: #5a96fc;
}

.btns {
  border-radius: 12px;
  background-color: #5a96fc;
  color: white;
  border: none;
}

.list-container {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.list-container::-webkit-scrollbar {
  display: none;
}

.select-btn {
  width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
}

.select {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: rgb(236, 236, 236);
  transition: all 0.2s;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-bottom: 10px;
}

.select:hover {
  background-color: #fc2cac;
  transform: scale(1.04);
  transition: all 0.2s;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.9);
}

.select.selected {
  background-color: rgb(89, 147, 255);
  color: white;
}

.select img {
  margin: auto;
  width: 35px;
  height: 35px;
}

/* 애니메이션 설정 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  /* 슬라이드 다운 효과를 바로 아래로 */
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  /* 슬라이드 업 효과를 위로 */
  opacity: 0;
}

.cart {
  display: inline-block;
  width: 500px;
  height: 700px;
  background-color: #eeeeee;
  color: rgb(0, 0, 0);
  position: fixed;
  right: 10px;
  top: 130px;
  z-index: 99;
  padding: 5px;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  transition: all 0.2s;
  padding-top: 10px;
  box-shadow: 3px 4px 5px 3px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.close-section {
  width: 95%;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-section p {
  font-size: 28px;
}

.close-section-btn-wrapper {
  width: 30px;
  height: 30px;
  background-color: rgb(206, 206, 206);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
}

.close-section-btn-wrapper:hover {
  transform: scale(1.1);
  transition: all 0.2s;
  background-color: #5a96fc;
}

.close-section-btn {
  width: 18px;
  height: 18px;
  color: white;
}

.cart-header {
  display: flex;
  gap: 20px;
  width: 300px;
  justify-content: space-between;
  align-items: center;
}

.cart-header p {
  cursor: default;
  font-size: 20px;
}

.cart-header button {
  width: 60px;
  height: 40px;
  border-radius: 18px;
  border: none;
  background-color: #5a96fc;
  color: white;
  font-size: 24px;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.4);
}

.cart-header button:hover {
  scale: 1.05;
  transition: 0.2s all;
}

.day-section-container {
  flex: 1 1 auto;
  width: 90%;
  overflow-y: auto;
  scrollbar-width: none;
  margin-top: 20px;
}

.space {
  width: 30px;
  height: 30px;
}

.like-section {
  width: 90%;
  height: 500px;
  background-color: #e0e0e0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.like-item {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between
}

.myatt-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.item-info-both {
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: row;
  gap: 20px;
}

.item-info-both img {
  width: 120px;
  border-radius: 8px;
}



.make-plan-section {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.make-plan-section button {
  width: 90%;
  border-radius: 12px;
}



.form-select {
  border-radius: 12px;
}

.tripSection {
  width: 100%;

  border: 40px;
}

.trip-item {
  width: 90%;
  min-height: 200px;
  background-color: rgb(243, 243, 243);
}

.list-item {
  color: black;
  background-color: white;
  border: 3.5px solid rgb(118, 189, 255);
  width: 95%;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 2px 2px 5px 2px #aacdff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}

.item-img {
  width: 100%;
  height: 320px;
  display: flex;
  justify-content: center;
  margin: 10px 0px 0px 0px;
  object-fit: fill;
}

.item-img img {
  width: 90%;
  height: 100%;
  border-radius: 14px;
}

.no-img {
  opacity: 0.8;
  width: 90%;
  height: 100%;
  background-color: rgb(197, 197, 197);
  border-radius: 14px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  margin-bottom: 10px;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 28px;
}

.type {
  font-size: 24px;
}

.address {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-right {
  display: flex;
  gap: 10px;
}

button {
  border: none;
  background-color: #898989;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px 0px #5f5f5f;
}

button:hover {
  background-color: #0068ff;
  transition: 0.2s all;
  scale: 1.05;
}

.cart-icon {
  color: rgb(244, 244, 244);
  width: 30px;
  height: 30px;
}

.filter-img {
  width: 50px;
  height: 50px;
}
</style>

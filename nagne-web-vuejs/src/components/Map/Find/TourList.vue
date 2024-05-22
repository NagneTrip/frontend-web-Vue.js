<template>
  <div :class="['sidebar', { open: isOpen }]" :style="{ left: isOpen ? '3px' : '-445px' }">
    <div class="sidebar-container">
      <div class="sidebar-header">
        <div class="filter">
          <button class="btns jua-regular">거리순</button>
          <button class="btns jua-regular">인기순</button>
        </div>
        <button v-show="isOpen" class="btns" id="close-btn" @click="toggleSidebar">
          <font-awesome-icon :icon="faXmark" />
        </button>
        <button v-show="!isOpen" class="btns" id="close-btn" @click="toggleSidebar">
          <font-awesome-icon :icon="faBars" />
        </button>
      </div>
      <div class="list-container">
        <TourListItem
          class="list-item"
          v-for="(attraction, index) in attractionsList"
          :attraction="attraction"
          :key="index"
        />
        <InfiniteLoading @infinite="loadData" />
      </div>
    </div>
    <div class="select-btn">
      <div class="select" @click="toggleExpand">
        <img
          :src="selectBtn[0].img"
          :alt="selectBtn[0].name"
          onerror="this.src='/src/assets/logo/sad_logo.png'"
        />
      </div>
      <transition-group name="slide-fade" tag="div">
        <div
          v-for="(btn, index) in selectBtn.slice(1)"
          :key="btn.name"
          v-if="isExpanded"
          :class="['select', { selected: btn.isSelected }]"
          @click="toggleSelectButton(btn)"
        >
          <img :src="btn.img" :alt="btn.name" onerror="this.src='/src/assets/logo/sad_logo.png'" />
        </div>
      </transition-group>
    </div>
  </div>
  <div class="cart">
    <select class="form-select jua-regular" @change="updateTripday">
      <option selected>여행 일정을 선택하세요!</option>
      <option value="1">당일 여행</option>
      <option value="2">1박 2일</option>
      <option value="3">2박 3일</option>
      <option value="4">3박 4일</option>
    </select>
    <div class="tripSection" v-for="(day, index) in tripDay" :key="day">
      <div class="trip-item">아아</div>
    </div>
  </div>

</template>

<script setup>
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import TourListItem from "./TourListItem.vue";
import { ref, watch } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const isOpen = ref(true);
const isExpanded = ref(false); // 초기값을 false로 설정하여 처음에는 숨겨진 상태로 시작
const selectedBtn = ref(null); // 선택된 버튼을 저장할 변수
const tripDay = ref(1);

const updateTripday = (event) => {
  tripDay.value = event.target.value
}

const props = defineProps({
  attractionsList: Object,
});

const emit = defineEmits(["loadAttraction", "updateFilter"]);

const loadData = () => {
  emit("loadAttraction");
};



const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
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
  console.log(selectBtn)
};

const toggleSelectButton = (btn) => {
  if (isExpanded.value) {
    selectBtn.value.forEach((b) => {
      b.isSelected = b === btn;
    });
    emit("updateFilter", btn.attractionTypeId);
  }
  console.log(`Selected button: ${btn.name}, isSelected: ${btn.isSelected}`);
};

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
  display: flex;
  justify-content: space-between;
}

.filter {
  display: flex;
  gap: 8px;
}

.filter button {
  width: 75px;
  height: 30px;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.filter button:hover {
  transform: scale(1.1);
  background-color: blue;
  transition: all 0.2s;
}

#close-btn {
  width: 30px;
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
  height: 75vh;
  background-color: #eeeeee;
  color: white;
  position: fixed;
  right: 10px;
  top: 130px;
  z-index: 99;
  padding: 5px;
  border-radius: 18px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  transition: all 0.2s;
  overflow: hidden;
  padding-top: 10px;
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
</style>

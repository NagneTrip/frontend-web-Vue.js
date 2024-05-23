<template>
  <div :class="['sidebar', { open: isOpen }]" :style="{ left: isOpen ? '3px' : '-445px' }">
    <div class="sidebar-container">
      <div class="sidebar-header">
        <div class="filter">
          <input
            type="text"
            class="jua-regular search-keyword"
            placeholder="키워드를 입력하세요."
            v-model="searchKeyword"
          />
          <button class="jua-regular search-btn" @click="searchAttraction">검색</button>
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
          onerror="this.src='/assets/logo/sad_logo.png'"
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
          <img :src="btn.img" :alt="btn.name" onerror="this.src='/assets/logo/sad_logo.png'" />
        </div>
      </transition-group>
    </div>
  </div>
  <div class="cart" :style="{ right: isRightOpen ? '3px' : '-445px' }">
    <div class="cart-btns">
      <button v-show="isRightOpen" class="btns" id="close-btn" @click="toggleRightBar">
        <font-awesome-icon :icon="faXmark" />
      </button>
      <button v-show="!isRightOpen" class="btns" id="close-btn" @click="toggleRightBar">
        <font-awesome-icon :icon="faBars" />
      </button>
      <p class="jua-regular" style="margin-right: 20px">
        선택된 여행지 {{ myAttractions.length }}개
      </p>
      <div class="white-space" :width="30"></div>
    </div>
    <div class="tripSection">
      <div class="trip-item" v-for="(myAttraction, index) in myAttractions" :key="myAttraction.id">
        <div class="item-left">
          <img class="item-img":src="myAttraction.imageUrl" alt="" />
          <p class="item-text jua-regular">{{ truncateText(myAttraction.title) }}</p>
        </div>
        <button @click="attractionStore.deleteMyAttractions(myAttraction.id)">삭제</button>
      </div>
    </div>
    <button class="makePlan jua-regular" @click="makePlan">계획 만들기</button>
  </div>
</template>

<script setup>
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import TourListItem from "./TourListItem.vue";
import { ref, watch } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { useAttractionStore } from "@/store/attraction";
import { storeToRefs } from "pinia";
import {useRouter} from 'vue-router';
const router = useRouter();
const attractionStore = useAttractionStore();
const { myAttractions } = storeToRefs(attractionStore);

const isRightOpen = ref(false);
const isOpen = ref(true);
const isExpanded = ref(false); // 초기값을 false로 설정하여 처음에는 숨겨진 상태로 시작
const selectedBtn = ref(null); // 선택된 버튼을 저장할 변수
const tripDay = ref(1);
const searchKeyword = ref("");

// computed 속성을 사용하여 잘린 문자열 반환

const makePlan = ()=> {
  sessionStorage.setItem('myAttractions', JSON.stringify(myAttractions.value));
  router.push({name : 'planWrite'});
}

const truncateText = (text) => {
  if (text.length > 7) {
    return text.substring(0, 7) + '...';
  }
  return text;
};

const toggleRightBar = () => {
  isRightOpen.value = !isRightOpen.value;
};

const updateTripday = (event) => {
  tripDay.value = event.target.value;
};

const props = defineProps({
  attractionsList: Array,
});

const emit = defineEmits(["loadAttraction", "updateFilter", "changeKeyword"]);

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
  console.log(selectBtn);
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

const searchAttraction = () => {
  emit("changeKeyword", searchKeyword.value);
};

const selectBtn = ref([
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
  align-items: center;
  gap: 2px;
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
  margin-top: 30px;
  width: 95%;
  height: 520px;
  background-color: rgb(243, 243, 243);
  border: 40px;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: center;
  gap : 20px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.trip-item {
  width: 100%;
  background-color: rgb(186, 186, 186);
  border-radius: 16px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-keyword {
  width: 350px;
  height: 40px;
  border-radius: 12px;
  border: 2px solid rgb(89, 147, 255);
  letter-spacing: 2px;
  padding-left: 10px;
}

.search-keyword:focuse {
  outline: none;
  border: 2px solid rgb(89, 147, 255);
}

.search-btn {
  width: 75px;
  height: 40px;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.search-btn:hover {
  transform: scale(1.1);
  background-color: blue;
  transition: all 0.2s;
}

.cart-btns {
  height: 40px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
}

.cart-btns p {
  font-size: 24px;
  color: black;
}

#close-btn {
  width: 40px;
}

.white-space {
  width: 30px;
  height: 25px;
}

.makePlan {
  border-radius: 12px;
  width: 95%;
  height: 50px;
  border: none;
  background-color: #94bafb;
  transition: 0.2s all;
}

.makePlan:hover {
  background-color: #4388ff;
  scale: 1.05;
  transition: 0.2s all;
}

.item-left {
  display: flex;
  gap : 10px;
  font-size: 24px;
}

.item-img {
  width: 180px;
  height: 120px;
  border-radius: 12px;
}

.item-text {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>

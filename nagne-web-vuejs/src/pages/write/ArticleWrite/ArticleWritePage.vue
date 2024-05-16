<template>
  <div class="article-detail-page" @click="()=>{move('back')}">
    <div class="modal-wrapper">
      <div class="modal-box" @click.stop>
        <div class="modal-left">
          <template v-if="renderBaseImg" >
            <img class="modal-left-img" :src="baseImg" alt="" :width="650" :height="600">
          </template>
          <template v-if="!renderBaseImg" >
            <ArticleWriteSwiper class="modal-left-img" v-if="!renderBaseImg" :width="650" :height="600"/>
          </template>
        </div>
        <div class="modal-right">
          <ArticleImgSelect v-if="store.step==1"/>
          <ArticleContent v-if="store.step==2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import ArticleImgSelect from "@/components/Write/Article/ArticleImgSelect.vue"
import ArticleContent from "@/components/Write/Article/ArticleContent.vue"
import ArticleWriteSwiper from "@/components/Write/Article/ArticleWriteSwiper.vue"
import { useWriteStore } from "@/store/write";
import {storeToRefs} from 'pinia'
const store = useWriteStore();
const { selectedImg, tempUrl } = storeToRefs(store);

const router = useRouter();
const renderBaseImg = ref(true);

const baseImg = ref("/src/assets/logo/logo.png");
const move = (path) => {
  switch (path) {
    case 'back':
      store.step = 1;
      tempUrl.value = ref([]);
      selectedImg.value = ref([]);
      renderBaseImg.value = true;
      router.go(-1);
      break;
  }
};

// watch를 사용하여 store.selectedImg의 변화를 감시합니다.
watch((selectedImg, tempUrl), () => {
  if (tempUrl.value.length >= 1) {
    renderBaseImg.value = false;
  } else {
    renderBaseImg.value = true;
  }
}, { deep: true });


</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");

.noto-sans-kr-regular {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.noto-sans-kr-bold {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.user-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 200px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.article-detail-page {
  position: fixed;
  /* 고정된 위치 */
  top: 0;
  /* 상단에서 0px 위치 */
  left: 0;
  /* 좌측에서 0px 위치 */
  width: 100%;
  /* 전체 너비 */
  height: 100%;
  /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5);
  /* 반투명 배경 */
  display: flex;
  justify-content: center;
  /* 중앙 정렬 */
  align-items: center;
  /* 중앙 정렬 */
  z-index: 1000;
  /* 다른 요소들 위에 표시 */
}

.modal-wrapper {
  height: 90%;
}

.modal-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.modal-left {
  width: 880px;
  height: 880px;
  background-color: #ffffff;
  border-radius: 8px 0 0 8px;
  box-shadow: 6px 0 6px 4px rgba(0, 0, 0, 0.1);
  /* 오른쪽과 아래쪽에 그림자 */
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-left-img {
  width: 100%;
  height: 100%;
  border: 1px solid grey;
  border-radius: 15px;
  overflow: hidden;
}

.modal-right {
  /* 기존 스타일 유지, overflow-y 스타일 제거 */
  width: 480px;
  background-color: #f7f7f7;
  border-radius: 0 8px 8px 0;
  box-shadow: 6px 4px 6px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 50px;
  gap: 30px;
}

.header-text {
  font-size: 40px;
  color: rgb(118, 189, 255);
  font-weight: 400;
  letter-spacing: 2px;
  margin: 0;
}

.select-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
}

input[type="file"] {
  display: none;
}

.add-img-btn {
  border: none;
  width: 100px;
  height: 100px;
  background-color: rgb(118, 189, 255);
  border-radius: 50px;
  transition: all 0.3s;
  box-shadow: 0px 6px 6px 4px rgba(0, 0, 0, 0.1);
}

.add-img-btn:hover {
  transition: all 0.3s;
  scale: 1.2;
  background-color: rgb(65, 139, 244);
}

.add-img-icon {
  color: white;
  width: 60px;
  height: 60px;
}

.selected {
  width: 200px;
  min-height: 100px;
  border: 3px rgb(65, 139, 244) dashed;
  border-radius: 15px;
  box-shadow: 0px 6px 6px 4px rgba(0, 0, 0, 0.1);
  padding: 0 12px 0 12px;
}

.selected-text {
  margin: 8px 0 0 0;
  font-size: 25px;
  display: flex;
  justify-content: center;
  color: rgb(23, 117, 250);
}

.selected-img {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img-text {
  font-size: 16 px;
  margin: 0;
}

.delete-img {
  border: none;
  color: white;
  background-color: rgb(255, 174, 174);
  width: 35px;
  height: 25px;
  font-size: 12px;
  padding: 1.5px 0 0 0;
  border-radius: 8px;
  margin-top: 5px;
  font-weight: 300;
  letter-spacing: 1px;
  transition: all 0.2s;
}

.delete-img:hover {
  background-color: red;
  scale: 1.05;
  transition: all 0.2s;
}

.right-footer {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.right-footer-btn {
  width: 60px;
  height: 40px;
  border-radius: 12px;
  border: none;
}

.back-btn {
  background-color: rgb(185, 185, 185);
  color: white;
  transition: 0.2s all;
}
.back-btn:hover {
  background-color: red;
  transition: 0.2s all;
}

.next-btn {
  background-color: rgb(118, 189, 255);
  color: white;
  transition: 0.2s all;
}
.next-btn:hover {
  background-color: rgb(23, 117, 250);
  transition: 0.2s all;
}

@media screen and (min-width: 1400px) {
  .modal-left {
    border-right: 1.7px solid rgb(228, 228, 228);
  }
}



@media screen and (max-width: 1400px) {
  .modal-wrapper {
    height: 80%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* 상단 정렬을 보장 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: #fff;

    /* 배경색 설정 */
    ::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    border-radius: 8px 8px 8px 8px;
  }

  .modal-box {
    min-height: 100%;
    width: 100%;
    /* 내부 박스의 너비를 100%로 설정 */
    display: flex;
    flex-direction: column;
    /* 콘텐츠를 수직으로 정렬 */
    justify-content: flex-start;
  }

  .modal-left {
    width: 560px;
    height: 560px;
    border-radius: 8px 8px 0 0;
  }

  .modal-right {
    width: 560px;
    height: 100%;
    min-height: 100%;
    border-radius: 0 0 8px 8px;
  }

  .select-section {
    flex-direction: row;
    gap : 30px;
  }
}

@media screen and (max-width: 600px) {
  .modal-wrapper {
    height: 70%;
    min-width: 70%;
    width: 90%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* 상단 정렬을 보장 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    /* 모달에 그림자 효과 추가 */
    background-color: #fff;

    /* 배경색 설정 */
    ::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    border-radius: 8px 8px 8px 8px;
  }

  .modal-box {
    width: 100%;
  }

  .modal-left {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
    box-shadow: 6px 6px 0 4px rgba(0, 0, 0, 0.1);
  }

  .modal-right {
    width: 100%;
    min-height: 100%;
    display: flex;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.1);
    padding : 0 0 10px 0;
  }
}
</style>

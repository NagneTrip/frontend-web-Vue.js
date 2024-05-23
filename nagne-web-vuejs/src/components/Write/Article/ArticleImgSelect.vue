<template>
  <div class="right-header">
    <p class="header-text jua-regular">게시물 등록</p>
  </div>
  <div class="select-section">
    <input type="file" @change="fileChangeHandler" ref="inputFileRef" accept=".jpg, .jpeg, .png, .gif, .svg" multiple>
    <button class="add-img-btn" @click="inputImg">
      <font-awesome-icon :icon="faImage" class="add-img-icon" />
    </button>
    <div class="selected">
      <p class="jua-regular selected-text">Selected</p>
      <div class="selected-imgs-list">
        <div v-if="selectedImg" class="selected-img" v-for="(img, index) in selectedImg" :key="index">
          <p class="img-text noto-sans-kr-regular">{{ truncatedName(img.name) }}</p>
          <button class="delete-img jua-regular" @click="() => deleteImg(index)">삭제</button>
        </div>
      </div>
    </div>
  </div>

  <div class="right-footer">
    <button class="right-footer-btn back-btn" @click="() => move('back')">
      <font-awesome-icon :icon="faXmark" :width="40" />
    </button>
    <button class="right-footer-btn next-btn" @click="() => move('next')">
      <font-awesome-icon :icon="faArrowRight" :width="40" />
    </button>
  </div>
</template>

<script setup>
import { faArrowRight, faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useWriteStore } from "@/store/write";
import { storeToRefs } from 'pinia';
import imageCompression from "browser-image-compression";

const store = useWriteStore();
const { selectedImg, tempUrl } = storeToRefs(store);

const router = useRouter();
const inputFileRef = ref(null);

const move = (path) => {
  switch (path) {
    case 'back':
      store.step = 1;
      router.push({ name: 'write' });
      break;
    case 'next':
      store.step++;
      break;
  }
};

onMounted(() => {
  store.selectedImg = [];
  store.tempUrl = [];
});

const fileChangeHandler = async (event) => {
  if (event.target.files && event.target.files.length > 0) {
    console.log(event.target.files[0].name)
    for (let file of event.target.files) {
      store.selectedImg.push(file);
      const url = URL.createObjectURL(file);
      store.tempUrl.push(url);
    }
  }
};


const inputImg = () => {
  inputFileRef.value.click();
};

const deleteImg = (index) => {
  selectedImg.value.splice(index, 1);
  tempUrl.value.splice(index, 1);
};

const truncatedName = (img) => {
  if (img && img.name) {
    return img.name.length > 10 ? img.name.substring(0, 10) + '..' : img.name;
  }
  return '';
};
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
  height: 100%;
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
  justify-content: space-between;
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
    gap: 30px;
  }
}

@media screen and (max-width: 600px) {
  .modal-wrapper {
    height: 70%;
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
    padding: 0 0 10px 0;
  }

  @media screen and (max-width: 464px) {
    .modal-wrapper {
      height: 60%;
    }

    .modal-box {
      min-height: 60%;
    }

    .select-section {
      flex-direction: column;
    }
  }
}
</style>
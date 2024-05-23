<template>
  <div class="write-page">
    <div class="write-menu">
      <div class="row-container">
        <div class="write" id="gps-icon">
          <p class="jua-regular header-text">내 여행지</p>
          <draggable
            :list="myAttractions"
            item-key="id"
            class="list-group"
            ghost-class="ghost"
            group="attractions"
            @start="dragging = true"
            @end="dragging = true"
          >
            <template #item="{ element, index }">
              <div class="plan-item">
                <div class="item-info">
                  <img class="item-img" :src="element.imageUrl" alt="" />
                  <div class="item-title">
                    <p class="title jua-regular">{{ element.title }}</p>
                    <p class="addr jua-regular">
                      {{ element.addr.split(" ")[0] }} {{ element.addr.split(" ")[1] }}
                    </p>
                  </div>
                </div>
                <div class="item-btn">
                  <button
                    class="jua-regular"
                    @click="attractionStore.deleteMyAttractions(element.id)"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="row-container">
        <div class="write" id="carrier-icon">
          <p class="jua-regular header-text">여행 계획</p>
          <div class="answer jua-regular">
            {{ planContent }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="jua-regular footer-btn plan-to-gpt" @click="getPlanToGPT">
        AI에게 요청하기
      </button>
      <button class="jua-regular footer-btn share-plan" @click="sharePlan">계획 공유하기</button>
    </div>
  </div>
  <div v-if="isLoading" class="loading-screen">
    <img src="/assets/blue_spinner.svg" alt="" />
  </div>
  <div v-if="showModal" class="modal" @click.self="showModal=false">
    <div class="modal-window">
      <button class="close" @click="showModal=false"><font-awesome-icon :icon="faXmark" /></button>
      <div class="modal-answer jua-regular">
        {{planContent}}
      </div>
    </div>
    <div class="jua-regular share-btn-group">
        <button class="jua-regular" @click="write">게시물 쓰기</button>
        <button class="jua-regular" @click="copy">복사하기</button>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { ref, watch } from "vue";
import { useAttractionStore } from "@/store/attraction";
import { storeToRefs } from "pinia";
import { getGPTResponse } from "@/openai/gptAPI";
import { useRoute, useRouter } from "vue-router";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const attractionStore = useAttractionStore();
const { myAttractions } = storeToRefs(attractionStore);
const router = useRouter();

const planContent = ref("");
const isLoading = ref(false);
const showModal = ref(false);

const getPlanToGPT = async () => {
  if (myAttractions.value.length === 0) {
    alert("여행지를 추가하세요!");
    router.push({ name: "mapFind" });
    return;
  }

  isLoading.value = true;
  planContent.value = await getGPTResponse(myAttractions.value);
};

const sharePlan = () => {
    showModal.value = true;
};

const copy = ()=> {
    window.navigator.clipboard.writeText();
    alert("클립보드에 복사가 완료되었습니다!");
}

const write = ()=>{
    sessionStorage.setItem('plan', planContent.value);
    router.push({name : 'articleWrite'});
    return;
}

watch(planContent, () => {
  isLoading.value = false;
});
</script>

<style scoped>
.write-page {
  width: 100%;
  height: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  background-image: url("/assets/page/map_main.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom, center;
  transition: all 0.2s;
}

.address-btn {
  width: 240px;
  height: 60px;
  border-radius: 35px;
  background-color: rgb(134, 184, 255);
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 30px 0 10px 0;
  border: none;
  box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}

.address-btn:hover {
  background-color: white;
  color: rgb(134, 184, 255);
  scale: 1.05;
  transition: all 0.2s;

  .gps-btn {
    color: rgb(134, 184, 255);
  }
}

.address-btn p {
  margin: 0;
}

.gps-btn {
  color: white;
  width: 30px;
  height: 30px;
}

.write-top {
  margin: 50px 0 20px 0;
  font-size: 50px;
  letter-spacing: 1.5px;
  color: rgb(255, 255, 255);
  font-weight: 500;
  text-shadow: 2px 2px 3px grey;
  cursor: default;
}

.write-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  transition: all 0.2s;
  opacity: 0.8;
  margin-top: 50px;
}

.row-container {
  display: flex;
  gap: 50px;
}

.write {
  border: 3px solid black;
  width: 500px;
  height: 600px;
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  gap: 10px;
  padding-top: 15px;
  transition: all 0.2s;
  box-shadow: 0px 6px 6px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.header-text {
  font-size: 28px;
  letter-spacing: 1.5px;
}

.answer {
  width: 90%;
  height: 80%;
  margin: 20px auto 20px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  word-break: break-word;
  font-size: 18px;
}

.add-img-icon {
  color: black;
  width: 90px;
  height: 100px;
  transition: all 0.1s;
}

.footer {
  width: 1000px;
  height: 100px;
  display: flex;
  gap: 260px;
  justify-content: center;
}

.footer-btn {
  width: 300px;
  height: 80px;
  border-radius: 40px;
  border: none;
  box-shadow: 3px 3px 20px 3px rgb(117, 117, 118);
  color: white;
  transition: 0.2s all;
  font-size: 20px;
}

.share-plan {
  background-color: rgb(134, 184, 255);
}

.share-plan:hover {
  scale: 1.1;
  background-color: rgb(36, 125, 248);
}

.plan-to-gpt {
  background-color: rgb(194, 142, 243);
}

.plan-to-gpt:hover {
  scale: 1.1;
  background-color: rgb(236, 22, 251);
}

.list-group {
  overflow-y: scroll;
  scrollbar-width: none;
}

.plan-item {
  display: flex;
  width: 90%;
  margin: 10px auto 10px auto;
  background-color: azure;
  opacity: 1;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 10px;
  gap: 30px;
  box-shadow: 1px 1px 10px 0px #878787;
}

.item-info {
  width: 100%;
  display: flex;
  gap: 20px;
}

.item-img {
  width: 160px;
  height: 100px;
  border-radius: 18px;
}

.item-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.title {
  font-size: 18px;
}

.item-btn {
  width: 50px;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.item-btn button {
  border-radius: 12px;
  border: none;
  width: 50px;
  height: 25px;
  background-color: rgb(219, 199, 222);
  box-shadow: 1px 1px 2px 0px #878787;
}

.item-btn button:hover {
  scale: 1.05;
  background-color: rgb(248, 119, 245);
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-screen img {
  width: 100px;
  height: 100px;
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
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  border-radius: 24px;
  text-align: center;
  z-index: 9999;
  padding: 20px;
}

p {
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
  background-color: #2a79ff;
}

.modal-answer {
    background-color: rgb(236, 236, 236);
    border-radius: 24px;
    width: 800px;
    height: 400px;
    font-size: 22px;
padding: 50px;
}

.share-btn-group {
    z-index: 99999;
    position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}

.share-btn-group button {
    width: 120px;
    height: 60px;
    border-radius: 24px;
    transition: 0.2 all;
}

.share-btn-group button:hover {
    background-color: azure;
    scale: 1.05;
    transition: 0.2 all;
}


@media screen and (max-width: 1300px) {
  .write-menu {
    gap: 30px;
    transition: all 0.2s;
  }

  .row-container {
    gap: 30px;
  }

  .write {
    width: 200px;
    height: 200px;
    transition: all 0.2s;
  }

  .add-img-icon {
    width: 80px;
    height: 80px;
    transition: all 0.1s;
  }
}

@media screen and (max-width: 950px) {
  .write-menu {
    flex-direction: column;
    gap: 50px;
  }

  .row-container {
    gap: 50px;
  }

  .write-top {
    font-size: 24px;
  }
}

@media screen and (max-width: 450px) {
  .write-top {
    display: none;
  }

  .row-container {
    gap: 20px;
    flex-direction: column;
  }

  .write-menu {
    gap: 20px;
    margin-top: 30px;
  }
}
</style>

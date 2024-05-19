<template>
  <div class="write-content-page">
    <div class="right-header">
      <p class="header-text jua-regular">게시글 내용을 작성하세요.</p>
    </div>
    <div class="right-content">
      <textarea type="text" class="content-input" v-model.lazy="content"></textarea>
    </div>
    <div class="right-footer">
      <button class="right-footer-btn back-btn" @click="() => move('back')">
        <font-awesome-icon :icon="faArrowLeft" :width="40" />
      </button>
      <button class="jua-regular right-footer-btn next-btn" @click="() => move('next')">
        게시
      </button>
    </div>
  </div>
</template>

<script setup>
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWriteStore } from "@/store/write";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from 'pinia';
import axios from "axios";

const authStore = useAuthStore();
const writeStore = useWriteStore();
const { selectedImg } = storeToRefs(writeStore);

const content = ref("");
const router = useRouter();

const move = async (path) => {
  switch (path) {
    case 'main':
      router.push({ name: 'main' });
      break;
    case 'back':
      writeStore.step--;
      break;
    case 'next':
      // 데이터 검증
      if (!content.value) {
        alert('내용을 입력하세요.');
        return;
      }
      if (selectedImg.value.length === 0) {
        alert('이미지를 선택하세요.');
        return;
      }
      // api 추가
      await uploadFile();
      break;
  }
};

const uploadFile = async () => {
  const formData = new FormData();
  formData.append('encrypt', "multipart/form-data");

  for (let i = 0; i < selectedImg.value.length; i++) {
    formData.append('images', selectedImg.value[i]);
  }

  const json = JSON.stringify({ content: content.value });
  const blob = new Blob([json], { type: "application/json" });
  formData.append('request', blob);

  try {
    await axios.post('http://localhost:8080/api/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    alert("게시글이 등록되었습니다!");
    move('main');
  } catch (error) {
    console.error(error);
  }
};
</script>



<style scoped>
.write-content-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.right-header {
  width: 80%;
}

.header-text {
  font-size: 30px;
  letter-spacing: 2px;
  color: rgb(118, 189, 255);
  display: flex;
}

.right-content {
  width: 80%;
  height: 400px;
}

.content-input {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 3px solid rgb(65, 139, 244);
  text-align: left;
  vertical-align: top;
  resize: none;
  padding: 15px;
  font-size: 22px;
  letter-spacing: 0.7px;
  font-weight: 500
}

.content-input:focus {
  outline: none;

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
  font-size: 20px;
  letter-spacing: 3px
}

.next-btn:hover {
  background-color: rgb(23, 117, 250);
  transition: 0.2s all;
}
</style>
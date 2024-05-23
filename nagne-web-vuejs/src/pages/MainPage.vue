<template>
  <div class="main">
    <div class="main-container">
      <TheSwipper />
      <div class="wrapper">
        <div class="content">
          <div class="write-article-box" @click="moveWrite">
            <div class="write-article-left-box">
              <div class="write-article-icon-box">
                <font-awesome-icon v-if="!profileImage" :icon="faUser" class="write-article-icon" />
                <img v-if="profileImage" :src="profileImage" :width="45" :height="45"
                  onerror="this.src='/assets/logo/sad_logo.png'" />
              </div>
              <p class="jua-regular">나누고 싶은 추억이 있나요?</p>
            </div>
            <div>
              <font-awesome-icon :icon="faPen" class="write-icon" />
            </div>
          </div>
          <div class="article-container" ref="articleContainer">
            <TheArticle v-for="(article, index) in articles" :article="article" :key="article.id"
              @open-article-modal="openModal" />
          </div>
          <img v-if="isLoading" src="/assets/blue_spinner.svg" alt="Loading" class="spinner" />
        </div>
        <div class="vertical-line"></div>
        <div class="side" ref="sideSection">
          <div class="side-content">
            <TheWeather />
            <TheBestArticle />
          </div>
        </div>
      </div>
    </div>
    <ArticleDetailModal v-if="isOpenModal && authStore.isAuthenticated" :article="modalArticle[0]"
      @close-modal="closeModal" @like="change('like')" @unlike="change('unlike')" @bookmark="change('bookmark')"
      @unbookmark="change('unbookmark')" />
    <div class="navbar-icons-wrapper" id="faArrowUp-button" @click="scrollToTop">
      <font-awesome-icon :icon="faArrowUp" class="icon" id="faArrowUp" />
    </div>
  </div>
</template>

<script setup>
import { faUser, faPen, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import TheArticle from "@/components/MainPage/Article/TheArticle.vue";
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import apiClient from '@/apiClient.js';

import TheWeather from "@/components/MainPage/SideBar/TheWeather.vue";
import TheNotice from "@/components/MainPage/SideBar/TheNotice.vue";
import TheBestArticle from "@/components/MainPage/SideBar/TheBestArticle.vue";
import TheFooter from "@/components/MainPage/SideBar/TheFooter.vue";
import TheSwipper from "../components/MainPage/SideBar/TheSwipper.vue";
import ArticleDetailModal from "@/components/MainPage/Article/ArticleDetailModal.vue";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();

const articles = ref([]);
const router = useRouter();
const isOpenModal = ref(false);
const modalArticle = ref(null);
const lastIndex = ref(10000000);
const isLoading = ref(false);
const noMoreData = ref(false);
const profileImage = ref('');

onMounted(() => {
  if (isLoading.value || noMoreData.value) return;

  isLoading.value = true;
  let url = `/api/articles?size=5`;
  if (lastIndex.value !== null) {
    url += `&lastIndex=${lastIndex.value}`;
  }

  if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
    fetchArticles(url);
  } else {
    profileImage.value = sessionStorage.getItem('profileImage');
    fetchArticlesAtLogin(url);
  }


  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});

const fetchArticlesAtLogin = async (url) => {
  await getAxiosReq(url, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
}
const fetchArticles = async (url) => {
  await getAxiosReq(url, {})
};

const getAxiosReq = async (url, hd) => {
  await apiClient.get(url, {}, hd)
    .then(response => {
      const articlesData = response.data.response.articles;
      if (articlesData.length < 5) {
        noMoreData.value = true;
      }

      articles.value.push(...articlesData); // 데이터 누적

      if (articlesData.length > 0) {
        lastIndex.value = articlesData[articlesData.length - 1].id; // 마지막 데이터의 ID로 업데이트
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading.value && !noMoreData.value) {
    isLoading.value = true;
    const url = `/api/articles?size=5&lastIndex=${lastIndex.value}`;
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
      fetchArticles(url);
    } else {
      fetchArticlesAtLogin(url);
    }

  }
};

// 여기서부터 수정해야 함
const change = (what) => {
  switch (what) {
    case 'like':
      break;
    case 'unlike':
      break;
    case 'bookmark':
      break;
    case 'unbookmark':
      break;
  }
}

const openModal = (id) => {
  if (authStore.isAuthenticated) {
    isOpenModal.value = true;
    modalArticle.value = articles.value.filter(article => article.id === id);
  }
};

const closeModal = () => {
  isOpenModal.value = false;
  modalArticle.value = null;
};

const moveWrite = () => {
  router.push({ name: 'write' });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const sideSection = ref(null);


</script>




<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: center;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
}

.content {
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.write-article-box {
  width: 100%;
  height: 70px;
  background-color: #eeeeee;
  border-radius: 45px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px 0px 15px;
}

.write-article-left-box {
  display: flex;
  gap: 10px;
}

.write-article-left-box p {
  margin: 0;
}

.write-article-icon-box {
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background-color: #c2c2c2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.write-article-icon {
  width: 25px;
  height: 25px;
  color: #eeeeee;
}

.write-article-left-box p {
  font-size: x-large;
  letter-spacing: 2px;
  color: #ababad;
  display: flex;
  align-items: center;
}

.write-icon {
  width: 30px;
  height: 30px;
  color: #ababad;
}

.article-container {
  width: 700px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 0px 0px;
}

.vertical-line {
  width: 1.2px;
  background-color: rgb(194, 194, 194);
}

.side {
  width: 380px;
  height: 100vh;
  display: flex;
  gap: 15px;
  position: sticky;
  top: 20px;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scrollbar-width: none;
  border-left: 1.7px solid rgb(228, 228, 228);

  ::-webkit-scrollbar {
    display: none;
  }
}

.side-content {
  width: 340px;
  height: 1800px;
  margin-left: 40px;

  gap: 20px;
}

@media screen and (max-width: 1300px) {
  .main {
    width: 100%;
  }

  .main-container {
    max-width: 880px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .wrapper {
    max-width: 880px;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  .content {
    width: 100%;
  }

  .write-article-box {
    width: 100%;
    margin-top: 15px;
  }

  .article-container {
    width: 100%;
  }

  .vertical-line {
    display: none;
  }

  .side {
    display: none;
  }
}

@media screen and (max-width: 640px) {
  .write-article-left-box p {
    font-size: 18px;
  }
}

@media screen and (max-width: 456px) {
  .write-article-box {
    display: none;
  }

  .article-container {
    margin-top: 20px;
  }
}

.navbar-icons-wrapper {
  background-color: white;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms;
  position: relative;
}

.navbar-icons-wrapper:hover {
  scale: 1.1;
  transition: all 100ms;
  cursor: pointer;
  background-color: rgb(118, 189, 255);

  .icon {
    color: white;
    scale: 1.1;
    transition: all 200ms;
  }
}

#faArrowUp-button {
  background-color: rgb(118, 189, 255);
  color: white;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50px;
}

#faArrowUp-button:active {
  background-color: #2a79ff;
}

#faArrowUp {
  width: 30px;
  height: 30px;
}

.spinner {
  width: 300px;
  height: 300px;
  display: block;
  margin: 50px auto 20px auto;
}
</style>
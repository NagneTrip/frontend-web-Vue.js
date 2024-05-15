<template>
  <div class="main">
    <!--  메인 영역 -->
    <div class="main-container">
      <TheSwipper />
      <div class="wrapper">
        <div class="content">
          <div class="write-article-box">
            <div class="write-article-left-box">
              <div class="write-article-icon-box">
                <font-awesome-icon :icon="faUser" class="write-article-icon" />
              </div>
              <p class="jua-regular">나누고 싶은 추억이 있나요?</p>
            </div>
            <div>
              <font-awesome-icon :icon="faPen" class="write-icon" />
            </div>
          </div>
          <div class="article-container">
            <TheArticle v-for="(article, index) in articles" :article="article" :key="article.id"
              @open-article-modal="openModal" />
            <!-- <Article />
        <Article />
        <RecomendFriends />
        <Article />
        <Advertisement /> -->
          </div>
        </div>
        <div class="vertical-line"></div>
        <!-- 사이드바 -->
        <div class="side" ref="sideSection">
          <div class="side-content">
            <TheWeather />
            <TheNotice />
            <TheBestArticle />
            <TheFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
  <ArticleDetailModal v-if="isOpenModal && store.isAuthenticated" :key="modalArticle[0].id" :articleId="modalArticle[0].id"
    @close-modal="closeModal" @changed="stateChanged" />
</template>

<script setup>
import { faUser, faPen } from "@fortawesome/free-solid-svg-icons";
import TheArticle from "@/components/MainPage/Article/TheArticle.vue";
import { onMounted, ref, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import TheWeather from "@/components/MainPage/SideBar/TheWeather.vue";
import TheNotice from "@/components/MainPage/SideBar/TheNotice.vue";
import TheBestArticle from "@/components/MainPage/SideBar/TheBestArticle.vue";
import TheFooter from "@/components/MainPage/SideBar/TheFooter.vue";
import TheSwipper from "../components/MainPage/SideBar/TheSwipper.vue";
import ArticleDetailModal from "@/components/MainPage/Article/ArticleDetailModal.vue";
import { useAuthStore } from "@/store/auth";
const store = useAuthStore();

const articles = ref([]);
onMounted(() => {
  if (store.isAuthenticated) { //로그인 o
    axios
      .get("http://localhost:8080/api/articles?size=7", {
        //토큰 넣어서게시글 받아오기
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })
      .then(({ data }) => {
        articles.value = data.response.articles;
      })
      .catch((error) => {
        console.error(error);
      });
  } else { //로그인 x
    axios
      .get("http://localhost:8080/api/articles?size=7", {
      })
      .then(({ data }) => {
        articles.value = data.response.articles;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

const sideSection = ref(null);

onMounted(() => {
  const handleScroll = () => {
    if (sideSection.value) {
      sideSection.value.scrollTo({
        top: window.scrollY,
        behavior: "smooth", // 부드러운 스크롤
      });
    }
  };

  window.addEventListener("scroll", handleScroll);

  // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});

const isOpenModal = ref(false);
const modalArticle = ref({});
const openModal = (id) => {
  if (store.isAuthenticated) {
    //로그인 상태이면 게시글 로드
    isOpenModal.value = true;
    modalArticle.value = articles.value.filter(a => a.id === id);
  }
};
const router = useRouter();
const closeModal = () => {
  isOpenModal.value = false;
  modalArticle.value = {};
}
//좋아요, 북마크 클릭시 갯수 렌더링을 위한 비동기
const stateChanged = async () => {
  if (!store.isAuthenticated) { //이미 로그인 되어 있으면 토큰 갱신
    alert("로그인 후 이용하세요!");
    return;
  }
    await useAuthStore().getToken();

  await axios.get("http://localhost:8080/api/articles?size=7", {
    //토큰 넣어서게시글 받아오기
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  })
    .then(({ data }) => {
      articles.value = data.response.articles;
    })
    .catch((error) => {
      console.error(error);
    });
}
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
  gap: 20px;
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
  height: 1500px;
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
</style>

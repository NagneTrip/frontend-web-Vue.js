<template>
  <div class="main">
    <!--  메인 영역 -->
    <div class="main-container">
      <div class="bookmark"></div>
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
            <TheArticle v-for="(article, index) in articles" :article="article" :key="article.id" />
            <!-- <Article />
        <Article />
        <RecomendFriends />
        <Article />
        <Advertisement /> -->
          </div>
        </div>
        <div class="vertical-line">
        </div>
        <!-- 사이드바 -->
        <div class="side">
          <div class="side-content">
            <TheWeather />
            <div class="side-notice"></div>
            <div class="side-bestarticle"></div>
            <div class="side-footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  faUser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import TheArticle from "@/components/MainPage/TheArticle.vue";
import { onMounted, ref } from "vue"
import axios from "axios";
import TheWeather from "@/components/MainPage/TheWeather.vue";

const articles = ref([]);
onMounted(() => {
  const token = window.localStorage.getItem('token'); //로컬스토리지에서 토큰 로드

  axios.get('http://localhost:8080/api/articles', { //게시글 받아오기
    params: {
      tags: '#태그1',
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(({ data }) => {
      articles.value = data.response.articles;
    })
    .catch(error => {
      console.error(error);
    });
})

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

.bookmark {
  max-width: 1280px;
  width: 100%;
  height: 360px;
  border: 2px solid rgb(118, 189, 255);
  border-radius: 20px;
  margin: 30px 0px 10px 0px;
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
  border-radius: 15px 15px 0px 0px;
}

.vertical-line {
  width: 1.2px;
  background-color: rgb(194, 194, 194);
}

.side {
  width: 380px;
  height: 1200px;
  display: flex;
  gap: 15px;
  position: sticky;
  top: 10px;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scrollbar-width: none;
  border-left: 1.7px solid rgb(228, 228, 228);

  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}
.side-content {
  width: 340px;
  /* display: flex;
  flex-direction: column; */
  margin-left: 40px;
  gap :20px;
}

.side-notice {
  width: 100%;
  height: 160px;
  background-color: #a6afab;
}

.side-bestarticle {
  width: 100%;
  height: 720px;
  background-color: #cfadad;
}

.side-footer {
  width: 100%;
  height: 400px;
  background-color: #cccbcb;
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

  .bookmark {
    width: 100%;
    max-width: 700px;
    height: 25vw;
    border: 2px solid rgb(118, 189, 255);
    border-radius: 20px;
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
  .bookmark {
    display: none;
  }

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
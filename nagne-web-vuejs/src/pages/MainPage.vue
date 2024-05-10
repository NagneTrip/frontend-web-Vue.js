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
        <div class="side" :style="{paddingTop : scrollY*0.9-500+'px' ? scrollY*0.9-500+'px' : 0, Transition : '0.01s all'}">
          <!-- <Weather /> -->
          <div class="side-notice"></div>
          <div class="side-bestarticle"></div>
          <div class="side-footer"></div>
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
import { onMounted, ref,onUnmounted,watch, Transition } from "vue"
import axios from "axios";

const articles = ref([]);
onMounted(() => {
  const token = window.localStorage.getItem('token');
  axios.get('http://localhost:8080/api/articles', {
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
const scrollY = ref(0); // 스크롤 X 위치

function updateScrollPosition() {
  scrollY.value = window.scrollY; // 현재 문서의 수평 스크롤 위치를 업데이트
  console.log(scrollY.value)
}
onMounted(() => {
  window.addEventListener('scroll', updateScrollPosition); // 컴포넌트 마운트 시 스크롤 이벤트 리스너 추가
});
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollPosition); // 컴포넌트 언마운트 시 리스너 제거
});


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
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.side-weather {
  width: 100%;
  height: 80px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 30px 5px 30px;
}

.weather-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #5b5c5c;
}

.weather-icon {
  width: 100px;
  height: 100px;
  border-radius: 15px;
}

.side-notice {
  width: 100%;
  height: 160px;
  background-color: #eeeeee;
  border-radius: 15px;
}

.side-bestarticle {
  width: 100%;
  height: 720px;
  background-color: #eeeeee;
  border-radius: 15px;
}

.side-footer {
  width: 100%;
  height: 400px;
  border-radius: 15px;
  background-color: #eeeeee;
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

  .side-weather {
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--ssafy-blue);
    box-shadow: #96999c 1px 2px 3px 1px;
    cursor: pointer;
  }

  .weather-text {
    display: none;
  }

  .weather-icon {
    width: 100px;
    height: 100px;
    display: flex;
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
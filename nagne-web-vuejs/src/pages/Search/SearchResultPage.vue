<template>
  <div class="card card-body">
    <div class="search-box">
      <font-awesome-icon
        class="serach-icon icon"
        id="navbar-search-btn"
        :icon="faMagnifyingGlass"
      />
      <input
        class="search-input jua-regular-large"
        placeholder="검색어를 입력하세요."
        type="text"
        v-model="inputContent"
        @keyup.enter="moveTo('search')"
      />
      <button class="jua-regular search-btn" @click="moveTo('search')" >검색</button>
    </div>
  </div>
  <div class="main">
    <div class="main-container">
      <div class="wrapper">
        <div class="content">
          <div class="article-container" ref="articleContainer">
            <div class="tab">
              <button class="jua-regular tab-btn" :class="{ isSelected: nowTab === 'all' }" @click="changeTab('all')">
                전체
              </button>
              <button class="jua-regular tab-btn" :class="{ isSelected: nowTab === 'user' }" @click="changeTab('user')">
                프로필
              </button>
              <button class="jua-regular tab-btn" :class="{ isSelected: nowTab === 'article' }" @click="changeTab('article')">
                게시물
              </button>
              <button class="jua-regular tab-btn" :class="{ isSelected: nowTab === 'attraction' }" @click="changeTab('attraction')">
                여행지
              </button>
            </div>
            <p v-if="nowTab === 'all'" class="notice jua-regular">검색 결과는 최대 3개씩만 노출됩니다.</p>
              <SearchAll v-if="nowTab === 'all'" @change-tab="changeTab" :usersByKeyword="usersByKeyword" :articlesByKeyword="articlesByKeyword" :attractionByKeyword="attractionByKeyword"/>
            <SearchUser v-if="nowTab === 'user'" />
            <SearchArticle v-if="nowTab === 'article'" />
            <SearchKeyword v-if="nowTab === 'attraction'" />
            
          </div>
        </div>
        <div class="vertical-line"></div>
        <div class="side" ref="sideSection">
          <div class="side-content">
            <TheWeather style="margin-top: 30px;" />
            <TheNotice />
            <TheBestArticle />
            <TheFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { onMounted, ref,watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import TheWeather from "@/components/MainPage/SideBar/TheWeather.vue";
import TheNotice from "@/components/MainPage/SideBar/TheNotice.vue";
import TheBestArticle from "@/components/MainPage/SideBar/TheBestArticle.vue";
import TheFooter from "@/components/MainPage/SideBar/TheFooter.vue";
import SearchAll from "@/components/Search/SearchAll.vue";
import SearchUser from "@/components/Search/SearchUser.vue";
import SearchArticle from "@/components/Search/SearchArticle.vue";
import SearchKeyword from "@/components/Search/SearchAttraction.vue";
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();
const keywordByQuery = route.query.q;
const nowTab = ref("all");
const isLoading = ref(false);

const usersByKeyword = ref([]);
const articlesByKeyword = ref([]);
const attractionByKeyword = ref([]);


const validKey = (event)=> {
  console.log(event.target)
}

const inputContent = ref(keywordByQuery);
const moveTo = (path) => {
  let to;
  switch (path) {
    case "search":
      to = { name: path, query: { q: inputContent.value } };
      break;
    case "login":
      to = { name: path };
      break;
  }
  router.push(to);
};

const changeTab = (tabTo) => {
    nowTab.value = tabTo;
}

onMounted(async() => {
  if (!sessionStorage.getItem("token") || !authStore.isAuthenticated) {
    alert("로그인 후 이용하세요!");
    moveTo("login");
    return;
  }
  //키워드와 일치하는
  //유저 정보 조회
  await fetchUserByKeyword();
  //게시물 정보 조회
  await fetchArticleByKeyword();
  //여행지 정보 조회
  await fetchAttractionByKeyword();
});

watch(keywordByQuery, async()=>{
  //키워드와 일치하는
  //유저 정보 조회
  await fetchUserByKeyword();
  //게시물 정보 조회
  await fetchArticleByKeyword();
  //여행지 정보 조회
  await fetchAttractionByKeyword();
})

const fetchUserByKeyword = async ()=> {
  await axios.get(`http://localhost:8080/api/users?keyword=${route.query.q.split(" ").join('')}&lastIndex=1000000&size=3`,{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  .then(({data})=>{
    usersByKeyword.value = data.response.userInfo;
  })
}

const fetchArticleByKeyword = async()=> {
  await axios.get(`http://localhost:8080/api/articles/tags?tags=%23${route.query.q.trim().split(" ").join('')}&size=3`,{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  .then(({data})=>{
    articlesByKeyword.value = data.response.articles;
  })
}

const fetchAttractionByKeyword = async()=> {
  await axios.get(`http://localhost:8080/api/attractions?keyword=${route.query.q.split(" ").join('')}&size=3`,{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  .then(({data})=>{
    attractionByKeyword.value = data.response.attractions;
  })
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
  justify-content: center;
}

.tab {
  margin-top: 30px;
  width: 100%;
  height: 80px;
  display: flex;
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 20px;
}

.tab-btn {
  width: 100%;
  height: 80px;
  border: none;
  font-size: 20px;
  background-color: #c4c4c4;
  color: #f9f9f9;
  transition: 0.2s all;
}

.tab-btn:hover {
  font-size: 22px;
  transition: 0.2s all;
}

.isSelected {
  background-color: #6098f9;
  font-size: 26px;
  transition: 0.2s all;
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

.notice {
  font-size: 16px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  color: #ababad;
  letter-spacing: 1.5px;
}
</style>

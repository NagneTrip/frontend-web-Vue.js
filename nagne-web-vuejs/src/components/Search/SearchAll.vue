<template>
    <div class="page">
        <div class="result profile-result">
            <div class="profile-result-header">
                <p class="header-text">프로필</p>
                <button class="moreBtn jua-regular">더보기</button>
            </div>
            <div v-if="usersByKeyword" class="profile-result">
                <div v-for="user in usersByKeyword">{{user.username}}</div>
            </div>
            <div v-if="!usersByKeyword[0]" class="result-text-box">
                <img src="/src/assets/logo/sad_logo.png" class="sad-img" alt="" :width="200">
                <p class="jua-regular result-text">검색 결과가 없습니다.</p>
            </div>
        </div>
        <div class="result article-result">
            <div class="article-result-header">
                <p class="header-text">게시물</p>
                <button class="moreBtn jua-regular">더보기</button>
            </div>
            <div v-if="articlesByKeyword" class="article-result">
                <div v-for="article in articlesByKeyword">{{article.title}}</div>
            </div>
            <div v-if="!articlesByKeyword[0]" class="result-text-box">
                <img src="/src/assets/logo/sad_logo.png" class="sad-img" alt="" :width="200">
                <p class="jua-regular result-text">검색 결과가 없습니다.</p>
            </div>
        </div>
        <div class="result profile-result">
            <div class="attraction-result-header">
                <p class="header-text">여행지</p>
                <button class="moreBtn jua-regular">더보기</button>
            </div>
            <div v-if="attractionByKeyword" class="attraction-result">
                <div v-for="attracion in attractionByKeyword">{{attracion.title}}</div>
            </div>
            <div v-if="!attractionByKeyword" class="result-text-box">
                <img src="/src/assets/logo/sad_logo.png" class="sad-img" alt="" :width="200">
                <p class="jua-regular result-text">검색 결과가 없습니다.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
import {useAuthStore} from '@/store/auth.js'
const authStore = useAuthStore();

const props = defineProps({
    usersByKeyword :Object,
    articlesByKeyword : Object,
    attractionByKeyword : Object
})

onMounted(()=>{
    console.log(props)
})


</script>

<style scoped>
.page {
    width: 100%;
    padding: 30px 15px 30px 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.result {
    width: 90%;
    padding-bottom: 40px;
    border-bottom: 1.5px rgb(136, 137, 138) solid;
    margin-bottom: 40px;
}

.article-result-header, .profile-result-header, .attraction-result-header {
    display: flex;
    justify-content: space-between;
}

.moreBtn {
    border: none;
    background-color: #a8c8f9;
    width: 60px;
    height: 35px;
    border-radius: 8px;
}

.header-text {
    width: 70%;
  color: #0068FF;
  font-family: Noto Sans CJK KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 47.36px;
  text-align: left;
  margin-bottom: 20px;
  cursor: default;
}

.result-text-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sad-img {
    opacity: 0.4;
}

.result-text {
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: rgb(136, 137, 138);

}
</style>
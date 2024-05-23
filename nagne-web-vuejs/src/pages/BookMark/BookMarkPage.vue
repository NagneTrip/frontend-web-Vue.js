<template>
    <div class="user-page">
        <div class="user-info">
            <div class="user-profile-img">
                <img :src="userInfo.profileImage || '/assets/logo/logo_img.png'"
                    onerror="this.src='/assets/logo/sad_logo.png'" alt="" :width="200" :height="200">
            </div>
            <div class="info-box">
                <div class="info-box-top">
                    <div class="info-name">
                        <p class="nickname jua-regular">{{ userInfo.nickname }}</p>
                        <img :src="`/assets/tier/${userInfo.tier}.svg`"
                            onerror="this.src='/assets/logo/sad_logo.png'" :width="25" :height="25" alt=""
                            class="tier-img" />
                    </div>
                    <button class="edit-profile-btn jua-regular" @click="move">프로필 상세</button>
                </div>
                <div class="info-box-social">
                    <p class="jua-regular">북마크한 게시물 {{ }} < - 갯수</p>
                </div>
            </div>
        </div>
        <div class="article-section">
            <GridView :bookMarkList="bookMarkList" />
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import apiClient from '@/apiClient.js';

import { faTableCells, faExpand } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from '@/store/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"
const router = useRouter();
import GridView from '@/components/BookMark/GridView.vue';
const authStore = useAuthStore();

const tabState = ref('grid');
const userInfo = ref({});
const bookMarkList = ref([]);

onMounted(async () => {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        return;
    }

    await fetchUserInfo();
    await fetchBookMarkList();
})

const fetchUserInfo = async () => {
    await apiClient.get(`/api/users/${sessionStorage.getItem('loginUserId')}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, },
    }).then(({ data }) => {
        userInfo.value = data.response.userInfo;
    })
}

const fetchBookMarkList = async () => {
    await apiClient.get(`/api/articles/bookmark?size=9`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, },
    }).then(({ data }) => {
        bookMarkList.value = data.response.articles;
    })
}

const move = () => {
    router.push({ name: 'user', params: { 'id': userInfo.value.id } })
}


</script>

<style scoped>
p {
    margin: 0;
}

.user-page {
    width: 100%;
    height: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-info {
    height: 250px;
    width: 750px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 70px 0 0 0;
    padding: 0 30px 50px 30px;
    border-bottom: 2px solid rgb(219, 219, 219);
}

.user-profile-img {
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 100px
}

.user-profile-img {
    width: 200px;
    height: 200px;
}

.info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 450px;
    height: 100%;
}

.info-box-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-box-social {
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    width: 100%;
    margin: 0 auto 0 auto;
}

.info-name {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nickname {
    font-size: 30px;
    cursor: pointer;
}

.edit-profile-btn {
    width: 85px;
    height: 35px;
    border: none;
    background-color: rgb(118, 189, 255);
    border-radius: 12px;
    color: white;
    transition: 0.2s all;
}

.edit-profile-btn:hover {
    background-color: #0068FF;
    scale: 1.1;
    transition: 0.2s all;
}

.unfollow {
    width: 85px;
    height: 35px;
    border: none;
    background-color: rgb(167, 167, 167);
    border-radius: 12px;
    color: white;
    transition: 0.2s all;
}

.unfollow:hover {
    background-color: #f36f57;
    scale: 1.1;
    transition: 0.2s all;
}

.social {
    cursor: pointer;
}

.social:hover {
    color: #0068FF;
}

.tab-btn {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 60px 0 60px;
    margin-bottom: 20px;
}

.tab-btn div {
    width: 2px;
    height: 100%;
    background-color: rgb(219, 219, 219);
}

.tab {
    width: 300px;
    height: 60px;
    border: none;
    background-color: white;
    color: grey;
    font-size: 18px;
}

.tab-selected {
    color: #0068FF;
}

.article-section {
    margin-top: 30px;
}
</style>
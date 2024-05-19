<template>
    <div class="user-page">
        <div class="user-info">
            <div class="user-profile-img">
                <img src="@/assets/logo/logo_img.png" alt="" :width="150" :height="150">
            </div>
            <div class="info-box">
                <div class="info-box-top">
                    <div class="info-name">
                        <p class="nickname jua-regular">{{ userInfo.nickname }}</p>
                        <img :src="`/src/assets/tier/${userInfo.tier}.svg`" :width="25" :height="25" alt=""
                            class="tier-img" />
                    </div>

                    <button class="edit-profile-btn jua-regular">프로필 편집</button>
                    <template>
                        <button class="edit-profile-btn jua-regular">팔로우</button>
                        <button class="edit-profile-btn jua-regular">팔로잉</button>
                    </template>
                </div>
                <div class="info-box-social">
                    <p class="jua-regular">게시물 {{ userArticlesLen }}</p>
                    <p class="jua-regular social" @click="openFollowModal('followers')">팔로워 {{ userInfo.followers }}</p>
                    <p class="jua-regular social" @click="openFollowModal('following')">팔로잉 {{ userInfo.followings }}
                    </p>
                </div>
            </div>
        </div>
        <div class="tab-btn">
            <button class="tab jua-regular" :class="{ 'tab-selected': tabState === 'article' }"
                @click="changeTab('article')">게시물</button>
            <button class="tab jua-regular" :class="{ 'tab-selected': tabState === 'plan' }"
                @click="changeTab('plan')">여행
                계획</button>
        </div>
        <div class="article-section">
            <template v-if="tabState === 'article'">
                <UserArticle :userArticles="userArticles" />
            </template>
            <template v-if="tabState === 'plan'">
                <UserPlan />
            </template>
        </div>
        <UserFollowing v-if="isFollowingOpen" :userInfo="userInfo" @close-follow-modal="closeFollowModal" />
        <UserFollowers v-if="isFollowersOpen" :userInfo="userInfo" @close-follow-modal="closeFollowModal" />
    </div>
</template>

<script setup>
import UserArticle from '@/components/User/UserArticle.vue';
import UserPlan from '@/components/User/UserPlan.vue';
import UserFollowing from '@/components/User/UserFollowing.vue';
import UserFollowers from '@/components/User/UserFollowers.vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const userInfo = ref({});
const userArticles = ref([]);
const userIdByParams = route.params.id;
const tabState = ref('article');
const isFollowingOpen = ref(false);
const isFollowersOpen = ref(false);

const changeTab = (tab) => {
    tabState.value = tab;
}

const openFollowModal = (type) => {
    switch (type) {
        case 'followers':
            isFollowersOpen.value = true;
            break;

        case 'following':
            isFollowingOpen.value = true;
            break;
    }
}

const closeFollowModal = () => {
    isFollowersOpen.value = false;
    isFollowingOpen.value = false;
}

onMounted(async () => {
    if (!sessionStorage.getItem('token')) {
        alert('유저 정보는 로그인 후 확인할 수 있습니다.');
        router.push({ name: 'login' });
        return;
    }

    // 유저 정보 로드
    await axios.get(`http://localhost:8080/api/users/${userIdByParams}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }).then(({ data }) => {
        userInfo.value = data.response.userInfo;
        console.log(userInfo.value)
    }).catch(() => {
        alert('유저 정보 로드 실패! 메인으로 돌아갑니다.');
        router.push({ name: 'main' });
    })

    // 유저가 작성한 게시물 로드
    await axios.get(`http://localhost:8080/api/articles/by?userId=${userIdByParams}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, }
    }).then(({ data }) => {
        userArticles.value = data.response.articles;
    })
})
const userArticlesLen = computed(() => {
    return userArticles.value.length;
})
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
    background-color: antiquewhite;
    border-radius: 100px
}

.info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    height: 100%;
}

.info-box-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-box-social {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
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
    border-radius: 15px;
    color: white;
    transition: 0.2s all;
}

.edit-profile-btn:hover {
    background-color: #0068FF;
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
    font-weight: 600;
    color: #0068FF;
}
</style>
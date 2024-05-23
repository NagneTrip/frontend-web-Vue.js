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
                        <img :src="`/assets/tier/${userInfo.tier}.svg`" :width="25" :height="25" alt=""
                            class="tier-img" onerror="this.src='/assets/logo/sad_logo.png'" />
                    </div>
                    <button v-if="isNowLoginUser" class="edit-profile-btn jua-regular" @click="moveEdit">프로필 변경</button>
                    <template v-if="!isNowLoginUser">
                        <button v-if="!isFollow" class="edit-profile-btn jua-regular" @click="follow">팔로우</button>
                        <button v-if="isFollow" class="unfollow jua-regular" @click="unfollow">팔로잉</button>
                    </template>
                </div>
                <div class="info-box-social">
                    <p class="jua-regular">게시물 {{ userArticlesLen }}</p>
                    <p class="jua-regular">여행 계획 {{ userInfo.followings }}
                    </p>
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
        <UserFollowing v-if="isFollowingOpen" :userInfo="userInfo" @follow-changed="followChanged"
            @close-follow-modal="closeFollowModal" />
        <UserFollowers v-if="isFollowersOpen" :userInfo="userInfo" @follow-changed="followChanged"
            @close-follow-modal="closeFollowModal" />
    </div>
</template>

<script setup>
import UserArticle from '@/components/User/UserArticle.vue';
import UserPlan from '@/components/User/UserPlan.vue';
import UserFollowing from '@/components/User/UserFollowing.vue';
import UserFollowers from '@/components/User/UserFollowers.vue';
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const userInfo = ref({});
const userArticles = ref([]);
const userIdByParams = ref(route.params.id);

const tabState = ref('article');
const isFollowingOpen = ref(false);
const isFollowersOpen = ref(false);
const isNowLoginUser = ref(false);
const isFollow = ref(false);

const changeTab = (tab) => {
    tabState.value = tab;
}

const moveEdit = () => {
    router.push({ name: 'edit' })
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

const followChanged = async () => {
    await fetchUserInfo();
}

onMounted(async () => {
    // 로그인 여부 검증
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        alert('유저 정보는 로그인 후 확인할 수 있습니다.');
        router.push({ name: 'login' });
        return;
    }

    // 로그인한 유저와 info의 유저가 동일한지 확인
    if (Number(userIdByParams.value) === Number(sessionStorage.getItem('loginUserId'))) {
        isNowLoginUser.value = true;
    }

    // 유저 정보 로드
    await fetchUserInfo();
    // 유저가 작성한 게시물 로드
    await fetchUserArticles();
    // 로그인한 유저(자신)가 아니면 팔로우 여부 조회
    await fetchIsFollow();
})

watch(() => route.params.id, async (newId) => {
    userIdByParams.value = newId;
    isFollowingOpen.value = false;
    isFollowersOpen.value = false;
    isNowLoginUser.value = (Number(newId) === Number(sessionStorage.getItem('loginUserId')));
    await fetchUserInfo();
    await fetchUserArticles();
})

watch(isFollow, async () => {
    await fetchUserInfo();
})

// 유저 정보 로드
const fetchUserInfo = async () => {
    await axios.get(import.meta.env.VITE_EC2_ADDR+`/api/users/${userIdByParams.value}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }).then(({ data }) => {
        userInfo.value = data.response.userInfo;
    }).catch(() => {
        alert('유저 정보 로드 실패! 메인으로 돌아갑니다.');
        router.push({ name: 'main' });
    })
}

// 유저가 작성한 게시물 로드
const fetchUserArticles = async () => {
    await axios.get(import.meta.env.VITE_EC2_ADDR+`/api/articles/by?userId=${userIdByParams.value}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    }).then(({ data }) => {
        userArticles.value = data.response.articles;
    })
}

// 로그인한 유저(자신)가 아니면 팔로우 여부 조회
const fetchIsFollow = async () => {
    await axios.get(import.meta.env.VITE_EC2_ADDR+`/api/follow/${userIdByParams.value}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    }).then(({ data }) => {
        isFollow.value = data.response.checkFollow;
    })
};

const userArticlesLen = computed(() => {
    return userArticles.value.length;
})

const follow = async () => {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        alert('에러 발생! 로그인을 다시 진행하세요!')
        return;
    }

    await axios.post(import.meta.env.VITE_EC2_ADDR+`/api/follow`, { "followId": userIdByParams.value }, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }).then(({ data }) => {
        isFollow.value = true;
    })
}

const unfollow = async () => {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        alert('에러 발생! 로그인을 다시 진행하세요!')
        return;
    }

    await axios.delete(import.meta.env.VITE_EC2_ADDR+`/api/follow/${userIdByParams.value}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }).then(() => {
        isFollow.value = false;
    })
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
    background-color: antiquewhite;
    border-radius: 100px;
    overflow: hidden;
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
    font-weight: 600;
    color: #0068FF;
}
</style>
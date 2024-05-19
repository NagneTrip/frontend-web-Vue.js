<template>
    <div class="list">
        <div class="list-left">
            <div class="img-section">
            <img src="@/assets/logo/logo_img.png" alt="" :width="60" :height="60">
        </div>
        <div class="user-nickname">
            <p class="jua-regular nickname">{{ followItem.nickname }}</p>
            <img :src="`/src/assets/tier/${followItem.tier}.svg`" :width="18" :height="18" alt="" class="tier-img" />
        </div>
        
        </div>
        <button v-if="!isFollow" class="follow-btn jua-regular" @click="follow">팔로우</button>
        <button v-if="isFollow" class="unfollow jua-regular" @click="unfollow">팔로잉</button>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from "axios";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();

const props = defineProps({
    followItem : Object,
})
const emit = defineEmits([
    'followChanged'
])

const isFollow = ref(false);

onMounted(async ()=> {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        return;
    }

    await axios.get(`http://localhost:8080/api/follow/${props.followItem.id}`, {
        headers : {Authorization: `Bearer ${sessionStorage.getItem('token')}`, }
    }).then(({data})=>{
        isFollow.value = data.response.checkFollow;
    })
})

const follow = ()=> {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        alert('에러 발생! 로그인을 다시 진행하세요!')
        return;
    }

    axios.post(`http://localhost:8080/api/follow`, {'followId':props.followItem.id},{
        headers : {Authorization: `Bearer ${sessionStorage.getItem('token')}`, }
    }).then(({data})=>{
        isFollow.value = true;
    })
    emit('followChanged'); // 팔로우 변경 내역 보내기
}
const unfollow = async ()=> {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        alert('에러 발생! 로그인을 다시 진행하세요!')
        return;
    }

    axios.delete(`http://localhost:8080/api/follow/${props.followItem.id}`, {
        headers : {Authorization: `Bearer ${sessionStorage.getItem('token')}`, }
    }).then(()=>{
        isFollow.value = false;
    })
    emit('followChanged');  // 팔로우 변경 내역 보내기
}
</script>

<style scoped>
p {
    margin: 0;
}
.list {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}
.list-left {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
}

.user-nickname {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.nickname {
    font-size: 20px;
    margin-right: 6px;
}

.follow-btn {
    width: 65px;
    height: 25px;
    border: none;
    background-color: rgb(118, 189, 255);
    border-radius: 8px;
    color: white;
    transition: 0.2s all;
}

.unfollow {
    width: 65px;
    height: 25px;
    border: none;
    background-color: rgb(167, 167, 167);
    border-radius: 8px;
    color: white;
    transition: 0.2s all;
}

.unfollow:hover {
    background-color: #f36f57;
    scale: 1.1;
    transition: 0.2s all;
}

.follow-btn:hover {
    background-color: #0068FF;
    scale: 1.1;
    transition: 0.2s all;
}
</style>
<template>
    <div class="modal-backdrop" @click.self="closeFollowModal">
      <div class="modal-content">
        <h1 class="jua-regular">{{userInfo.nickname}} 님의 팔로우</h1>
        <ul>
          <FollowListItem v-for="following in followings" :followItem="following" :follow-changed="followChanged" :key="following.id">{{ following.nickname }}</FollowListItem>
        </ul>
        <button class="close-btn jua-regular" @click="closeFollowModal">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import FollowListItem from './FollowListItem.vue';
const authStore = useAuthStore()

  const followings = ref([]);
  
  const props = defineProps({
    userInfo : Object,
  })
  
  const emit = defineEmits([
    'closeFollowModal', 'followChanged'
])

const followChanged = ()=>{
    emit('followChanged');
}
  const closeFollowModal = () => {
    emit('closeFollowModal');
  };

  onMounted(async () => {
    if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
        alert('로그인을 다시 진행하세요!');
    }

    await axios.get(`http://localhost:8080/api/users/${props.userInfo.id}/followings`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, }
    }).then(({ data }) => {
        followings.value = data.response.userInfo;
    })
})
  </script>
  
  <style scoped>
    li {
        list-style: none;
    }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    width: 400px;
    height: 500px;
    background: white;
    padding: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .close-btn {
    border: none;
    background-color: rgb(118, 189, 255);
    width: 95%;
    height: 35px;
    border-radius: 10px;
    color: white;
    transition: 0.2s all;
  }

  .close-btn:hover {
    background-color: #0068FF;
    scale: 1.05;
    transition: 0.2s all;
  }

  ul {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
}
  </style>
  
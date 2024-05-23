<template>
  <div class="modal-backdrop" @click.self="closeFollowModal">
    <div class="modal-content">
      <h1 class="jua-regular">{{ userInfo.nickname }} 님의 팔로우</h1>
      <ul ref="followingList" @scroll="handleScroll" class="following-list">
        <FollowListItem v-for="following in followings" :followItem="following" @follow-changed="followChanged"
          :key="following.id">{{ following.nickname }}</FollowListItem>
      </ul>
      <img v-if="isLoading" src="/assets/blue_spinner.svg" alt="Loading" class="spinner" />
      <button v-if="!isLoading" class="close-btn jua-regular" @click="closeFollowModal">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import apiClient from '@/apiClient.js';

import FollowListItem from './FollowListItem.vue';

const authStore = useAuthStore();

const followings = ref([]);
const lastIndex = ref(1000000000);
const isLoading = ref(false);
const noMoreData = ref(false);

const props = defineProps({
  userInfo: Object,
});

const emit = defineEmits([
  'closeFollowModal', 'followChanged'
]);

const followChanged = () => {
  emit('followChanged');
};

const closeFollowModal = () => {
  emit('closeFollowModal');
};

const fetchUserFollowings = async () => {
  if (!sessionStorage.getItem('token') || !authStore.isAuthenticated) {
    alert('로그인을 다시 진행하세요!');
    return;
  }

  isLoading.value = true;
  if (!noMoreData.value) {
    try {
      const { data } = await
      apiClient.get(`/api/users/${props.userInfo.id}/followings?lastIndex=${lastIndex.value}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      if (data.response.userInfo.length < 10) {
        noMoreData.value = true;
      }
      followings.value.push(...data.response.userInfo);
      lastIndex.value = followings.value[followings.value.length - 1].id
    } catch (error) {
      console.error('Error fetching followings: ', error);
    } finally { isLoading.value = false; }
  }
};

const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollTop + clientHeight >= scrollHeight * 4 / 5 && !isLoading.value && !noMoreData.value) {
    fetchUserFollowings();
  }
};

onMounted(() => {
  fetchUserFollowings();
});
</script>

<style scoped>
.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}

.following-list {
  max-height: 60vh;
  overflow-y: auto;
}
</style>


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
  width: 500px;
  height: 600px;
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
  overflow-Y: scroll;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scrollbar-width: none;
  gap: 10px;
}

.spinner {
  width: 30px;
  height: 30px;
  transition: 0.2s all;
}
</style>
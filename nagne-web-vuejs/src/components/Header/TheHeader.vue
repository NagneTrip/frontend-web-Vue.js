<template>
  <div class="header">
    <div class="navbar">
      <div class="white-space"></div>
      <div class="navbar-logo" @click="() => move('main')">
        <div class="left-logo1"></div>
        <div class="left-logo2"></div>
      </div>
      <div class="navbar-icons">
        <div
          class="navbar-icons-wrapper"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          ref="openSearchBtn"
        >
          <font-awesome-icon class="icon" id="navbar-search-btn" :icon="faMagnifyingGlass" />
        </div>
        <div
          class="navbar-icons-wrapper"
          id="bell-wrapper"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span
            :style="{ display: isNewNotice ? 'block' : 'none' }"
            class="badge position-absolute top-2 end-40 translate-middle p-2 bg-danger border-0 rounded-circle"
          >
            <span class="visually-hidden">New alerts</span>
          </span>
          <font-awesome-icon class="icon" :icon="faBell" id="navbar-bell" />
        </div>
        <div class="navbar-icons-wrapper" @click="move('mapMain')">
          <font-awesome-icon class="icon" :icon="faMap" id="navbar-map" />
        </div>
        <div class="navbar-icons-wrapper" @click="toggleUserMenu">
          <font-awesome-icon
            v-if="!userInfo?.profileImage"
            class="icon"
            :icon="faUser"
            id="navbar-user"
          />
          <img
            v-if="userInfo"
            :src="userInfo.profileImage"
            onerror="this.src='/assets/logo/sad_logo.png'"
            id="navbar-profile"
          />
        </div>
        <div class="navbar-icons-wrapper" id="navbar-write-icon-wrapper" @click="move('write')">
          <font-awesome-icon :icon="faPen" class="icon" id="navbar-write-icon" />
        </div>
        <div class="navbar-icons-wrapper navbar-write-button-wrapper" @click="move('write')">
          <div class="navbar-write-button jua-regular-large">작성하기</div>
        </div>
      </div>

      <!-- phoneSize  -->
      <div class="phone-size-navmenu">
        <div class="navbar-icons-wrapper burger-menu-icon-wrapper" id="navbar-search-btn-wrapper">
          <font-awesome-icon
            class="icon burger-menu-icon"
            id="navbar-search-btn"
            :icon="faMagnifyingGlass"
          />
        </div>
        <div class="navbar-icons-wrapper burger-menu-icon-wrapper" @click="toggleSidebar">
          <font-awesome-icon :icon="faBars" class="burger-menu-icon" />
        </div>
      </div>
    </div>
    <!-- phoneSize - SideBar  -->
    <!-- <HeaderSidebar :showSidebar="showSidebar" @updateShowSidebar="toggleSidebar" :class="{ 'off-display': !showSidebar }"/> -->

    <!-- UserMenu -->
    <ul v-show="showUserMenu" class="user-menu list-group" :style="userMenuStyle">
      <li v-show="!store.isAuthenticated" class="list-group-item" @click="() => move('login')">
        로그인
      </li>
      <li v-show="store.isAuthenticated" class="list-group-item" @click="() => move('user')">
        내 프로필
      </li>
      <li v-show="store.isAuthenticated" class="list-group-item" @click="() => move('bookmark')">
        저장한 게시물
      </li>
      <li v-show="store.isAuthenticated" class="list-group-item" @click="() => move('edit')">
        내정보 수정
      </li>
      <li
        v-show="store.isAuthenticated"
        class="list-group-item"
        style="border-top: 1px solid black"
      >
        고객센터
      </li>
      <li v-show="store.isAuthenticated" class="list-group-item" @click="() => move('logout')">
        로그아웃
      </li>
    </ul>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 jua-regular-large noti-user-name"
            id="modalLabel"
            @click="() => move('user')"
          >
            {{ userInfo.nickname }}
          </h1>
          <p v-if="isAuthenticated" class="jua-regular" data-bs-dismiss="modal">
            님을 기다리는 소식
          </p>
          <p v-if="!isAuthenticated" class="jua-regular" data-bs-dismiss="modal">
            로그인 후 확인하세요!
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeNotice"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="notice-box">
            <NoticeItem
              v-for="(notice, index) in userNotices"
              :notice="notice"
              @close-notice="closeNotice"
              @reload-comments="reloadComments"
              :key="notice.id"
            />
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="jua-regular-large btn noti-allread" @click="readAllNotice">
            모두 확인하기
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="horizon-border"></div>
  <!-- serach bar -->
  <div class="collapse" id="collapseExample">
    <div class="card card-body">
      <div class="search-box">
        <font-awesome-icon class="serach-icon icon" id="navbar-search-btn" :icon="faMagnifyingGlass" />
        <input class="search-input jua-regular-large " placeholder="검색어를 입력하세요." @keyup.enter="move('search')" v-model="searchContent" type="text" />
        <button class="jua-regular search-btn" @click="move('search')">검색</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  faMap,
  faUser,
  faMagnifyingGlass,
  faBell,
  faPen,
  faBars,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
import { storeToRefs } from "pinia";
import axios from "axios";
import apiClient from '@/apiClient.js';

import NoticeItem from "./NoticeItem.vue";
const { isAuthenticated } = storeToRefs(authStore);

const store = useAuthStore();
const router = useRouter();
const userInfo = ref({});
const userNotices = ref([]);
const isNewNotice = ref(false);
const searchContent = ref("");
const openSearchBtn = ref(null);

onMounted(async () => {
  store.loadAuthState();

  // 유저 로그인 여부 검증
  if (!store.isAuthenticated || !sessionStorage.getItem("token")) {
    return;
  }
  // 유저 정보 조회
  await fetchUserInfo();

  // 새로운 알림 여부 조회
  await fecthIsNotice();

  // 유저 알림 조회
  await fetchUserNotice();
});
// 로그인 정보가 변경되면, 다시 호출
watch(isAuthenticated, async () => {
  if (!store.isAuthenticated || !sessionStorage.getItem("token")) {
    return;
  }

  // 유저 정보 조회
  await fetchUserInfo();

  // 새로운 알림 여부 조회
  await fecthIsNotice();

  // 유저 알림 조회
  await fetchUserNotice();
});

const reloadComments = async () => {
  await fecthIsNotice();
  await fetchUserNotice();
};

// 새로운 알림 여부 조회
const fecthIsNotice = async () => {
  await apiClient
    .get(`/api/notifications/has-new`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then(({ data }) => {
      isNewNotice.value = data.response;
    });
};

// 유저 알림 조회
const fetchUserNotice = async () => {
  await apiClient
    .get(`/api/notifications`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then(({ data }) => {
      userNotices.value = data.response;
    });
};

// 유저 정보 조회
const fetchUserInfo = async () => {
  await apiClient
    .get(`/api/users/${sessionStorage.getItem("loginUserId")}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then(({ data }) => {
      userInfo.value = data.response.userInfo;
      sessionStorage.setItem("profileImage", userInfo.profileImage);
    });
};

// 알림 전체 읽기 기능 추가 필요
const readAllNotice = async () => {
  await apiClient
    .patch(`/api/notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then(() => {
      fecthIsNotice();
      fetchUserNotice();
    });
};

const move = (path) => {
  let moveTo = { name: path };
  switch (path) {
    case "login": // 로그인
      if (sessionStorage.getItem("token")) {
        alert("이미 로그인 중입니다!");
        return;
      }
      break;
    case "logout": // 로그아웃. 토큰과 인증 정보를 초기화
      store.getLogout(); // 액션 호출
      moveTo = { name: "logout" };
      break;
    case "mapMain":
      break;
    case "user":
      moveTo = { name: path, params: { id: Number(sessionStorage.getItem("loginUserId")) } };
      break;
    case "bookmark":
      moveTo = { name: path };
      break;
    case "edit":
      moveTo = { name: path };
      break;
    case "search":
      moveTo = { name: path, query : {q : searchContent.value}};
      openSearchBtn.value.click();
      break;
  }
  // 페이지 이동 시 열려있는 메뉴 전부 닫기
  showUserMenu.value = false;
  showSidebar.value = false;
  router.push(moveTo);
};

const showSidebar = ref(false);
function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

const showUserMenu = ref(false);
const userMenuStyle = ref({});
function toggleUserMenu(event) {
  showUserMenu.value = !showUserMenu.value;

  // userMenu 클릭한 마우스 포인터의 위치에서 menu-list 열기
  if (showUserMenu.value) {
    userMenuStyle.value = {
      top: `${event.clientY + 20}px`,
      left: `${event.clientX}px`,
    };
  }
}

const closeNotice = () => {
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.hide();
};
</script>

<style>
p {
  margin: 0;
}

a {
  text-decoration: none;
  color: black;
}

/* header */
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.horizon-border {
  height: 2px;
  width: 100%;
  border-bottom: 3px solid #aacdff;
}

.navbar {
  min-width: 280px;
  max-width: 1280px;
  transition: 0.5s;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px 0px 5px;
}

.navbar-logo {
  display: flex;
  height: 80px;
  margin: 10px 0px 10px 0px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.left-logo1 {
  width: 70px;
  height: 50px;
  background-image: url("/assets/logo/logo_img.png");
  background-size: cover;
}

.left-logo2 {
  width: 140px;
  height: 50px;
  background-image: url("/assets/logo/logo_text.png");
  background-size: cover;
  margin: 5px;
}

.navbar-icons {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
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
  overflow: hidden;
}

.user-menu {
  position: absolute;
  /* 중앙 정렬을 위한 왼쪽 여백 설정 */
  transform: translateX(-50%);
  /* X축 기준 중앙 정렬 */
  width: auto;
  z-index: 100;
}

.list-group-item {
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
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

.navbar-icons-wrapper:active {
  scale: 1.1;
  transition: all 100ms;
  cursor: pointer;
  background-color: #2a79ff;
}

#navbar-user {
  display: flex;
  justify-content: center;
  align-items: center;
}

#navbar-profile {
  width: 50px;
  width: 50px;
  object-fit: fill;
}

.navbar-icons .icon {
  color: #707070;
  width: 28px;
  height: 28px;
  margin: 15px;
}

.navbar-write-button-wrapper {
  width: 100px;
  height: 45px;
  border: 2.5px solid rgb(118, 189, 255);
  border-radius: 50px;
  font-size: large;
}

.navbar-write-button-wrapper:hover {
  color: white;
}

.navbar-write-button-wrapper:active {
  background-color: #2a79ff;
  color: white;
}

#navbar-write-icon-wrapper {
  display: none;
}

.burger-menu-icon {
  width: 28px;
  height: 28px;
  color: #707070;
  margin: 15px;
}

.phone-size-navmenu {
  display: none;
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

.white-space {
  width: 50px;
  height: 50px;
  background-color: none;
  display: none;
}

.off-display {
  display: none;
}

@media screen and (max-width: 1300px) {
  /* header */

  .header {
    width: 100%;
  }

  .navbar {
    max-width: 880px;
    width: 80%;
  }

  .navbar-menu {
    display: none;
  }
}

@media screen and (max-width: 840px) {
  .navbar {
    width: 100%;
    transition: 0.5s;
  }

  .navbar-write-button-wrapper {
    display: none;
  }

  #navbar-write-icon-wrapper {
    display: flex;
  }
}

@media screen and (max-width: 640px) {
  .navbar {
    width: 100%;
    transition: 0.5s;
  }

  .navbar-icons {
    display: none;
    transition: all 0.5s;
  }

  .navbar {
    justify-content: space-between;
    margin: 0px 30px 0px 30px;
    transition: all 0.5s;
  }

  .phone-size-navmenu {
    display: flex;
    margin: 0px 5px 0px 5px;
    gap: 6px;
  }

  .white-space {
    display: flex;
    width: 95px;
  }

  .phone-size-sidebar {
    width: 100%;
    height: 400px;
    background-color: red;
  }

  @media screen and (max-width: 456px) {
    .white-space {
      width: 45px;
    }

    #navbar-search-btn-wrapper {
      display: none;
    }
  }

  @media screen and (max-width: 360px) {
    .left-logo1 {
      display: none;
    }
  }
}

.modal-content {
  border-radius: 15px;
  box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);
  border: none;
}

.modal-header {
  gap: 10px;
}

.noti-allread {
  background-color: rgb(118, 189, 255);
  color: white;
  transition: 0.2s all;
}

.noti-allread:hover {
  background-color: #2a79ff;
  color: white;
  scale: 1.05;
  transition: 0.2s all;
}

.noti-close {
  background-color: rgb(175, 172, 172);
  color: white;
}

.noti-user-name {
  cursor: pointer;
}

.noti-close:hover {
  background-color: #818181;
  color: white;
  scale: 1.05;
  transition: 0.2s all;
}

.notice-box {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0 20px 0 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.badge {
  right: 0px;
}

.card-body {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.serach-icon {
  height: 40px;
  width: 40px;
  color : rgb(162, 162, 162);
}

.search-box {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.search-input {
  height: 100%;
  width: 100%;
  border: none;
  border-bottom: #aacdff 3px solid;
  font-size: 24px;
  letter-spacing: 3px;
}
.search-input:focus {
  outline: none;
  border: none;
  border-bottom: 3px #2a79ff solid;
  .serach-icon {
    color : #2a79ff;
  }
}

.search-btn {
  width: 80px;
  height: 40px;
  border-radius: 12px;
  background-color: #aacdff;
  border: none;
  letter-spacing: 3px;
  transition: 0.2s all;
}
.search-btn:active{
  background-color: #2a79ff;
  scale: 1.05;
  transition: 0.2s all;
}
.search-btn:hover {
  box-shadow: 2px 3px 3px 0px;
  scale: 1.05;
  transition: 2ms all;
}
</style>

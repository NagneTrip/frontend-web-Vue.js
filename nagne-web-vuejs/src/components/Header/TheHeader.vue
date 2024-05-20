<template>
  <div class="header">
    <div class="navbar">
      <div class="white-space"></div>
      <div class="navbar-logo" @click="() => move('main')">
        <div class="left-logo1"></div>
        <div class="left-logo2"></div>
      </div>
      <div class="navbar-icons">
        <div class="navbar-icons-wrapper">
          <font-awesome-icon class="icon" id="navbar-search-btn" :icon="faMagnifyingGlass" />
        </div>
        <div class="navbar-icons-wrapper" id="bell-wrapper" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <font-awesome-icon class="icon" :icon="faBell" id="navbar-bell" />
        </div>
        <div class="navbar-icons-wrapper" @click="move('mapMain')">
          <font-awesome-icon class="icon" :icon="faMap" id="navbar-map" />
        </div>
        <div class="navbar-icons-wrapper" @click="toggleUserMenu">
          <font-awesome-icon class="icon" :icon="faUser" id="navbar-user" />
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
          <font-awesome-icon class="icon burger-menu-icon" id="navbar-search-btn" :icon="faMagnifyingGlass" />
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
      <li v-show="!store.isAuthenticated" class="list-group-item" @click="() => move('login')">로그인</li>
      <li v-show="store.isAuthenticated" class="list-group-item" @click="() => move('user')">내 프로필</li>
      <li v-show="store.isAuthenticated" class="list-group-item">저장한 게시물</li>
      <li v-show="store.isAuthenticated" class="list-group-item">내정보 수정</li>
      <li v-show="store.isAuthenticated" class="list-group-item" style="border-top: 1px solid black;">고객센터</li>
      <li v-show="store.isAuthenticated" class="list-group-item" @click="() => move('logout')">로그아웃</li>
    </ul>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 jua-regular-large noti-user-name" id="modalLabel" data-bs-dismiss="modal"
            @click="() => move('user')">{{
              userInfo.nickname }}</h1>
          <p class="jua-regular" data-bs-dismiss="modal"> 님을 기다리는 소식</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="jua-regular-large btn noti-allread">모두 확인하기</button>
          <button type="button" class="jua-regular-large btn noti-close" data-bs-dismiss="modal">닫기</button>
        </div>
      </div>
    </div>
  </div>


  <div class="horizon-border"></div>
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
import { storeToRefs } from 'pinia';
import axios from "axios";
const { isAuthenticated } = storeToRefs(authStore);

const store = useAuthStore();
const router = useRouter();
const isLogin = ref(false);
const userInfo = ref({})

onMounted(async () => {
  store.loadAuthState();

  //유저 정보 조회
  if (!store.isAuthenticated || !sessionStorage.getItem('token')) {
    return;
  }
  await fetchUserInfo();
})

const fetchUserInfo = async () => {
  await axios.get(`http://localhost:8080/api/users/${sessionStorage.getItem('loginUserId')}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  }).then(({ data }) => {
    userInfo.value = data.response.userInfo;
  })
}

watch(isAuthenticated, () => {
  if (!sessionStorage.getItem('token')) {
    isLogin.value = false;
  } else {
    isLogin.value = true;
  }
})

const move = (path) => {
  let moveTo = { name: path };
  switch (path) {
    case 'login': // 로그인
      if (sessionStorage.getItem('token')) {
        alert('이미 로그인 중입니다!');
        return;
      }
      break;
    case 'logout': // 로그아웃. 토큰과 인증 정보를 초기화
      store.getLogout(); // 액션 호출
      moveTo = { name: 'logout' }
      break;
    case 'mapMain':
      break;
    case 'user':
      moveTo = { name: path, params: { 'id': Number(sessionStorage.getItem('loginUserId')) } }
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
      left: `${event.clientX}px`
    };
  }
}


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
  background-image: url("@/assets/logo/logo_img.png");
  background-size: cover;
}

.left-logo2 {
  width: 140px;
  height: 50px;
  background-image: url("@/assets/logo/logo_text.png");
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
</style>

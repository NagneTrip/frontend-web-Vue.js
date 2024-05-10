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
        <div class="navbar-icons-wrapper" id="bell-wrapper">
          <font-awesome-icon class="icon" :icon="faBell" id="navbar-bell" />
        </div>
        <div class="navbar-icons-wrapper">
          <font-awesome-icon class="icon" :icon="faMap" id="navbar-map" />
        </div>
        <div class="navbar-icons-wrapper" @click="toggleUserMenu">
          <font-awesome-icon class="icon" :icon="faUser" id="navbar-user" />
        </div>
        <div class="navbar-icons-wrapper" id="navbar-write-icon-wrapper">
          <font-awesome-icon :icon="faPen" class="icon" id="navbar-write-icon" />
        </div>
        <div class="navbar-icons-wrapper navbar-write-button-wrapper">
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
    <ul v-show="showUserMenu" class="user-menu list-group" ref="userMenu">
      <li v-show="isLogin" class="list-group-item" @click="() => move('login')">로그인</li>
      <li v-show="!isLogin" class="list-group-item">A second item</li>
      <li v-show="!isLogin" class="list-group-item">A third item</li>
      <li v-show="!isLogin" class="list-group-item">A fourth item</li>
      <li v-show="!isLogin" class="list-group-item">And a fifth one</li>
    </ul>
  </div>

  <div class="navbar-icons-wrapper" id="faArrowUp-button">
    <font-awesome-icon :icon="faArrowUp" class="icon" id="faArrowUp" />
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
// import HeaderSidebar from "./HeaderSidebar.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRouter();

const isLogin = ref(true);

const move = (path) => {
  const moveTo = { name: path };
  if (path === "login") {
    showUserMenu.value = !showUserMenu.value;
  }
  //페이지 이동 시 열려있는 메뉴 전부 닫기
  showUserMenu.value = false;
  showSidebar.value = false;
  router.push(moveTo);
};

const showSidebar = ref(false);
function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

const showUserMenu = ref(false);
function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
}
</script>

<style>
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
  background-image: url("@/assets/logo_img.png");
  background-size: cover;
}

.left-logo2 {
  width: 140px;
  height: 50px;
  background-image: url("@/assets/logo_text.png");
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
  top: 8%;
  left: 75%;
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
  /* 고정 위치 */
  bottom: 20px;
  /* 하단에서 20px 위 */
  right: 30px;
  /* 우측에서 30px 왼쪽 */
  z-index: 99;
  /* 다른 내용물 위에 보이도록 z-index 설정 */
  border: none;
  /* 테두리 없음 */
  outline: none;
  /* 외곽선 없음 */
  cursor: pointer;
  /* 커서 모양을 손가락 모양으로 */
  padding: 5px;
  /* 내부 여백 */
  border-radius: 50px;
  /* 테두리 둥글게 */
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
}
</style>

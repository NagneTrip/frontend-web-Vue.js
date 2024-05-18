<template>
  <div class="login-page">
    <div class="login-top">
      <p>로그인을 위해</p>
      <p>정보를 입력해주세요.</p>
    </div>

    <form action="" @submit.prevent="() => getLoginHandler()">
      <div class="label-box">
        <label for="">E-mail</label>
      </div>
      <input type="text" v-model="userEmail">
      <div class="remember-box">
        <label for="remember_email" style="font-size: 12px;">E-mail 기억하기</label>
        <input type="checkbox" id="remember_email" v-model="remeberEmail">
      </div>
      <div class="label-box">
        <label for="">Password</label>
      </div>
      <input type="password" v-model="password">
      <button class="login-button">LOGIN</button>
      <RouterLink :to="{ name: '' }">비밀번호 찾기</RouterLink>
    </form>
    <div class="notice-social">
      <p>또는</p>
      <h4>소셜로그인</h4>
    </div>
    <div class="img-group">
      <img src="@/assets/social/web_neutral_sq_na.svg" alt="" @click="getSocialLogin('google')">
      <img src='@/assets/social/480px-KakaoTalk_logo.svg.png' alt="" @click="getSocialLogin('kakao')">
    </div>

    <div class="link-container">
      <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
      <RouterLink :to="{ name: 'main' }">고객센터</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
const store = useAuthStore();
const route = useRoute();
const router = useRouter();

const userEmail = ref('');
const password = ref('');
const remeberEmail = ref(false);

const sosicalEmail = ref("");
const socialNeedToJoin = ref(false);
const sosicialToken = ref('');


const googleLoginUrl = ref('http://localhost:8080/oauth2/authorization/google');
const kakaoLoginUrl = ref('http://localhost:8080/oauth2/authorization/kakao');
const getSocialLogin = (platform) => {
  let url;
  switch (platform) {
    case 'google':
      url = googleLoginUrl.value;
      break;
    case 'kakao':
      url = kakaoLoginUrl.value;
      break;
  }
  window.location.href = url;
}

const getLoginHandler = async () => {
  if (userEmail.value === "" || password.value === "") {
    alert("입력하신 정보를 다시 확인하세요.");
    userEmail.value = "";
    password.value = "";
    return;
  } else {
    if (remeberEmail.value) {//이메일 기억하기 체크
      setCookie("userEmail", userEmail.value, 7); // 7일 동안 쿠키 유지
    } else {
      setCookie("userEmail", "", -1); // 쿠키 삭제
    }
    store.userEmail = userEmail.value;
    store.password = password.value;
    userEmail.value = '';
    await store.getToken(); // store에 로그인 요청
  }
}

watch(() => store.isAuthenticated, () => {
  if (store.isAuthenticated) {
    alert('로그인 성공');
    router.go(-1); // 성공 시 홈 페이지로 리다이렉트
  } else {
    alert('로그인 실패! 입력 정보를 다시 확인하세요!');
    userEmail.value = '';
    password.value = '';
  }
})

onMounted(() => {
  let nowUrl = window.location.search;
  const urlParams = new URLSearchParams(nowUrl);
  sosicalEmail.value = urlParams.get('username');
  socialNeedToJoin.value = urlParams.get('needToJoin');
  if (!socialNeedToJoin.value) {
    sosicialToken.value = urlParams.get('token');
  }



  const savedEmail = getCookie("userEmail");
  if (savedEmail) {
    userEmail.value = savedEmail;
    remeberEmail.value = true;
  }
})

// 쿠키 설정
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 쿠키 로드
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
</script>


<style scoped>
.login-page {
  margin: 80px auto auto auto;
  border-radius: 20px;
  width: 480px;
  height: 700px;
  border: 3px solid rgb(118, 189, 255);
  box-shadow: 7px 7px 39px 0px #AACDFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.login-top {
  width: 70%;
  color: #0068FF;
  font-family: Noto Sans CJK KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 47.36px;
  text-align: left;
  margin-top: 40px;
  cursor: default
}

.login-top p {
  margin: 5px;
}

.login-button {
  border: 2px solid #0068FF;
  color: #0068FF;
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  width: 100%;
  height: 54px;
  top: 875px;
  left: 725px;
  gap: 0px;
  border-radius: 10px;
  transition: all 0.2s;
}

.login-button:hover {
  color: white;
  background-color: #0068FF;
  transition: all 0.2s;
}

.login-button:active {
  color: white;
  background-color: #1efda8;
  scale: 1.05;
  border: none;
  transition: all 0.1s;
}

.login-page form {
  width: 80%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.login-page label {
  font-family: Noto Sans CJK KR;
  font-weight: 600;
  font-size: 18px;
  justify-content: flex-start;
  color: rgb(118, 189, 255);
}

.login-page input {
  width: 100%;
  height: 24px;
  margin: 5px;
  border: none;
  border-bottom: 1.5px solid rgb(118, 189, 255);
  font-size: 18px;
  letter-spacing: 1px;
  font-family: Noto Sans CJK KR;
  transition: all 0.05s;
}

.login-page input:focus {
  outline: none;
  border-bottom: 3px solid #0068FF;
  transition: all 0.05s;
}

.notice-social {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.notice-social p {
  margin: 0px
}

.notice-social h4 {
  margin: 20px 0 0 0;
  font-family: Noto Sans CJK KR;
  font-weight: 600;
  font-size: 20px;
}

.img-group {
  display: flex;
  gap: 12px;
}

.img-group img {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.img-group img:hover {
  scale: 1.02;
  transition: all 0.1s;
}

.link-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;

  font-family: Noto Sans CJK KR;
}

.link-container a:hover {
  color: #0068FF
}

.label-box {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

input[type="checkbox"] {
  width: 15px;
  margin: 0;
}

.remember-box {
  display: flex;
  align-items: center;
  gap: 10px;

}

.remember-box label {
  color: #3384fd;
  font-size: 10px
}

@media screen and (max-width: 480px) {
  .login-page {
    width: 70%;
    min-width: 320px;
  }
}
</style>
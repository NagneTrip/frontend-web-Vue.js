<template>
  <div class="login-page">
    <div class="login-top">
      <p>회원가입을 위해</p>
      <p>정보를 입력해주세요.</p>
    </div>
    <div class="info-form">
      <div class="input-box">
        <div class="label-wrapper">
          <label for="email">E-mail</label>
        </div>
        <input type="text" v-if="!socialEmail" id="email" v-model="email" required>
        <input type="text" v-else id="email" v-model="socialEmail" required disabled>
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="password">Password</label>
        </div>
        <input v-if="!socialEmail" type="password" id="password" v-model="password" required>
        <input v-else type="password" id="password" v-model="password" required :disabled="socialEmail"
          placeholder="소셜 로그인입니다.">
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="passwordConfirm">PW Confirm</label>
        </div>
        <input type="password" v-if="!socialEmail" id="passwordConfirm" v-model="passwordConfirm" required>
        <input type="password" v-else id="passwordConfirm" v-model="passwordConfirm" required :disabled="socialEmail"
          placeholder="소셜 로그인입니다.">
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="nickname">NickName</label>
        </div>
        <input type="text" id="nickname" v-model="nickname" required>
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="birth">Birth</label>
        </div>
        <input type="date" id="birth" v-model="birth" required>
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="phone">Phone</label>
        </div>
        <div class="input-phone">
          <select name="phone1" v-model="phone1" required>
            <option value="010" selected>010</option>
            <option value="011">011</option>
            <option value="02">02</option>
            <option value="031">031</option>
            <option value="032">032</option>
            <option value="033">033</option>
            <option value="041">041</option>
            <option value="042">042</option>
            <option value="043">043</option>
            <option value="044">044</option>
            <option value="051">051</option>
            <option value="052">052</option>
            <option value="053">053</option>
            <option value="054">054</option>
            <option value="055">055</option>
            <option value="061">061</option>
            <option value="062">062</option>
            <option value="063">063</option>
            <option value="064">064</option>
          </select>
          <p>-</p>
          <input type="text" v-model="phone2" required>
          <p>-</p>
          <input type="text" v-model="phone3" required>
        </div>
      </div>
      <div id="gender-box" class="input-box">
        <div class="label-wrapper">
          <label>Gender</label>
        </div>
        <div class="radio-wrapper">
          <label :class="{ selected: gender === 'male' }" for="male">Male</label>
          <input type="radio" id="male" name="gender" v-model="gender" value="male">
        </div>
        <div class="radio-wrapper">
          <label :class="{ selected: gender === 'female' }" for="female">Female</label>
          <input type="radio" id="female" name="gender" v-model="gender" value="female">
        </div>
      </div>
      <button class="login-button" @click="validateInfo">회원가입</button>
    </div>
    <div class="social-icons">
      <p>소셜아이디로 가입하기</p>
      <div class="social-icons-img">
        <img src="@/assets/social/web_neutral_sq_na.svg" @click="() => getSocialLogin('google')" alt="">
        <img src="@/assets/social/480px-KakaoTalk_logo.svg.png" @click="() => getSocialLogin('kakao')" alt="">
      </div>
    </div>
    <div class=" link-container">
      <div>
        <p>이미 회원이신가요?</p>
        <RouterLink :to="{ name: 'login' }">로그인하기</RouterLink>
      </div>
      <RouterLink :to="{ name: 'main' }">고객센터</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { signup } from "@/auth/signup";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const nickname = ref("");
const birth = ref("");
const phone1 = ref("010");
const phone2 = ref("");
const phone3 = ref("");
const gender = ref("");

const validateEmail = (email, socialEmail) => {
  let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (socialEmail) {
    email = socialEmail;
  }
  if (!email_regex.test(email)) {
    return false;
  } else {
    return true;
  }
};
const validatePassword = (password) => {
  if (socialEmail) {
    return true;
  }
  return password.length >= 8;
};

const validateInfo = () => {
  const isEmailValid = validateEmail(email.value, socialEmail.value);
  const isPasswordValid = validatePassword(password.value);
  const isPasswordMatch = password.value === passwordConfirm.value;
  const isGenderSelected = gender.value !== "";

  if (!isEmailValid) {
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }
  if (!isPasswordValid) {
    alert("비밀번호는 8자리 이상이어야 합니다.");
    return;
  }
  if (!socialEmail && !isPasswordMatch) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  if (!isGenderSelected) {
    alert("성별을 선택해주세요.");
    return;
  }

  const user = {
    username: (socialEmail.value ? socialEmail.value : email.value),
    password: (socialEmail.value ? "" : password.value),
    nickname: nickname.value,
    phone: phone1.value + phone2.value + phone3.value + '',
    birth: birth.value,
    gender: (gender.value = 'male' ? 'MAN' : 'WOMAN'),
  }
  signup(user);
  router.push({ name: 'main' });
};

const googleLoginUrl = ref('http://localhost:8080/oauth2/authorization/google');
const kakaoLoginUrl = ref('http://localhost:8080/oauth2/authorization/kakao');
const showModal = ref(false);
const loginUrl = ref('');

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

const socialEmail = ref("");
const socialNeedToJoin = ref(false);
const socialToken = ref('');

onMounted(() => {
  let nowUrl = window.location.search;
  let urlParams = new URLSearchParams(nowUrl);
  socialEmail.value = urlParams.get('username');
  socialNeedToJoin.value = urlParams.get('needToJoin');
  console.log()
  if (socialNeedToJoin.value === 'false') { //신규 회원이 아니면

    const { token, userInfo } = JSON.parse(urlParams.get('data'))
    socialToken.value = token;
    authStore.token = token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('loginUserId', userInfo.id);
    sessionStorage.setItem('socialLogin', true);
    authStore.isAuthenticated = true;
    authStore.loginUserId = userInfo.id;
    authStore.userEmail = userInfo.username;
    router.push({ name: 'main' })
    return
  }
  //가입 필요

})
</script>

<style scoped>
.login-page {
  margin: 50px auto;
  border-radius: 20px;
  width: 480px;
  height: 880px;
  border: 3px solid rgb(118, 189, 255);
  box-shadow: 7px 7px 39px 0px #AACDFF;
  display: flex;
  flex-direction: column;
  gap: 35px;
  align-items: center;
}

.login-top {
  width: 70%;
  color: #0068FF;
  font-family: Noto Sans CJK KR;
  font-size: 22px;
  font-weight: 700;
  line-height: 47.36px;
  text-align: left;
  margin-top: 20px;
  cursor: default;
}

.login-top p {
  margin: 2px;
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

.info-form {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
}

.input-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.label-wrapper {
  display: flex;
  width: 50%;
  justify-content: flex-start;
}

.login-page label {
  font-family: Noto Sans CJK KR;
  font-weight: 600;
  font-size: 18px;
  justify-content: flex-start;
  color: rgb(118, 189, 255);
}

.login-page input {
  width: 70%;
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

.wrong-info {
  outline: none;
  border-bottom: 3px solid red;
}

.notice-social {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.notice-social p {
  margin: 0px;
}

.notice-social h4 {
  margin: 10px;
}

.img-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.img-group img {
  cursor: pointer;
  width: 300px;
  height: 56px;
}

.img-group img:hover {
  scale: 1.02;
  transition: all 0.1s;
}

.link-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: Noto Sans CJK KR;
}

.link-container div {
  display: flex;
  gap: 15px;
  color: #686868;
}

.link-container a {
  color: #000000;
  text-align: center;
}

.link-container a:hover {
  color: #0068FF;
}

.input-phone {
  display: flex;
  width: 60%;
}

.input-phone select {
  width: 60px;
  height: 30px;
  margin-right: 5px;
  border: rgb(118, 189, 255) 1px solid;
  border-radius: 5px;
  text-align: center;
}

.input-phone select:focus {
  border: rgb(118, 189, 255) 1px solid;
}

.input-phone input {
  width: 60px;
  text-align: center;
}

.social-icons {
  font-family: Noto Sans CJK KR;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icons img {
  width: 40px;
  height: 40px;
  margin: 0 10px 0 10px;
  cursor: pointer;
}

#gender-box {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.radio-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 7px;
}

.radio-wrapper {
  width: 100px;
}

.radio-wrapper label {
  font-size: 12px;
  margin: 0;
}

.radio-wrapper input {
  width: 17px;
  height: 17px;
  margin: 0;
}

.selected {
  color: red;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal iframe {
  width: 80%;
  height: 80%;
}

@media screen and (max-width: 480px) {
  .login-page {
    width: 70%;
    min-width: 320px;
  }
}
</style>

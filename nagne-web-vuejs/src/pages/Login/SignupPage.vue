<template>
  <div class="login-page">
    <div class="login-top">
      <p>회원가입을 위해</p>
      <p>정보를 입력해주세요.</p>
    </div>
    <form action="">
      <div class="input-box">
        <div class="label-wrapper">
          <label for="email">E-mail</label>
        </div>
        <input type="text" id="email" v-model="email" required>
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="password">Password</label>
        </div>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="input-box">
        <div class="label-wrapper">
          <label for="passwordConfirm">PW Confirm</label>
        </div>
        <input type="password" id="passwordConfirm" v-model="passwordConfirm" required>
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
      <button class="login-button">회원가입</button>
    </form>
    <div class="social-icons">
      <p>소셜아이디로 가입하기</p>
      <div class="social-icons-img">
        <img src="@/assets/social/web_neutral_sq_na.svg" alt="">
        <img src="@/assets/social/480px-KakaoTalk_logo.svg.png" alt="">
      </div>
    </div>
    <div class="link-container">
      <div>
        <p>이미 회원이신가요?</p>
        <RouterLink :to="{ name: 'login' }">로그인하기</RouterLink>
      </div>
      <RouterLink :to="{ name: 'main' }">고객센터</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const nickname = ref("");
const birth = ref("");
const phone1 = ref("010");
const phone2 = ref("");
const phone3 = ref("");
const gender = ref("");


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

.login-page form {
  width: 80%;
  max-width: 320px;
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
  width: 50%;
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

@media screen and (max-width: 480px) {
  .login-page {
    width: 70%;
    min-width: 320px;
  }
}
</style>

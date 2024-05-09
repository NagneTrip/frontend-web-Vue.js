<template>
  <div class="login-page">
    <div class="login-top">
      <p>회원가입을 위해</p>
      <p>정보를 입력해주세요.</p>
    </div>

    <form action="">
      <label for="">E-mail</label>
      <input type="text">
      <label for="">Password</label>
      <input type="password">
      <label for="">PW Confirm</label>
      <input type="password">
      <label for="">Name</label>
      <input type="text">
      <label for="">Phone</label>
      <div class="input-phone">
        <select name="" id="">
          <option value="010">010</option>
          <option value="02">02</option>
          <option value="062">062</option>
        </select>
        <p>-</p>
        <input type="text">
        <p>-</p>
        <input type="text">
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
</script>

<style scoped>
.login-page {
  margin: 50px auto 50px auto;
  border-radius: 20px;
  width: 480px;
  height: 900px;
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
  font-size: 22px;
  font-weight: 700;
  line-height: 47.36px;
  text-align: left;
  margin-top: 10px;
  cursor: default
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
  gap: 20px;
}

.login-page label {
  font-family: Noto Sans CJK KR;
  font-weight: 600;
  font-size: 18px;
  justify-content: flex-start;
  color:rgb(118, 189, 255);
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

.link-container div{
  display: flex;
  gap: 15px;
  color: #686868
}

.link-container a {
  color: #000000;
  text-align: center
}

.link-container a:hover {
  color: #0068FF
}

.input-phone {
  display: flex;
}

.input-phone select {
  width: 80px;
  height: 30px;
  margin-right: 5px;
  border: rgb(118, 189, 255) 1px solid;
  border-radius: 5px
}

.input-phone select:focus {
  border: rgb(118, 189, 255) 1px solid;
}

.input-phone input {
  width: 80px;
}

.social-icons {
  font-family: Noto Sans CJK KR;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.social-icons img{
  width: 40px;
  height: 40px;
  margin: 0 10px 0 10px;
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .login-page {
    width: 70%;
    min-width: 320px;
  }
}
</style>
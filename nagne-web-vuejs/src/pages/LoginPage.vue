<template>
  <div class="login-page">
    <div class="login-top">
      <p>로그인을 위해</p>
      <p>정보를 입력해주세요.</p>
    </div>

    <form action="">
      <label for="">E-mail</label>
      <input type="text">
      <label for="">Password</label>
      <input type="password">
      <button class="login-button">LOGIN</button>
    </form>
    <div class="notice-social">
      <p>또는</p>
      <h3>소셜로그인</h3>
    </div>
    <div class="img-group">
      <img src="@/assets/web_neutral_sq_ctn@3x.png" alt="">
      <img src='@/assets/kakao_login_large_wide (1).png' alt="">
    </div>
    
    <div class="link-container">
      <RouterLink :to="{name : 'signup'}">회원가입</RouterLink>
      <RouterLink :to="{name : 'main'}">고객센터</RouterLink>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.login-page {
  margin: 50px auto auto auto;
  border-radius: 20px;
  width: 480px;
  height: 720px;
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
  justify-content: flex-start;
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

.notice-social h3 {
  margin: 10px;
}

.img-group{
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
  gap: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  
  font-family: Noto Sans CJK KR;
}
.link-container a:hover {
  color: #0068FF
}

@media screen and (max-width: 480px) {
  .login-page {
    width: 70%;
    min-width: 320px;
  }
}
</style>
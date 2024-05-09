<template>
  <div class="login-page">
    <div class="login-top">
      <p>회원가입을 위해</p>
      <p>정보를 입력해주세요</p>
    </div>

    <form action="">
      <label for="">E-mail</label>
      <input type="text">
      <label for="">Password</label>
      <input type="password">
      <button class="login-button">LOGIN</button>
    </form>
    <div class="img-group">
      <img src="@/assets/web_neutral_sq_ctn@3x.png" alt="">
      <img src='@/assets/kakao_login_large_wide (1).png' alt="">
    </div>
    <div>
      <RouterLink>회원가입</RouterLink>
      <RouterLink>고객센터</RouterLink>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.login-page {
  margin: 30px auto 0 auto;
  border-radius: 20px;
  width: 480px;
  height: 680px;
  border: 3px solid rgb(118, 189, 255);
  box-shadow: 7px 7px 39px 0px #AACDFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.login-top {
  color: #0068FF;
  font-family: Noto Sans CJK KR;
  font-size: 30px;
  font-weight: 700;
  line-height: 47.36px;
  text-align: left;
  margin-top: 40px;
}

.login-top p {
  margin: 5px;
}

.login-button {
  border: 1.5px solid #0068FF;
  background-color: white;
  width: 300px;
  height: 40px;
  top: 875px;
  left: 725px;
  gap: 0px;
  border-radius: 10px;
  opacity: 0px;

}

.login-page form {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.img-group img {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 48px;
}
</style>
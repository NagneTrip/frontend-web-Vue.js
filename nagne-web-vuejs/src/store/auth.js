import { defineStore } from "pinia";
import { login } from "@/auth/login.js";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const token = ref("");
  const userEmail = ref("");
  const password = ref("");

  const getToken = async () => {
    const result = await login(userEmail, password);
    if (result != "") {
      //로그인 성공시
      token.value = result;
      isAuthenticated.value = true;
    } else {
      //로그인 실패
      token.value = "";
      isAuthenticated.value = false;
    }
  };

  const getLogout = () => {
    console.log("실행됨");
    token.value = "";
    isAuthenticated.value = false;
    userEmail.value = "";
    password.value = "";

    console.log("token값 : " + token.value + " " + isAuthenticated.value);
    return;
  };

  return { getLogout, getToken, isAuthenticated, token, userEmail, password };
});

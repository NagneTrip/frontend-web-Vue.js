// src/store/auth.js
import { defineStore } from "pinia";
import { login } from "@/auth/login.js";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const token = ref("");
  const userEmail = ref("");
  const password = ref("");

  const getToken = async () => {
    token.value = await login(userEmail.value, password.value);
    if (token.value !== "") {
      // 로그인 성공시
      isAuthenticated.value = true;
    } else {
      // 로그인 실패
      token.value = "";
      isAuthenticated.value = false;
    }
  };

  const getLogout = () => {
    token.value = "";
    isAuthenticated.value = false;
    userEmail.value = "";
    password.value = ""; 
  };

  return { getLogout, getToken, isAuthenticated, token, userEmail, password };
});

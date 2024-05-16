// src/store/auth.js
import { defineStore } from "pinia";
import { login } from "@/auth/login.js";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const token = ref("");
  const loginUserId = ref(null);
  const userEmail = ref("");
  const password = ref("");

  const getToken = async (check) => {
    const result = await login(userEmail.value, password.value, check);
    if (result.token !== "") {
      // 로그인 성공시
      token.value = result.token;
      isAuthenticated.value = true;
      loginUserId.value = result.userId;
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
    loginUserId.value = null;
  };

  return { getLogout, getToken, isAuthenticated, token, userEmail, password, loginUserId };
});

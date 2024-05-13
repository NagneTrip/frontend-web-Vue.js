import { defineStore } from "pinia";
import { login } from "@/auth/login.js";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const token = ref("");

  const getToken = async (username, password) => {
    const result = await login(username, password);
    if (result !== "") {
      //로그인 성공시
      console.log("auth.js에서 로그인 성공함");
      token.value = result;
      isAuthenticated.value = true;
      console.log(isAuthenticated.value);
      // return token.value;
    } else {
      //로그인 실패
      token.value = "";
      isAuthenticated.value = false;
    }
  };

  return { getToken, isAuthenticated, token };
});

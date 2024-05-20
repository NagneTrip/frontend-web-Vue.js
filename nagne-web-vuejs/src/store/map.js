// src/store/map.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("write", () => {
    const userLocation = ref({});

  return { userLocation };
});
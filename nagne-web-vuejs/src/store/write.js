// src/store/write.js
import { defineStore } from "pinia";
import { ref,watch } from "vue";

export const useWriteStore = defineStore("write", () => {
    const step = ref(1);
    const selectedImg = ref([]);
    const tempUrl = ref([]);

  return { step, selectedImg, tempUrl };
});
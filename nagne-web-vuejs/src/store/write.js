// src/store/write.js
import { defineStore } from "pinia";
import { ref,watch } from "vue";

export const useWriteStore = defineStore("write", () => {
    const step = ref(1);
    const selectedImg = ref([]);
    const tempUrl = ref([]);
    const getComments = ref(0);

    const genComments = () => {
      getComments.value ++;
    }
    const resetComments = ()=> {
      getComments.value = 0;
    }

  return { step, selectedImg, tempUrl, getComments, genComments, resetComments };
});
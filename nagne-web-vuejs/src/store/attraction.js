// src/store/attraction.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAttractionStore = defineStore("attraction", () => {
  const myAttractions = ref([]);
  const attractionSearchKeyword = ref("");
  const attractionToPlan = ref([]);

  const deleteMyAttractions = (attractionId) => {
    myAttractions.value = myAttractions.value.filter(
      (attraction) => attraction.id !== attractionId
    );
  };

  const changeKeyword = (newValue) => {
    attractionSearchKeyword.value = newValue;
  };

  return { myAttractions, deleteMyAttractions, changeKeyword };
});

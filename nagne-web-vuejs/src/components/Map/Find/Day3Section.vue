<template>
  <div class="plan-section">
    <div class="section-top">
      <p class="section-top-text">Day 3</p>
      <div class="section-main">
        <draggable :list="day3" group="attraction" item-key="id" class="list-group" ghost-class="ghost"
          @start="dragging = true" @end="dragging = false">
          <template #item="{ element, index }">
            <div>{{ element }}</div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAttractionStore } from "@/store/attraction";
import { storeToRefs } from "pinia";

const attractionStore = useAttractionStore();
const { day3 } = storeToRefs(attractionStore);
</script>

<style scoped>
.plan-section {
  min-height: 300px;
  background-color: red;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 18px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.section-top-text {
  font-size: 24px;
  color: #929292;
}
</style>
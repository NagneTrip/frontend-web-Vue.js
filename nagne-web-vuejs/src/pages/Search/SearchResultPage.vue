<template>
  <div>
    <div class="card card-body">
      <div class="search-box">
        <font-awesome-icon
          class="serach-icon icon"
          id="navbar-search-btn"
          :icon="faMagnifyingGlass"
        />
        <input
          class="search-input jua-regular-large"
          placeholder="검색어를 입력하세요."
          type="text"
        />
        <button class="jua-regular search-btn">검색</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
</script>

<style scoped></style>

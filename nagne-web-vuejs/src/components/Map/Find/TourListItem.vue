<template>
  <div class="list-item">
    <div class="item-img">
      <img
        v-if="attraction.imageUrl"
        :src="attraction.imageUrl"
        onerror="this.src='/src/assets/logo/sad_logo.png'"
        alt=""
      />
      <img
        v-if="!attraction.imageUrl"
        class="no-img"
        :src="'/src/assets/logo/sad_logo.png'"
        onerror="this.src='/src/assets/logo/sad_logo.png'"
        alt=""
      />
    </div>
    <div class="item-info">
      <div class="info-top">
        <div class="info-left">
          <p class="title jua-regular">{{ attraction.title }}</p>
          <p class="type jua-regular">{{ attractionByData.name }}</p>
        </div>
        <div class="info-right">
            <img class="filter-img" :src="`/src/assets/map_marker/${attractionByData.logo}.png`" alt="" />
          <button>
            <font-awesome-icon :icon="faCartShopping" class="cart" />
          </button>
        </div>
      </div>
      <div class="address">
        <p class="add1 jua-regular">{{ attraction.addr }}</p>
        <p class="add2 jua-regular">{{ attraction.zipCode }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted } from "vue";
import { attraction_type } from "@/assets/attraction_type/attraction_type";

const props = defineProps({
  attraction: Object,
});

const attractionByData = ref({});
onMounted(() => {
  attractionByData.value = attraction_type.filter(
    (item) => item.attractionTypeId === props.attraction.attractionTypeId
  )[0];
  console.log(attractionByData.value);
});
</script>

<style scoped>
.list-item {
  color: black;
  background-color: white;
  border: 3.5px solid rgb(118, 189, 255);
  width: 90%;
  height: 550px;
  border-radius: 25px;
  margin: 0 auto 20px auto;
  padding: 20px;
  box-shadow: 7px 7px 20px 2px #aacdff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.item-img {
  width: 400px;
  height: 320px;
  display: flex;
  justify-content: center;
  margin: 10px 0px 0px 0px;
  object-fit: fill;
}

.item-img img {
  width: 90%;
  height: 100%;
  border-radius: 14px;
}

.no-img {
  opacity: 0.8;
  width: 90%;
  height: 100%;
  background-color: rgb(197, 197, 197);
  border-radius: 14px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  margin-bottom: 10px;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 28px;
}

.type {
  font-size: 24px;
}

.address {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-right {
  display: flex;
  gap: 10px;
}

button {
  border: none;
  background-color: #898989;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px 0px #5f5f5f;
}

button:hover {
  background-color: #0068ff;
  transition: 0.2s all;
  scale: 1.05;
}

.cart {
  color: rgb(244, 244, 244);
  width: 30px;
  height: 30px;
}

.filter-img {
    width: 50px;
    height: 50px;
}
</style>

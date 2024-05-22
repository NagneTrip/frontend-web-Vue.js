<template>
    <div class="list-item">
        <div class="item-img">
            <img v-if="attraction.imageUrl" :src="attraction.imageUrl"
                onerror="this.src='/src/assets/logo/sad_logo.png'" alt="">
            <img v-if="!attraction.imageUrl" class="no-img" :src="'/src/assets/logo/sad_logo.png'"
                onerror="this.src='/src/assets/logo/sad_logo.png'" alt="">
        </div>
        <div class="item-info">
            <p class="title">{{ attraction.title }}</p>
            <div class="address"></div>
            <p class="add1">{{ attraction.addr }}</p>
            <p class="add2">{{ attraction.zipCode }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const props = defineProps({
    attraction: Object,
})

</script>

<style scoped>
.list-item {
    color: black;
    background-color: rgb(241, 241, 241);
    width: 90%;
    height: 500px;
    border-radius: 25px;
    margin: 0 auto 20px auto;
    padding: 20px;
    box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item-img {
    width: 400px;
    height: 250px;
    display: flex;
    justify-content: center;
    margin: 15px 0px 0px 0px;

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
</style>
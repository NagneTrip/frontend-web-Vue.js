<template>
    <div class="list">
        <div class="list-left">
            <div class="img-section">
            <img src="@/assets/logo/logo_img.png" alt="" :width="60" :height="60">
        </div>
        <div class="user-nickname">
            <p class="jua-regular nickname">{{ followItem.nickname }}</p>
            <img :src="`/src/assets/tier/${followItem.tier}.svg`" :width="18" :height="18" alt="" class="tier-img" />
        </div>
        
        </div>
        <button class="follow-btn jua-regular">팔로우</button>
        <!-- <button class="tab jua-regular">팔로잉</button> -->
    </div>
</template>

<script setup>

const props = defineProps({
    followItem : Object,
})
console.log(props.followItem)
</script>

<style scoped>
p {
    margin: 0;
}
.list {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}
.list-left {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
}

.user-nickname {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.nickname {
    font-size: 20px;
    margin-right: 6px;
}

.follow-btn {
    width: 65px;
    height: 25px;
    border: none;
    background-color: rgb(118, 189, 255);
    border-radius: 8px;
    color: white;
    transition: 0.2s all;
}

.follow-btn:hover {
    background-color: #0068FF;
    scale: 1.1;
    transition: 0.2s all;
}
</style>
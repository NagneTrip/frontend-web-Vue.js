<template>
    <div class="write-page">
        <p class="write-top jua-regular">나그네와 함께 여행을 떠나봐요!</p>
        <div class="write-menu">
            <div class="row-container">
                <div class="write" id="gps-icon" @click="move('find')">
                    <font-awesome-icon :icon="faLocationDot" class="add-img-icon" />
                    <p class="jua-regular">주변 둘러보기</p>
                </div>
            </div>
            <div class="row-container">
                <div class="write" id="carrier-icon" @click="move('plan')">
                    <font-awesome-icon :icon="faSuitcaseRolling" class="add-img-icon" />
                    <p class="jua-regular">내 여행 계획</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>
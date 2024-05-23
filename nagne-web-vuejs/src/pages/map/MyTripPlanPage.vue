<template>
    <div class="cart">
        <div class="cart-header">
            <button @click="updateTripDay('-')">-</button>
            <p>{{ tripSchedule() }}</p>
            <button @click="updateTripDay('+')">+</button>
        </div>
        <div class="day-section-container">
            <template v-if="tripDay == 1">
                <Day1Section />
            </template>
            <template v-if="tripDay == 2">
                <Day1Section />
                <Day2Section />
            </template>
            <template v-if="tripDay == 3">
                <Day1Section />
                <Day2Section />
                <Day3Section />
            </template>
            <template v-if="tripDay == 4">
                <Day1Section />
                <Day2Section />
                <Day3Section />
                <Day4Section />
            </template>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.cart {
    display: inline-block;
    width: 500px;
    height: 700px;
    background-color: #eeeeee;
    color: rgb(0, 0, 0);
    position: fixed;
    right: 10px;
    top: 130px;
    z-index: 99;
    padding: 5px;
    border-radius: 18px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    transition: all 0.2s;
    overflow: hidden;
    padding-top: 10px;
    box-shadow: 3px 4px 5px 3px rgba(0, 0, 0, 0.4);
    overflow: hidden;
}

.close-section {
    width: 95%;
    margin-top: 5px;
    display: flex;
    justify-content: flex-start;
}

.close-section-btn-wrapper {
    width: 30px;
    height: 30px;
    background-color: rgb(206, 206, 206);
    box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.4);
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
}

.close-section-btn-wrapper:hover {
    transform: scale(1.1);
    transition: all 0.2s;
    background-color: #5a96fc;
}

.close-section-btn {
    width: 18px;
    height: 18px;
    color: white;
}

.cart-header {
    display: flex;
    gap: 20px;
    width: 300px;
    justify-content: space-between;
    align-items: center;
}

.cart-header p {
    cursor: default;
    font-size: 20px;
}

.cart-header button {
    width: 60px;
    height: 40px;
    border-radius: 18px;
    border: none;
    background-color: #5a96fc;
    color: white;
    font-size: 24px;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.4);
}

.cart-header button:hover {
    scale: 1.05;
    transition: 0.2s all;
}

.day-section-container {
    flex: 1 1 auto;
    width: 90%;
    overflow-y: auto;
    scrollbar-width: none;
    margin-top: 20px;
}
</style>
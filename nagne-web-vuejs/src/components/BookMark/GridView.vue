<template>
    <div class="user-article">
        <keep-alive>
            <GridItem v-for="(bookMarkItem, index) in bookMarkList" :bookMarkItem="bookMarkItem"
                :key="bookMarkItem.id" />
        </keep-alive>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GridItem from './GridItem.vue';

const props = defineProps({
    bookMarkList: Object,
});
</script>

<style scoped>
.user-article {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    /* 아이템 간의 간격을 설정 */
}
</style>
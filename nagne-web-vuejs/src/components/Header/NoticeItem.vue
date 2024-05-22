<template>
    <li class="notice-item">
        <div class="noticer-img">
            <img :src="notice.fromUserProfileImage || '/src/assets/logo/logo_img.png'"
                onerror="this.src='/src/assets/logo/sad_logo.png'" alt="" :width="50" :height="50"
                @click="moveTo('user')" />
        </div>
        <div class="notice-info">
            <div class="noticer-info">
                <div class="noticer">
                    <div class="name-tier" @click="moveTo('user')">
                        <p class="noticer-name jua-regular">{{ notice.fromUserNickname }}</p>
                        <img :src="`/src/assets/tier/${notice.fromUserTier}.svg`"
                            onerror="this.src='/src/assets/logo/sad_logo.png'" alt="" :width="14" :height="16">
                    </div>

                    <p class="notice-date jua-regular">{{ notice?.createdDate.split("T")[0] }}</p>
                </div>
            </div>
            <div class="notice-content">
                <p v-if="notice.type == 'LIKE'" class="notice-type jua-regular" @click="moveTo('article')">회원님의 게시글에
                    좋아요를
                    눌렀어요.</p>
                <p v-if="notice.type == 'COMMENT'" class="notice-type jua-regular" @click="moveTo('article')">회원님의 게시글에
                    댓글을 달았어요.</p>
                <p v-if="notice.type == 'BOOKMARK'" class="notice-type jua-regular" @click="moveTo('article')">회원님의 게시글을
                    저장했어요.</p>
                <p v-if="notice.type == 'FOLLOW'" class="notice-type jua-regular" @click="moveTo('follow')">회원님을 팔로우
                    했어요.</p>
            </div>
        </div>
        <button v-if="notice.isNew" class="unread-btn jua-regular" @click="readNotice">확인</button>
        <button v-if="!notice.isNew" class="read-btn jua-regular">읽음</button>
    </li>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();

const props = defineProps({
    notice: Object,
})
const emit = defineEmits([
    'closeNotice', 'reloadComments'
])

const isNew = ref(false);
onMounted(() => {
    isNew.value = props.notice.isNew;
})

const moveTo = (to) => {
    emit('closeNotice');
    let pathTo;
    switch (to) {
        case 'user':
            pathTo = { name: 'user', params: { 'id': props.notice.fromUserId } }
            break;

        case 'article':
            pathTo = { name: 'articleDetail', params: { 'id': props.notice.articleId } }
            break;
        case 'follow':
            pathTo = { name: 'user', params: { 'id': props.notice.fromUserId } };
            break;
    }
    router.push(pathTo)
}

// 알림 읽기
const readNotice = async () => {
    await axios.patch(`http://localhost:8080/api/notifications/${props.notice.id}`, {}, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    }).then(({ data }) => {
        emit('reloadComments');
    })
}
</script>

<style scoped>
.notice-item {
    width: 100%;
    height: 80px;
    list-style: none;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 15px 0 15px 0;
}

.noticer-img {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    overflow: hidden;
}

.noticer-img img {
    cursor: pointer;
}

.notice-info {
    display: flex;
    gap: 8px;
    flex-direction: column;
    width: 60%;
}

.noticer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name-tier {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.noticer-name {
    font-size: 18px;
}

.notice-date {
    font-size: 14px;
    color: #818181;
}

.notice-type {
    font-size: 15px;
    cursor: pointer;
}

.unread-btn {
    background-color: rgb(245, 117, 100);
    border-radius: 6px;
    height: 35px;
}

.read-btn {
    background-color: rgb(212, 212, 212);
    border-radius: 6px;
    height: 35px;
}
</style>
<template>
    <div class="write-page">
        <p class="write-top jua-regular">나그네와 함께 추억을 공유하세요!</p>
        <div class="write-menu">
            <div class="write" @click="() => movePage('notice')" style="display: none;">
                <font-awesome-icon :icon="faBullhorn" class="add-img-icon" />
                <p class="jua-regular">공지사항</p>
            </div>
            <div class="write" @click="() => movePage('articleWrite')">
                <font-awesome-icon :icon="faComments" class="add-img-icon" />
                <p class="jua-regular">피드 추가하기</p>
            </div>
            <div class="write" @click="() => movePage('planWrite')">
                <font-awesome-icon :icon="faEarthAsia" class="add-img-icon" />
                <p class="jua-regular">계획 공유하기</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { faBullhorn, faComments, faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
const store = useAuthStore();

const router = useRouter();
const movePage = (path) => {
    //로그인 확인 해야함
    if (!store.isAuthenticated || !sessionStorage.getItem('token')) {
        if (window.confirm("로그인 후 이용하세요!")) {
            router.push({name : 'login'});
        }
        return;
    }

    switch (path) {
        case 'articleWrite':
            router.push({name:path})
            break;
        case 'planWrite':
        router.push({name:path})
            break;

        case 'notice':

            break;
    }
}

</script>

<style scoped>
.write-page {
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: flex-start;
    ;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    background-image: url('/assets/page/0E4A6201.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom, center;
    transition: all 0.2s;
}

.write-top {
    margin: 80px 0 0 0;
    font-size: 40px;
    letter-spacing: 1.5px;
    color: rgb(0, 0, 0);
}

.write-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;
    transition: all 0.2s;
}

.write {
    border: 3px solid black;
    width: 250px;
    height: 250px;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    gap: 10px;
    padding-top: 15px;
    transition: all 0.2s;
    box-shadow: 0px 6px 6px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.write p {
    font-size: 28px;
    letter-spacing: 1.5px;
}

.add-img-icon {
    color: black;
    width: 100px;
    height: 150px;
    transition: all 0.1s;
}

.write:hover {
    background-color: rgb(65, 139, 244);
    border: none;
    color: white;
    scale: 1.1;

    .add-img-icon {
        color: white;
    }
}

@media screen and (max-width: 1300px) {
    .write-menu {
        gap: 30px;
        transition: all 0.2s;
    }

    .write {
        width: 200px;
        height: 200px;
        transition: all 0.2s;
    }

    .add-img-icon {
        width: 100px;
        height: 100px;
        transition: all 0.1s;
    }
}

@media screen and (max-width: 850px) {
    .write-menu {
        flex-direction: column;
    }

    .write-top {
        font-size: 24px;
    }
}

@media screen and (max-width : 380px) {

    .write-top {
        display: none;
    }

    .write-menu {
        margin-top: 100px;
    }
}
</style>
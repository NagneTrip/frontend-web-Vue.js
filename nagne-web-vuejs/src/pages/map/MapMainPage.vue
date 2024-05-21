<template>
    <div class="write-page">
        <!-- <button class="address-btn jua-regular" @click="clickBtn">
            <font-awesome-icon :icon="faLocationCrosshairs" class="gps-btn" />
            <p>현 위치로 주소 설정하기</p>
        </button> -->
        <p class="write-top jua-regular">나그네와 함께 여행을 떠나봐요!</p>
        <div class="write-menu">
            <div class="row-container">
                <div class="write" id="gps-icon" @click="move('find')">
                    <font-awesome-icon :icon="faLocationDot" class="add-img-icon" />
                    <p class="jua-regular">주변 둘러보기</p>
                </div>
                <div class="write" id="hashtag-icon" @click="move('tag')">
                    <font-awesome-icon :icon="faHashtag" class="add-img-icon " />
                    <p class="jua-regular">키워드로 찾기</p>
                </div>
            </div>
            <div class="row-container">
                <div class="write" id="pin-icon" @click="move('save')">
                    <font-awesome-icon :icon="faEarthAsia" class="add-img-icon" />
                    <p class="jua-regular">내 장소 보기</p>
                </div>
                <div class="write" id="carrier-icon" @click="move('plan')">
                    <font-awesome-icon :icon="faSuitcaseRolling" class="add-img-icon" />
                    <p class="jua-regular">내 여행 계획</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { faLocationDot, faEarthAsia, faSuitcaseRolling, faHashtag, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { useMapStore } from '@/store/map';
const mapStore = useMapStore();
const router = useRouter();
const move = (path) => {
    if (!sessionStorage.getItem('token')) {
        alert('로그인 후 이용하세요!')
        router.push({ name: 'login' });
    }

    router.push(`/map/${path}`);
}

const gpsLocation = ref({});

const clickBtn = () => {
    console.log('눌림')
    getLoaction();
    locaToAddress();
}

const getLoaction = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        mapStore.userLocation = { lat, lng };
        gpsLocation.value = mapStore.userLocation;
    }, (error) => {
        console.error("Geolocation error:", error);
    });
}

// const locaToAddress = async () => {
//     await axios.get(`/map-reversegeocode/v2/gc?coords=${gpsLocation.value.lat},${gpsLocation.value.lng}&output=json`, {
//         headers: {
//             'X-NCP-APIGW-API-KEY-ID': import.meta.env.VITE_GC_ID,
//             'X-NCP-APIGW-API-KEY': import.meta.env.VITE_GC_SECRET
//         }
//     })
//         .then((data) => console.log(data))
//         .catch()
// }
</script>

<style scoped>
.write-page {
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    background-image: url('@/assets/page/map_main.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom, center;
    transition: all 0.2s;
}

.address-btn {
    width: 240px;
    height: 60px;
    border-radius: 35px;
    background-color: rgb(134, 184, 255);
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 30px 0 10px 0;
    border: none;
    box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.2);
    transition: all 0.2s;
}

.address-btn:hover {
    background-color: white;
    color: rgb(134, 184, 255);
    scale: 1.05;
    transition: all 0.2s;

    .gps-btn {
        color: rgb(134, 184, 255);
    }
}

.address-btn p {
    margin: 0;
}

.gps-btn {
    color: white;
    width: 30px;
    height: 30px;
}

.write-top {
    margin: 50px 0 20px 0;
    font-size: 50px;
    letter-spacing: 1.5px;
    color: rgb(255, 255, 255);
    font-weight: 500;
    text-shadow: 2px 2px 3px grey;
    cursor: default;
}

.write-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    transition: all 0.2s;
    opacity: 0.8;
}

.row-container {
    display: flex;
    gap: 50px;
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
    width: 90px;
    height: 100px;
    transition: all 0.1s;
}

.write:hover {
    border: none;
    color: white;
    scale: 1.1;

    .add-img-icon {
        color: white;
    }
}



#gps-icon:hover {
    background-color: rgb(65, 139, 244);
}

#hashtag-icon:hover {
    background-color: rgb(248, 75, 119);
}

#pin-icon:hover {
    background-color: gold;
}

#carrier-icon:hover {
    background-color: rgb(22, 248, 173);
}

@media screen and (max-width: 1300px) {
    .write-menu {
        gap: 30px;
        transition: all 0.2s;
    }

    .row-container {
        gap: 30px;
    }

    .write {
        width: 200px;
        height: 200px;
        transition: all 0.2s;
    }

    .add-img-icon {
        width: 80px;
        height: 80px;
        transition: all 0.1s;
    }
}

@media screen and (max-width: 950px) {
    .write-menu {
        flex-direction: column;
        gap: 50px;
    }

    .row-container {
        gap: 50px;
    }

    .write-top {
        font-size: 24px;
    }
}

@media screen and (max-width : 450px) {

    .write-top {
        display: none;
    }

    .row-container {
        gap: 20px;
        flex-direction: column;
    }

    .write-menu {
        gap: 20px;
        margin-top: 30px;
    }
}
</style>
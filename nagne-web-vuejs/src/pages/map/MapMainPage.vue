<template>
    <div class="write-page">
        <div class="write-menu">
            <div class="row-container">
                <div class="write" id="gps-icon">
                    <font-awesome-icon :icon="faLocationDot" class="add-img-icon" />
                    <p class="jua-regular">지도로 찾기</p>
                </div>
                <div class="write" id="hashtag-icon">
                    <font-awesome-icon :icon="faHashtag" class="add-img-icon " />
                    <p class="jua-regular">키워드로 찾기</p>
                </div>
            </div>
            <div class="row-container">
                <div class="write" id="pin-icon">
                    <font-awesome-icon :icon="faThumbtack" class="add-img-icon" />
                    <p class="jua-regular">저장한 장소</p>
                </div>
                <div class="write" id="carrier-icon">
                    <font-awesome-icon :icon="faSuitcaseRolling" class="add-img-icon" />
                    <p class="jua-regular">내 여행 계획</p>
                </div>
            </div>
        </div>
        <p class="write-top jua-regular">나그네와 함께 추억을 공유하세요!</p>

    </div>
</template>

<script setup>
import { faLocationDot, faHashtag, faSuitcaseRolling, faThumbtack } from "@fortawesome/free-solid-svg-icons";
</script>

<style scoped>
.write-page {
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: space-between;
    ;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    background-image: url('@/assets/page/map_main.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom, center;
    transition: all 0.2s;
}

.write-top {
    visibility: hidden;
    margin: 0 0 90px 0;
    font-size: 60px;
    letter-spacing: 1.5px;
    color: rgb(214, 214, 214);
    font-weight: 500;
}

.write-menu {
    margin-top: 80px;
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
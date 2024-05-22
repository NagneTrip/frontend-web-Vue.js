<template>
    <div class="edit-page">
        <div class="login-top">
            <p class="jua-regular">회원 정보 수정</p>
        </div>
        <div class="profile-img-section">
            <img src="/src/assets/logo/logo_img.png" class="profile-img" alt="">
            <input type="file" ref="inputFile" @change="fileChange" />
            <div class="selected">
                <button class="jua-regular selected-text" @click="imgSelect">Selected</button>
                <div class="selected-imgs-list">
                    <div class="selected-img">
                        <p v-if="profileImg" class="jua-regular img-text ">{{ profileImg.name && (profileImg.name.length
                            > 12 ? profileImg.name.substring(0, 12) + '..' : profileImg.name) }}</p>
                        <button v-if="profileImg" class="delete-img jua-regular" @click="deleteImg">삭제</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-form">
            <div class="input-box">
                <div class="label-wrapper">
                    <label for="email" class="jua-regular">E-mail</label>
                </div>
                <input type="text" id="email" disabled v-model="email">
            </div>
            <div class="input-box">
                <div class="label-wrapper">
                    <label for="password" class="jua-regular">Password</label>
                </div>
                <input v-if="!socialLogin" type="password" id="password" v-model="password" required>
                <input v-else type="password" id="password" v-model="password" disabled placeholder="소셜 로그인입니다.">
            </div>
            <div class="input-box">
                <div class="label-wrapper">
                    <label for="passwordConfirm" class="jua-regular">PW Confirm</label>
                </div>
                <input type="password" v-if="!socialLogin" id="passwordConfirm" v-model="passwordConfirm" required>
                <input type="password" v-else id="passwordConfirm" v-model="passwordConfirm" disabled
                    placeholder="소셜 로그인입니다.">
            </div>
            <div class="input-box">
                <div class="label-wrapper">
                    <label for="nickname" class="jua-regular">NickName</label>
                </div>
                <input type="text" id="nickname" v-model="nickname" required>
            </div>
            <div class="input-box">
                <div class="label-wrapper">
                    <label for="birth" class="jua-regular">Birth</label>
                </div>
                <input type="date" id="birth" v-model="birth" required>
            </div>
            <div class="input-box">
                <div class="label-wrapper">
                    <label for="phone" class="jua-regular">Phone</label>
                </div>
                <div class="input-phone">
                    <select name="phone1" v-model="phone1" required>
                        <option value="010" selected>010</option>
                        <option value="011">011</option>
                        <option value="02">02</option>
                        <option value="031">031</option>
                        <option value="032">032</option>
                        <option value="033">033</option>
                        <option value="041">041</option>
                        <option value="042">042</option>
                        <option value="043">043</option>
                        <option value="044">044</option>
                        <option value="051">051</option>
                        <option value="052">052</option>
                        <option value="053">053</option>
                        <option value="054">054</option>
                        <option value="055">055</option>
                        <option value="061">061</option>
                        <option value="062">062</option>
                        <option value="063">063</option>
                        <option value="064">064</option>
                    </select>
                    <p>-</p>
                    <input type="text" v-model="phone2" required>
                    <p>-</p>
                    <input type="text" v-model="phone3" required>
                </div>
            </div>
            <div id="gender-box" class="input-box">
                <div class="label-wrapper">
                    <label class="jua-regular">Gender</label>
                </div>
                <div class="radio-wrapper">
                    <label :class="{ radioSelected: gender === 'male' }" for="male">Male</label>
                    <input type="radio" id="male" name="gender" v-model="gender" value="male">
                </div>
                <div class="radio-wrapper">
                    <label :class="{ radioSelected: gender === 'female' }" for="female">Female</label>
                    <input type="radio" id="female" name="gender" v-model="gender" value="female">
                </div>
            </div>
            <div class="btn-group">
                <button class="login-button jua-regular" @click="updateInfo">수정하기</button>
                <button class="delete-btn jua-regular" @click="leaveUser">회원 탈퇴</button>
            </div>

        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.js'
const authStore = useAuthStore();
import { useRouter } from 'vue-router';
const router = useRouter();

const userInfo = ref({});
const profileImg = ref({});
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const nickname = ref("");
const birth = ref("");
const phone1 = ref("");
const phone2 = ref("");
const phone3 = ref("");
const gender = ref("");
const socialLogin = ref(false);

const inputFile = ref(null);

const fetchInfo = async () => {
    await axios.get(`http://localhost:8080/api/users/${sessionStorage.getItem('loginUserId')}/detail`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, },
    }).then(({ data }) => {
        userInfo.value = data.response.userInfo;
        email.value = userInfo.value.username;
        nickname.value = userInfo.value.nickname
        profileImg.value = userInfo.value.profileImage;
    })
}

onMounted(async () => {
    if (!sessionStorage.getItem("token") || !authStore.isAuthenticated) {
        return;
    }
    if (sessionStorage.getItem('socialLogin') === 'true') {
        socialLogin.value = true;
    }
    await fetchInfo();
})

const makeForm = () => {
    const formData = new FormData();
    const userObj = {
        nickname: nickname.value,
        phone: `${phone1.value}${phone2.value}${phone3.value}`
    }
    formData.append('request', new Blob([JSON.stringify(userObj)], { type: 'application/json' }));
    if (profileImg.value) {
        formData.append('profileImage', profileImg.value);
    }

    return formData;
}

const updateInfo = async () => {
    const formData = makeForm();
    await axios.patch(`http://localhost:8080/api/users/${sessionStorage.getItem('loginUserId')}`, formData, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, },
    }).then(() => {
        alert("회원 정보가 수정되었습니다!");
        router.push({ name: 'main' })
    }).catch((err) => alert('회원 정보를 다시 확인해주세요!'))
}

const leaveUser = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
        await axios.delete(`http://localhost:8080/api/users/${sessionStorage.getItem('loginUserId')}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`, },
        }).then(() => {
            alert("회원 탈퇴가 완료되었습니다.");
            authStore.getLogout();
            router.push({ name: 'logout' })
        }).catch((err) => console.log(err))
    }

}

const imgSelect = () => {
    inputFile.value.click();
}

const fileChange = (event) => {
    profileImg.value = event.target.files[0]
}

const deleteImg = () => {
    profileImg.value = null;
}

</script>

<style scoped>
p {
    margin: 0;
}

input {
    width: 70%;
    height: 24px;
    margin: 5px;
    border: none;
    border-bottom: 1.5px solid rgb(118, 189, 255);
    font-size: 18px;
    letter-spacing: 1px;
    font-family: Noto Sans CJK KR;
    transition: all 0.05s;
}

input:focus {
    outline: none;
    border-bottom: 3px solid #0068FF;
    transition: all 0.05s;
}

.edit-page {
    margin: 30px auto auto auto;
    border-radius: 20px;
    width: 1200px;
    height: 800px;
    border: 3px solid rgb(118, 189, 255);
    box-shadow: 7px 7px 39px 0px #AACDFF;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

input[type=file] {
    display: none;
}

.profile-img {
    width: 200px;
    height: 200px;
}

.profile-img-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 50px;
}

.radioSelected {
    font-size: 14px;
    font-weight: 600;
    color: rgb(65, 139, 244);
}

label {
    color: rgb(118, 189, 255)
}

.selected {
    width: 200px;
    min-height: 100px;
    border: 3px rgb(65, 139, 244) dashed;
    border-radius: 15px;
    box-shadow: 0px 6px 6px 4px rgba(0, 0, 0, 0.1);
    padding: 0 12px 0 12px;
}

.selected-text {
    margin: 8px 0 0 0;
    font-size: 25px;
    display: flex;
    justify-content: center;
    color: rgb(23, 117, 250);
}

.selected-img {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.img-text {
    font-size: 16 px;
    margin: 0;
    color: #0068FF
}

.delete-img {
    border: none;
    color: white;
    background-color: rgb(255, 174, 174);
    width: 35px;
    height: 25px;
    font-size: 12px;
    padding: 1.5px 0 0 0;
    border-radius: 8px;
    margin-top: 5px;
    font-weight: 300;
    letter-spacing: 1px;
    transition: all 0.2s;
}

.delete-img:hover {
    background-color: red;
    scale: 1.05;
    transition: all 0.2s;
}

.login-top {
    width: 70%;
    color: #0068FF;
    font-size: 22px;
    font-weight: 700;
    line-height: 47.36px;
    text-align: left;
    cursor: default;
    display: flex;
    justify-content: center;
}

.login-top p {
    margin: 2px;
}

.login-button {
    border: 2px solid #0068FF;
    color: #0068FF;
    font-size: 16px;
    font-weight: 600;
    background-color: white;
    width: 100%;
    height: 54px;
    top: 875px;
    left: 725px;
    gap: 0px;
    border-radius: 10px;
    transition: all 0.2s;
}

.login-button:hover {
    color: white;
    background-color: #0068FF;
    transition: all 0.2s;
}

.login-button:active {
    color: white;
    background-color: #1efda8;
    scale: 1.05;
    border: none;
    transition: all 0.1s;
}

.info-form {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 27px;
}

.input-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.label-wrapper {
    display: flex;
    width: 50%;
    justify-content: flex-start;
}

.login-page label {
    font-family: Noto Sans CJK KR;
    font-weight: 600;
    font-size: 18px;
    justify-content: flex-start;
    color: rgb(118, 189, 255);
}

.login-page input {
    width: 70%;
    height: 24px;
    margin: 5px;
    border: none;
    border-bottom: 1.5px solid rgb(118, 189, 255);
    font-size: 18px;
    letter-spacing: 1px;
    font-family: Noto Sans CJK KR;
    transition: all 0.05s;
}

.login-page input:focus {
    outline: none;
    border-bottom: 3px solid #0068FF;
    transition: all 0.05s;
}

.wrong-info {
    outline: none;
    border-bottom: 3px solid red;
}

.notice-social {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
}

.notice-social p {
    margin: 0px;
}

.notice-social h4 {
    margin: 10px;
}

.img-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.img-group img {
    cursor: pointer;
    width: 300px;
    height: 56px;
}

.img-group img:hover {
    scale: 1.02;
    transition: all 0.1s;
}

.link-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
    font-family: Noto Sans CJK KR;
}

.link-container div {
    display: flex;
    gap: 15px;
    color: #686868;
}

.link-container a {
    color: #000000;
    text-align: center;
}

.link-container a:hover {
    color: #0068FF;
}

.input-phone {
    display: flex;
    width: 60%;
}

.input-phone select {
    width: 60px;
    height: 30px;
    margin-right: 5px;
    border: rgb(118, 189, 255) 1px solid;
    border-radius: 5px;
    text-align: center;
}

.input-phone select:focus {
    border: rgb(118, 189, 255) 1px solid;
}

.input-phone input {
    width: 60px;
    text-align: center;
}


.social-icons {
    font-family: Noto Sans CJK KR;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.social-icons img {
    width: 40px;
    height: 40px;
    margin: 0 10px 0 10px;
    cursor: pointer;
}

#gender-box {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.radio-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 7px;
}

.radio-wrapper {
    width: 100px;
}

.radio-wrapper label {
    font-size: 12px;
    margin: 0;
}

.radio-wrapper input {
    width: 17px;
    height: 17px;
    margin: 0;
}

.selected {
    color: red;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal iframe {
    width: 80%;
    height: 80%;
}

@media screen and (max-width: 480px) {
    .login-page {
        width: 70%;
        min-width: 320px;
    }
}

.btn-group {
    width: 100%;
    display: flex;
    gap: 10px;
}

.delete-btn {
    font-size: 16px;
    font-weight: 600;
    background-color: white;
    width: 100%;
    height: 54px;
    top: 875px;
    left: 725px;
    gap: 0px;
    border-radius: 10px;
    transition: all 0.2s;

    border: 2px solid #ee6767;
    color: #ee6767
}

.delete-btn:hover {
    background-color: #ee6767;
    color: white;
    transition: all 0.2s;
}

.selected-text {
    font-size: 16px;
    font-weight: 600;
    background-color: white;
    border: #0068FF 2px solid;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.selected-text:hover {
    transition: all 0.2s;
    color: white;
    scale: 1.05;
    background-color: #0068FF
}
</style>
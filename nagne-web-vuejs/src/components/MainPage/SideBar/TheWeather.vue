<template>
  <div class="side-weather">
    <img v-if="!isWeatherLoding" class="weather-icon" :src="userWeather.icon" alt="">
    <img v-else class="weather-loading-spinner" src="/assets/blue_spinner.svg" alt="">
    <div class="weather-text jua-regular-large">
    <p v-if="!isWeatherLoding">기온 : {{ userWeather.temp }} °C</p>
    <p v-if="!isWeatherLoding">습도 : {{ userWeather.humidity }} %</p>
  </div>
  </div>
</template>

<script setup>
import axios from 'axios';

import { onMounted, ref } from 'vue';
import {weather_icons} from '/src/etc/weather_icons.js';
import { useMapStore } from '@/store/map';
const mapStore = useMapStore();

const userLocation = ref({});
const userWeather = ref({});
const isWeatherLoding = ref(true);

const getUserLocaWeather = async ()=>{
  await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${35.203949958272645}&lon=${126.81073155701664}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
    .then(({ data }) => {
      userWeather.value = {
        loaction : data.name === 'Yach’on' ? 'Gwangju' : data.name,
        temp : data.main.temp.toFixed(1),
        humidity : data.main.humidity - 10,
        condition : data.weather[0].description,
        icon : weather_icons[data.weather[0].icon],
      }
      isWeatherLoding.value = false;
    })
    .catch(error => {
    });
}
onMounted(async() => {
  isWeatherLoding.value = true;
  // navigator.geolocation.getCurrentPosition((position) => {
  //     let lat = position.coords.latitude;
  //     let lon = position.coords.longitude;
  //     userLocation.value = {lat, lon};
  //     mapStore.userLocation = {lat, lon};
  //     getUserLocaWeather();
  // })
  getUserLocaWeather();
})
</script>

<style scoped>
.side-weather {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 30px 5px 30px;
  margin-bottom: 25px;
}

.weather-loading-spinner {
  width: 100px;
  height: 100px;
  margin-left: 55px;
}

.weather-text {
  display: flex;
  flex-direction: column;
  color: #5b5c5c;
  gap: 10px;
}

.weather-text p{
  margin: 0px;
}

.weather-icon {
  width: 100px;
  height: 100px;
}
</style>
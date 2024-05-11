<template>
  <div class="side-weather">
    <img :src="userWeather.icon" :width="100" alt="">
    <p>{{ userWeather.temp }} °C</p>
    <p>{{ userWeather.humidity }} %</p>
    
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {weather_icons} from '@/assets/weather_icon/weather_icons.js';

const userLocation = ref({});
const userWeather = ref({});

const getUserLocaWeather = async ()=>{
  await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.value.lat}&lon=${userLocation.value.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
    .then(({ data }) => {
      console.log(data);
      userWeather.value = {
        loaction : data.name === 'Yach’on' ? 'Gwangju' : data.name,
        temp : data.main.temp.toFixed(1),
        humidity : data.main.humidity - 10,
        condition : data.weather[0].description,
        icon : weather_icons[data.weather[0].icon],
      }
      console.log(userWeather.value)
    })
    .catch(error => {
    });
}
onMounted(async() => {
  navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log(lat, lon)
      userLocation.value = {lat, lon}
      getUserLocaWeather();
  })
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
}

.weather-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #5b5c5c;
}

.weather-icon {
  width: 100px;
  height: 100px;
  border-radius: 15px;
}
</style>
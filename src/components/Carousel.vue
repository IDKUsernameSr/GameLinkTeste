<template>
    <Swiper :slides-per-view="1" :loop="true">
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <img :src="slide" alt="" />
      </SwiperSlide>
    </Swiper>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  const slides = [
    '/img/slide1.jpg',
    '/img/slide2.jpg',
    '/img/slide3.jpg'
  ]
  </script>
  
  <style scoped>
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  </style>
  
<template>
  <section class="hero">
    <div class="container">
      <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :loop="true"
      :slides-per-view="1"
      :space-between="0"
      effect="fade"
      class="hero__slider"
    >
          <SwiperSlide v-for="(slide, index) in slides" :key="index">
            <div class="hero__items" :style="{ backgroundImage: `url(${slide.image})` }">
              <!-- <div class="hero__overlay"></div> -->
              <div class="row">
                <div class="col-lg-6">
                  <div class="hero__text">
                    <div class="label">{{ slide.label }}</div>
                    <h2>{{ slide.title }}</h2>
                    <p>{{ slide.description }}</p>
                    <a href="#"><span>Watch Now</span> <i class="fa fa-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        <div class="swiper-button-prev custom-nav"></div>
        <div class="swiper-button-next custom-nav"></div>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

const slides = [
  {
    label: 'Adventure',
    title: 'Fate / Stay Night: Unlimited Blade Works',
    description: 'After 30 days of travel across the world...',
    image: '/img/template-zelda.jpg'
  },
  {
    label: 'Adventure',
    title: 'Fate / Stay Night: Unlimited Blade Works',
    description: 'After 30 days of travel across the world...',
    image: '/img/template-zelda.jpg'
  },
  {
    label: 'Adventure',
    title: 'Fate / Stay Night: Unlimited Blade Works',
    description: 'After 30 days of travel across the world...',
    image: '/img/template-zelda.jpg'
  }
]
</script>

<style scoped>
.custom-nav {
  width: 50px;
  height: 50px;
  background-color: #1f1c2c;
  border: 5px solid #2e2643;
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%) rotate(45deg);
}

.swiper-button-prev {
  left: 20px;
}

.swiper-button-next {
  right: 20px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 16px;
  color: white;
  transform: rotate(-45deg);
}

.hero__items {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 550px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  overflow: hidden;
  border-radius: 10px;
}

.hero__overlay {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.85), transparent 50%);
  z-index: 1;
}

.hero__text {
  position: relative;
  z-index: 10;
  color: #fff;
  max-width: 500px;
  padding: 20px 0;
}

.hero__text .label {
  display: inline-block;
  background: white;
  color: #111;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  margin-bottom: 15px;
  border-radius: 3px;
}

.hero__text h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.8);
}

.hero__text p {
  font-size: 15px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

.hero__text a {
  display: inline-block;
  color: #fff;
  background: #111;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
}

section {
  background-color: #362849;
}
</style>
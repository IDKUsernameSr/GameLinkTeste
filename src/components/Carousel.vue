<template>
  <section class="hero">
    <div class="container">
      <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      loop
      class="hero__slider"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="hero__items set-bg" :style="{ backgroundImage: 'url(' + slide.image + ')' }">
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
    image: '/img/hero/hero-1.jpg'
  },
  {
    label: 'Adventure',
    title: 'Fate / Stay Night: Unlimited Blade Works',
    description: 'After 30 days of travel across the world...',
    image: '/img/hero/hero-1.jpg'
  },
  {
    label: 'Adventure',
    title: 'Fate / Stay Night: Unlimited Blade Works',
    description: 'After 30 days of travel across the world...',
    image: '/img/hero/hero-1.jpg'
  }
]
</script>

<style scoped>
.custom-nav {
  width: 40px;
  height: 40px;
  background-color: #1f1c2c;
  border: 4px solid #2e2643;
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 18px;
  color: white;
  transform: rotate(-45deg);
}
</style>
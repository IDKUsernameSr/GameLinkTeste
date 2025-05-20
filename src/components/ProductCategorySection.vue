<template>
    <div class="product__section">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8">
          <div class="section-title">
            <h4>{{ title }}</h4>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4">
          <div class="btn__all">
            <a href="#" class="primary-btn">Ver Tudo <span class="arrow_right"></span></a>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-lg-4 col-md-6 col-sm-6"
        >
          <div class="product__item">
            <div
              class="product__item__pic"
              :style="{ backgroundImage: `url(${imgBasePath + item.image})` }"
            ></div>
            <div class="product__item__text">
              <ul>
                <li v-for="(tag, i) in item.tags" :key="i">{{ tag }}</li>
              </ul>
              <h5><a href="#">{{ item.title }}</a></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    items: Array,
    imgBasePath: String
  })
  </script>
  
  <style scoped>
  .product__item__pic {
    background-size: cover;
    background-position: center;
    height: 300px;
  }
  </style>  
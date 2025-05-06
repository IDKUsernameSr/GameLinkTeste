<template>
    <div class="row mb-5">
      <div class="col-lg-12">
        <div class="section-title">
          <h4>{{ title }}</h4>
        </div>
        <div class="row">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="col-lg-2 col-md-4 col-sm-4 mix"
          >
            <div class="product__item">
              <div
                class="product__item__pic set-bg"
                :style="{ backgroundImage: 'url(' + product.image + ')' }"
              >
                <div class="ep">18 / 18</div>
                <div class="comment"><i class="fa fa-comments"></i> 11</div>
                <div class="view"><i class="fa fa-eye"></i> 9141</div>
              </div>
              <div class="product__item__text">
                <h5><a href="#">{{ product.title }}</a></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    products: Array
  })
  </script>
  
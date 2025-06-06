<template>
    <div class="product__section container">
      <div class="row align-items-center mb-4">
        <div class="col-md-6 col-sm-8">
          <div class="section-title">
            <h4>{{ sectionTitle }}</h4>
          </div>
        </div>
        <div class="col-md-6 col-sm-4 text-end">
          <div class="btn__all">
            <a href="#" class="primary-btn">Ver Tudo <span class="arrow_right"></span></a>
          </div>
        </div>
      </div>
  
      <div class="row g-4">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="col-lg-4 col-md-6 col-sm-12"
        >
          <div class="product__item">
            <div
              class="product__item__pic"
              :style="{ backgroundImage: `url(${getFullImageUrl(product.image)})` }"
            ></div>
            <div class="product__item__text">
              <!-- <ul>
                <li v-for="(tag, i) in product.tags" :key="i">{{ tag }}</li>
              </ul> -->
              <h5><a href="#">{{ product.title }}</a></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { watchEffect } from 'vue';
      
  const imgBasePath = 'https:';

  
const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  sectionTitle: {
    type: String,
    default: ''
  }
});

const { products } = props;

function getFullImageUrl(path) {
  if (!path || typeof path !== 'string') return 'https://via.placeholder.com/300x400?text=No+Image';

  if (path.startsWith('//')) {
    return 'https:' + path.replace('t_thumb', 't_cover_big');
  }

  if (path.startsWith('/')) {
    return 'https://images.igdb.com' + path.replace('t_thumb', 't_cover_big');
  }

  return path;
}

  watchEffect(() => {
  console.log("📦 Recebido products:", props.products);
  console.log("image URL:", products.image || '(no image)');
  });

  console.log("product.image = ", products.image);
  </script>
  
  <style scoped>
.product__item__pic {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
  width: 100%;
  border-radius: 12px;
}
  </style>  
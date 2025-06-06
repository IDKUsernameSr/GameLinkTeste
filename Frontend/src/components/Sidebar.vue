<template>
  <div class="product__sidebar">
    <!-- MAIS POPULARES -->
    <div class="product__sidebar__view">
      <div class="section-title">
        <h5>Mais populares</h5>
      </div>
      <ul class="filter__controls">
        <li class="active" @click="activeFilter = '*'">Dia</li>
        <li @click="activeFilter = 'week'">Semana</li>
        <li @click="activeFilter = 'month'">Mês</li>
        <li @click="activeFilter = 'years'">Ano</li>
      </ul>
      <div class="filter__gallery">
        <div
          v-for="item in filteredPopular"
          :key="item.title"
          class="product__sidebar__view__item set-bg mix"
          :style="{ backgroundImage: `url(${item.image})` }"
        >
          <h5><a href="#">{{ item.title }}</a></h5>
        </div>
      </div>
    </div>

    <!-- OUTRAS OPÇÕES -->
    <div class="product__sidebar__comment">
      <div class="section-title">
        <h5>Outras Opções</h5>
      </div>
      <div
        class="product__sidebar__comment__item"
        v-for="item in other"
        :key="item.title"
      >
        <div class="product__sidebar__comment__item__pic">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="product__sidebar__comment__item__text">
          <ul>
            <li>Active</li>
            <li>Movie</li>
          </ul>
          <h5><a href="#">{{ item.title }}</a></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('*')

const popular = [
  { title: 'Boruto: Naruto next generations', image: '/img/sidebar/tv-1.jpg', categories: ['day', 'years'] },
  { title: 'The Seven Deadly Sins: Wrath of the Gods', image: '/img/sidebar/tv-2.jpg', categories: ['month', 'week'] },
  { title: 'Sword art online alicization war of underworld', image: '/img/sidebar/tv-3.jpg', categories: ['week', 'years'] },
  { title: 'Fate/stay night: Heaven\'s Feel I. presage flower', image: '/img/sidebar/tv-4.jpg', categories: ['years', 'month'] },
  { title: 'Fate stay night unlimited blade works', image: '/img/sidebar/tv-5.jpg', categories: ['day'] }
]

const other = [
  { title: 'The Seven Deadly Sins: Wrath of the Gods', image: '/img/sidebar/comment-1.jpg' },
  { title: 'Shirogane Tamashii hen Kouhan sen', image: '/img/sidebar/comment-2.jpg' },
  { title: 'Kizumonogatari III: Reiket su-hen', image: '/img/sidebar/comment-3.jpg' },
  { title: 'Monogatari Series: Second Season', image: '/img/sidebar/comment-4.jpg' }
]

const filteredPopular = computed(() => {
  if (activeFilter.value === '*') return popular
  return popular.filter(item => item.categories.includes(activeFilter.value))
})
</script>

<style scoped>
.product__sidebar__view__item {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 60px 15px 15px;
  border-radius: 8px;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}

.product__sidebar__view__item h5 {
  margin: 0;
  font-size: 0.95rem;
}

.filter__controls {
  list-style: none;
  padding: 0;
  margin: 10px 0 20px;
  display: flex;
  gap: 10px;
  font-size: 0.85rem;
  color: #ccc;
  cursor: pointer;
}

.filter__controls .active,
.filter__controls li:hover {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}

.product__sidebar__comment__item {
  display: flex;
  margin-bottom: 1rem;
}

.product__sidebar__comment__item__pic img {
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.product__sidebar__comment__item__text {
  margin-left: 10px;
}

.product__sidebar__comment__item__text ul {
  display: flex;
  gap: 8px;
  font-size: 0.7rem;
  padding: 0;
  margin: 0 0 5px;
  list-style: none;
  color: #aaa;
}

.product__sidebar__comment__item__text h5 {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.2;
}
</style>

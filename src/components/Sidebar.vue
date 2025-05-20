<template>
  <div class="col-lg-4 col-md-6 col-sm-8">
    <div class="product__sidebar">
      
      <!-- MAIS POPULARES -->
      <div class="product__sidebar__view">
        <div class="section-title">
          <h5>Mais populares</h5>
        </div>
        <ul class="filter__controls">
          <li class="active" data-filter="*">Dia</li>
          <li data-filter=".week">Semana</li>
          <li data-filter=".month">Mês</li>
          <li data-filter=".years">Ano</li>
        </ul>
        
        <div class="filter__gallery">
          <div
            v-for="(anime, index) in popular"
            :key="index"
            class="product__sidebar__view__item set-bg mix"
            :class="anime.categories"
            :style="{ backgroundImage: 'url(' + anime.image + ')' }"
          >
            <h5><a href="#">{{ anime.title }}</a></h5>
          </div>
        </div>
      </div>

      <!-- OUTRAS OPÇÕES -->
      <div class="product__sidebar__comment">
        <div class="section-title">
          <h5>Outras Opções</h5>
        </div>

        <div
          v-for="(alt, index) in other"
          :key="index"
          class="product__sidebar__comment__item"
        >
          <div class="product__sidebar__comment__item__pic">
            <img :src="alt.image" alt="anime" />
          </div>
          <div class="product__sidebar__comment__item__text">
            <ul>
              <li>Ação</li>
              <li>Movie</li>
            </ul>
            <h5><a href="#">{{ alt.title }}</a></h5>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const popular = [
  { title: 'Boruto: Naruto next generations', image: '/img/sidebar/tv-1.jpg', categories: 'day years' },
  { title: 'The Seven Deadly Sins: Wrath of the Gods', image: '/img/sidebar/tv-2.jpg', categories: 'month week' },
  { title: 'Sword art online alicization war of underworld', image: '/img/sidebar/tv-3.jpg', categories: 'week years' },
  { title: 'Fate/stay night: Heaven\'s Feel I. presage flower', image: '/img/sidebar/tv-4.jpg', categories: 'years month' },
  { title: 'Fate stay night unlimited blade works', image: '/img/sidebar/tv-5.jpg', categories: 'day' }
]

const other = [
  { title: 'The Seven Deadly Sins: Wrath of the Gods', image: '/img/sidebar/comment-1.jpg' },
  { title: 'Shirogane Tamashii hen Kouhan sen', image: '/img/sidebar/comment-2.jpg' },
  { title: 'Kizumonogatari III: Reiket su-hen', image: '/img/sidebar/comment-3.jpg' },
  { title: 'Monogatari Series: Second Season', image: '/img/sidebar/comment-4.jpg' }
]
</script>

<template>
    <div class="col-lg-12">
    <ProductCategorySection
      :products="products"
      :sectionTitle="sectionTitle"
    />
    </div>
  </template>
  
  <script setup>
   import { watchEffect } from 'vue';

  import ProductCategorySection from './ProductCategorySection.vue'

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
  
  // const sections = [
  //   {
  //     title: 'Ação',
  //     imgBasePath: '/img/trending/',
  //     items: [
  //       { title: 'The Seven Deadly Sins: Wrath of the Gods', image: 'trend-1.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien', image: 'trend-2.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Shingeki no Kyojin Season 3 Part 2', image: 'trend-3.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Fullmetal Alchemist: Brotherhood', image: 'trend-4.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Shiratorizawa Gakuen Koukou', image: 'trend-5.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Code Geass: Hangyaku no Lelouch R2', image: 'trend-6.jpg', tags: ['Active', 'Movie'] }
  //     ]
  //   },
  //   {
  //     title: 'Romance',
  //     imgBasePath: '/img/popular/',
  //     items: [
  //       { title: 'Sen to Chihiro no Kamikakushi', image: 'popular-1.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Kizumonogatari III: Reiket su-hen', image: 'popular-2.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Shirogane Tamashii hen Kouhan sen', image: 'popular-3.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Rurouni Kenshin: Meiji Kenkaku Romantan', image: 'popular-4.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Mushishi Zoku Shou 2nd Season', image: 'popular-5.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Monogatari Series: Second Season', image: 'popular-6.jpg', tags: ['Active', 'Movie'] }
  //     ]
  //   },
  //   {
  //     title: 'Terror',
  //     imgBasePath: '/img/recent/',
  //     items: [
  //       { title: 'Great Teacher Onizuka', image: 'recent-1.jpg', tags: ['Active', 'Movie'] },
  //       { title: "Fate/stay night Movie: Heaven's Feel - II. Lost", image: 'recent-2.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Mushishi Zoku Shou: Suzu no Shizuku', image: 'recent-3.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Fate/Zero 2nd Season', image: 'recent-4.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Kizumonogatari II: Nekket su-hen', image: 'recent-5.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'The Seven Deadly Sins: Wrath of the Gods', image: 'recent-6.jpg', tags: ['Active', 'Movie'] }
  //     ]
  //   },
  //   {
  //     title: 'Live Action',
  //     imgBasePath: '/img/live/',
  //     items: [
  //       { title: 'Shouwa Genroku Rakugo Shinjuu', image: 'live-1.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Mushishi Zoku Shou 2nd Season', image: 'live-2.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Mushishi Zoku Shou: Suzu no Shizuku', image: 'live-3.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'The Seven Deadly Sins: Wrath of the Gods', image: 'live-4.jpg', tags: ['Active', 'Movie'] },
  //       { title: "Fate/stay night Movie: Heaven's Feel - II. Lost", image: 'live-5.jpg', tags: ['Active', 'Movie'] },
  //       { title: 'Kizumonogatari II: Nekketsu-hen', image: 'live-6.jpg', tags: ['Active', 'Movie'] }
  //     ]
  //   }
  // ]
  </script>
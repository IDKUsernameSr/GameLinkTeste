<template>
    <div>
    <Navbar />
    <!-- Hero Section Begin -->
    <Carousel />
    <!-- Hero Section End -->

    <!-- Product Section Begin -->
    <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8" style="border: 2px solid red;">
                    <CategorySection />
                </div>
                <div class="col-lg-4 col-md-12" style="border: 2px solid blue;">
                <Sidebar />
                </div>
            </div>
        </div>
    </section>
<!-- Product Section End -->

<Footer />
</div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Carousel from '../components/Carousel.vue'
import Sidebar from '../components/Sidebar.vue'
import CategorySection from '../components/CategorySection.vue'

const acaoProducts = [
  { title: 'The Seven Deadly Sins: Wrath of the Gods', image: '/img/trending/trend-1.jpg' },
  { title: 'Gintama Movie 2', image: '/img/trending/trend-2.jpg' },
  { title: 'Shingeki no Kyojin', image: '/img/trending/trend-3.jpg' },
  { title: 'Fullmetal Alchemist', image: '/img/trending/trend-4.jpg' },
  { title: 'Shiratorizawa Gakuen Koukou', image: '/img/trending/trend-5.jpg' },
  { title: 'Code Geass R2', image: '/img/trending/trend-6.jpg' }
]

const romanceProducts = [
  { title: 'Sen to Chihiro', image: '/img/popular/popular-1.jpg' },
  { title: 'Kizumonogatari III', image: '/img/popular/popular-2.jpg' },
  { title: 'Shirogane Tamashii', image: '/img/popular/popular-3.jpg' },
  { title: 'Rurouni Kenshin', image: '/img/popular/popular-4.jpg' },
  { title: 'Mushishi Zoku', image: '/img/popular/popular-5.jpg' },
  { title: 'Monogatari Series', image: '/img/popular/popular-6.jpg' }
]

const terrorProducts = [
  { title: 'GTO', image: '/img/recent/recent-1.jpg' },
  { title: 'Fate Lost Butterfly', image: '/img/recent/recent-2.jpg' },
  { title: 'Mushishi: Suzu no Shizuku', image: '/img/recent/recent-3.jpg' },
  { title: 'Fate Zero S2', image: '/img/recent/recent-4.jpg' },
  { title: 'Kizumonogatari II', image: '/img/recent/recent-5.jpg' },
  { title: 'Seven Deadly Sins', image: '/img/recent/recent-6.jpg' }
]

const liveActionProducts = [
  { title: 'Rakugo Shinjuu', image: '/img/live/live-1.jpg' },
  { title: 'Mushishi Zoku S2', image: '/img/live/live-2.jpg' },
  { title: 'Mushishi: Suzu', image: '/img/live/live-3.jpg' },
  { title: 'Seven Deadly Sins', image: '/img/live/live-4.jpg' },
  { title: 'Fate Heaven’s Feel', image: '/img/live/live-5.jpg' },
  { title: 'Kizumonogatari II', image: '/img/live/live-6.jpg' }
]
</script>

<style scoped>
.product.spad {
  background-color: #362849;
  padding: 50px 0; /* if your template uses it */
}
</style>
<template>
  <div id="app">
    <!-- Navigation -->
    <Navbar />

    <!-- Hero Carousel -->
    <Carousel />

    <!-- Product Categories -->
    <section class="product spad">
      <div class="container">
        <!-- Category Sections -->
        <CategorySection title="Ação" :products="acaoProducts" />
        <CategorySection title="Romance" :products="romanceProducts" />
        <CategorySection title="Terror" :products="terrorProducts" />
        <CategorySection title="Live Action" :products="liveActionProducts" />

        <!-- Sidebar -->
        <Sidebar />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>


<script setup>
import Navbar from './components/Navbar.vue'
import Player from './components/Player.vue'
import FilterGrid from './components/FilterGrid.vue'
import Carousel from './components/Carousel.vue'
import CategorySection from './components/CategorySection.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
</script>


<style scoped>
.container {
  max-width: 960px;
  margin: auto;
  padding: 1rem;
}
.section {
  margin-bottom: 2rem;
}
</style>

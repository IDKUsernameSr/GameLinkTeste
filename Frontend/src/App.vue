<template>
  <div id="app" class="page-wrapper">
    <Navbar v-if="showNavbar" />

    <main class="content">
      <router-view />
    </main>
    
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import Home from './views/Home.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Routes where you DON'T want navbar/footer
const hiddenRoutes = ['']

// If current route is NOT in hiddenRoutes, show the components
const showNavbar = computed(() => !hiddenRoutes.includes(route.path))
const showFooter = computed(() => !hiddenRoutes.includes(route.path))
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1; /* Makes this take all space between navbar and footer */
}
</style>

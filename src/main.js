// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'         // Bootstrap CSS
import 'vue-select/dist/vue-select.css'               // vue-select CSS
import 'swiper/swiper-bundle.css'                     // Swiper CSS

// If you're using global components (e.g., vue-select, swiper), import them here:
import vSelect from 'vue-select'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Create and mount the app
const app = createApp(App)
    .use(router)                // 👈 use the router
    .mount('#app')

// Global registration of components (optional, can be local in components too)
app.component('v-select', vSelect)
app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)

app.mount('#app')

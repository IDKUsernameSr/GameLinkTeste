import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'         // Bootstrap CSS
import 'vue-select/dist/vue-select.css'               // vue-select CSS
import 'swiper/swiper-bundle.css'                     // Swiper CSS
import '@fortawesome/fontawesome-free/css/all.min.css'

import './assets/css/bootstrap.min.css'
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
import './assets/css/nice-select.css'
import './assets/css/slicknav.min.css'
import './assets/css/style.css'               // the main one
import vSelect from 'vue-select'
import { Swiper, SwiperSlide } from 'swiper/vue'

// ✅ Create the app
const app = createApp(App)

// ✅ Register components BEFORE mounting
app.use(router)
app.component('v-select', vSelect)
app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)

// ✅ Then mount
app.mount('#app')
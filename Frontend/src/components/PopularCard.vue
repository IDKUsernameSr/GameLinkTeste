<!-- src/components/PopularCard.vue -->
<script setup>
defineProps({
  title: { type: String, required: true },
  coverUrl: { type: String, default: "" },
  to: { type: String, default: "#" } // link opcional
});
</script>

<template>
  <a :href="to" class="card" :aria-label="title">
    <img v-if="coverUrl" :src="coverUrl" :alt="title" class="img" />
    <div v-else class="img placeholder"></div>

    <!-- gradiente escuro de baixo pra cima -->
    <div class="overlay"></div>

    <!-- título sobre a imagem -->
    <div class="title">{{ title }}</div>
  </a>
</template>

<style scoped>
.card {
  position: relative;
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background: #2a2740;
  transition: transform .15s ease;
}
.card:hover { transform: translateY(-2px); }

.img {
  width: 100%;
  height: 120px;              /* ajuste a altura conforme sua UI */
  object-fit: cover;
  display: block;
}
.placeholder { background: linear-gradient(135deg,#3b3758,#2a2740); }

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,0) 60%);
  pointer-events: none;
}

.title {
  position: absolute;
  left: 12px; right: 12px; bottom: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0,0,0,.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;      /* corta em 2 linhas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
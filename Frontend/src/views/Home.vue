<template>
  <div>
    <!-- Hero Section Begin -->
    <Carousel />
    <!-- Hero Section End -->

    <!-- Product Section Begin -->
    <section class="product spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-8">
            <!-- Seções por categoria/gênero -->
            <CategorySection
              v-for="(games, genre) in gamesByGenre"
              :key="genre"
              :products="games"
              :sectionTitle="genre"
              :limit="12"
            />

            <!-- Estados -->
            <div v-if="isLoading" class="mt-4">Carregando categorias…</div>
            <div v-else-if="!isLoading && !Object.keys(gamesByGenre).length" class="mt-4">
              Nenhuma categoria encontrada.
            </div>
            <div v-if="error" class="mt-2 text-danger">{{ error }}</div>
          </div>

          <div class="col-lg-4 col-md-12">
            <!-- Sidebar: usa o mesmo layout de cards (list/card/img/title) -->
            <Sidebar :items="sidebarItems" :limit="6" initialWindow="day" />
          </div>
        </div>
      </div>
    </section>
    <!-- Product Section End -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Carousel from '../components/Carousel.vue'
import Sidebar from '../components/Sidebar.vue'
import CategorySection from '../components/CategorySection.vue'
import api from '../api'

const gamesByGenre = ref({}) // objeto: { "RPG": [...], "Aventura": [...], ... }
const isLoading = ref(false)
const error = ref('')

// ===== Helpers de imagem (fallback caso algum item venha sem coverUrl pronto) =====
function resolveCoverUrl(p, size = 'cover_big') {
  if (!p) return ''
  if (p.coverUrl) return p.coverUrl
  if (p.cover?.url) {
    const url = p.cover.url
    if (typeof url === 'string' && url.startsWith('//')) return `https:${url}`
    return url
  }
  if (p.cover?.image_id) return `https://images.igdb.com/igdb/image/upload/t_${size}/${p.cover.image_id}.jpg`
  if (p.artworks?.[0]?.image_id) return `https://images.igdb.com/igdb/image/upload/t_${size}/${p.artworks[0].image_id}.jpg`
  return ''
}

function normalizeBasic(g) {
  return {
    id: g.id ?? g.game?.id ?? g.slug ?? '',
    name: g.name ?? g.title ?? g.game?.name ?? 'Sem título',
    coverUrl: resolveCoverUrl(g),
    rating: g.rating ?? g.total_rating ?? 0,
    follows: g.follows ?? 0,
    hypes: g.hypes ?? 0,
  }
}

async function fetchHomeGames() {
  isLoading.value = true
  error.value = ''
  try {
    // Endpoint unificado por categorias populares
    const { data } = await api.get('/games/categories', {
      params: {
        window: 'day', // 'day' | 'week' | 'month' | 'year'
        limit: 30,     // total de jogos base para distribuir entre categorias
        per: 12        // máximo por categoria
      }
    })
    gamesByGenre.value = data || {}

    // Fallback: se backend retornar vazio por algum motivo, usa trending como categoria única
    if (!Object.keys(gamesByGenre.value).length) {
      const t = await api.get('/games/trending', { params: { limit: 60 } })
      const arr = Array.isArray(t.data) ? t.data : t.data?.results ?? []
      gamesByGenre.value = { Populares: arr }
    }
  } catch (e) {
    // fallback genérico para não quebrar a página
    try {
      const t = await api.get('/games/trending', { params: { limit: 60 } })
      const arr = Array.isArray(t.data) ? t.data : t.data?.results ?? []
      gamesByGenre.value = { Populares: arr }
    } catch (err) {
      error.value = 'Não foi possível carregar os jogos.'
      console.error(err)
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchHomeGames)

// ===== Sidebar: pega os TOP a partir das categorias carregadas =====
const sidebarItems = computed(() => {
  // achata todas as categorias em um array só
  const flat = Object.values(gamesByGenre.value).flat().map(normalizeBasic)
  // score simples para ranquear
  const scored = flat.map(g => ({
    ...g,
    _score: (g.rating || 0) * 2 + (g.hypes || 0) + (g.follows || 0) * 0.5,
  }))
  scored.sort((a, b) => b._score - a._score)
  return scored.slice(0, 12).map(({ id, name, coverUrl }) => ({ id, name, coverUrl }))
})
</script>

<style scoped>
.product.spad { padding-top: 2rem; padding-bottom: 2rem; }
.mt-4 { margin-top: 1rem; }
.mt-2 { margin-top: .5rem; }
.text-danger { color: #dc2626; }
</style>
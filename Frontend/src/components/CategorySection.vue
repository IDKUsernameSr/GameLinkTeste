<template>
  <section class="category-section">
    <h3 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h3>

    <!-- Lista no mesmo layout do Sidebar -->
    <div class="list">
      <a
        v-for="g in items"
        :key="g.id"
        class="card"
        :href="`/games/${g.id}`"
        :aria-label="g.name"
      >
        <img
          v-if="g.coverUrl"
          :src="g.coverUrl"
          :alt="g.name"
          class="img"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="img placeholder"></div>
        <div class="overlay"></div>
        <div class="title">{{ g.name }}</div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'CategorySection' })

const props = defineProps({
  /** Preferencial (novo): lista de jogos */
  products: { type: Array, default: () => [] },
  /** Legado: para compatibilidade com ProductCategorySection */
  items: { type: Array, default: () => [] },
  sectionTitle: { type: String, default: '' },
  limit: { type: Number, default: 12 },
  coverSize: { type: String, default: 'cover_big' },
})

function resolveCoverUrl(p) {
  if (!p) return ''
  if (p.coverUrl) return p.coverUrl
  if (p.cover?.url) {
    const url = p.cover.url
    if (typeof url === 'string' && url.startsWith('//')) return `https:${url}`
    return url
  }
  if (p.cover?.image_id) {
    return `https://images.igdb.com/igdb/image/upload/t_${props.coverSize}/${p.cover.image_id}.jpg`
  }
  if (p.artworks?.[0]?.image_id) {
    return `https://images.igdb.com/igdb/image/upload/t_${props.coverSize}/${p.artworks[0].image_id}.jpg`
  }
  return ''
}

// Usa products, senão items (legado)
const source = computed(() => (props.products?.length ? props.products : props.items) || [])

const items = computed(() =>
  source.value
    .slice(0, props.limit)
    .map(p => ({
      id: p.id ?? p.game?.id ?? p.slug ?? '',
      name: p.name ?? p.title ?? p.game?.name ?? 'Sem título',
      coverUrl: resolveCoverUrl(p),
    }))
    .filter(x => x.id)
)
</script>

<style scoped>
.category-section { margin-bottom: 1.5rem; }
.section-title { 
  font-size: 1.125rem; 
  font-weight: 600; 
  margin-bottom: .75rem; 
  color: #fff;
}

/* ====== Card list (igual Sidebar) ====== */
.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
@media (min-width: 1024px) { .list { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

.card {
  position: relative;
  display: block;
  border-radius: 0.75rem;
  overflow: hidden;
  text-decoration: none;
  isolation: isolate;
}

.img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  background: #111827;
}
.placeholder { background: repeating-linear-gradient(45deg, #1f2937 0 10px, #111827 10px 20px); }

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%);
  opacity: 0.9;
  transition: opacity 120ms ease-in-out;
}
.card:hover .overlay { opacity: 1; }

.title {
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.1;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
</style>

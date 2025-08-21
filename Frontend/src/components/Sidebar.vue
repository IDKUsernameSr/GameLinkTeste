<!-- src/components/SidebarPopular.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// props simples pra você customizar
const props = defineProps({
  title: { type: String, default: 'Mais populares' },
  limit: { type: Number,  default: 6 },
  initialWindow: { type: String, default: 'day' } // 'day' | 'week' | 'month' | 'year'
})

const tabs = [
  { key: 'day', label: 'Dia' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mês' },
  { key: 'year', label: 'Ano' }
]

const active = ref(props.initialWindow)
const cache = ref({ day: [], week: [], month: [], year: [] })
const loading = ref(false)
const error = ref(null)

async function fetchPopular(win) {
  if (cache.value[win]?.length) return
  loading.value = true; error.value = null
  try {
    const q = new URLSearchParams({ window: win, limit: String(props.limit) }).toString()
    const res = await fetch(`/api/igdb/popular?${q}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    cache.value[win] = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('[popular]', e)
    error.value = 'Falha ao carregar populares'
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchPopular(active.value))
watch(active, fetchPopular)

const items = computed(() => cache.value[active.value] || [])
</script>

<template>
  <aside class="popular">
    <div class="popular__header">
      <h5 class="popular__title">{{ title }}</h5>
      <ul class="popular__tabs">
        <li v-for="t in tabs" :key="t.key"
            :class="['tab', { active: active===t.key }]"
            @click="active=t.key">
          {{ t.label }}
        </li>
      </ul>
    </div>

    <div v-if="loading" class="hint">Carregando…</div>
    <div v-else-if="error" class="hint error">{{ error }}</div>
    <div v-else-if="!items.length" class="hint">Sem resultados</div>

    <div class="list">
      <a v-for="g in items" :key="g.id" class="card" :href="`/games/${g.id}`" :aria-label="g.name">
        <img v-if="g.coverUrl" :src="g.coverUrl" :alt="g.name" class="img" />
        <div v-else class="img placeholder"></div>
        <div class="overlay"></div>
        <div class="title">{{ g.name }}</div>
      </a>
    </div>
  </aside>
</template>

<style scoped>
.popular { display: block; }
.popular__header {
  display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;
}
.popular__title { font-size:16px; font-weight:700; letter-spacing:.2px; color:#fff;}
.popular__tabs { display:flex; gap:10px; list-style:none; padding:0; margin:0; }
.tab { font-size:12px; opacity:.7; cursor:pointer; color:#fff;}
.tab.active { opacity:1; font-weight:600; text-decoration:underline; }

.hint { font-size:12px; opacity:.7; margin:6px 0; }
.hint.error { color:#ff6b6b; }

.list { display:flex; flex-direction:column; gap:12px; }

.card {
  position:relative; display:block; border-radius:12px; overflow:hidden;
  background:#2a2740; transition:transform .15s ease;
}
.card:hover { transform: translateY(-2px); }

.img { width:100%; height:110px; object-fit:cover; display:block; }
.placeholder { background: linear-gradient(135deg,#3b3758,#2a2740); }

.overlay {
  position:absolute; inset:0;
  background: linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,0) 60%);
  pointer-events:none;
}

.title{
  position:absolute; left:12px; right:12px; bottom:10px; color:#fff;
  font-weight:600; font-size:13.5px; line-height:1.2; text-shadow:0 1px 2px rgba(0,0,0,.55);
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
</style>
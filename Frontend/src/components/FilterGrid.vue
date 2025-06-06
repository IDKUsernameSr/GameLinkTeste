<template>
    <div>
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'a'">Category A</button>
      <button @click="filter = 'b'">Category B</button>
  
      <div class="grid">
        <div v-for="item in filteredItems" :key="item.id">
          {{ item.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const filter = ref('all')
  const items = ref([
    { id: 1, name: 'Item 1', category: 'a' },
    { id: 2, name: 'Item 2', category: 'b' },
    { id: 3, name: 'Item 3', category: 'a' },
  ])
  
  const filteredItems = computed(() =>
    filter.value === 'all' ? items.value : items.value.filter(i => i.category === filter.value)
  )
  </script>
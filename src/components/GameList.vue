<template>
  <div>
    <h1>Jogos</h1>

    <!-- Campo de busca e botão -->
    <div style="margin-bottom: 20px;">
      <input
        v-model="searchQuery"
        placeholder="Digite o nome do jogo"
        @keyup.enter="buscarJogo"
        style="padding: 8px; font-size: 16px;"
      />
      <button @click="buscarJogo" style="padding: 8px 12px; margin-left: 8px; font-size: 16px;">
        Buscar
      </button>
    </div>

    <!-- Lista de jogos -->
    <ul>
      <li v-for="game in games" :key="game.id" style="margin-bottom: 20px;">
        <h2>{{ game.name }}</h2>
        <img :src="game.background_image" :alt="game.name" width="300" />
        <p>Gêneros: {{ game.genres.map(g => g.name).join(', ') }}</p>
        <p>Avaliação: {{ game.rating }} / 5</p>
      </li>
    </ul>

    <!-- Mensagem caso nenhum jogo encontrado -->
    <p v-if="games.length === 0">Nenhum jogo encontrado.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchGames, searchGamesByName } from '../services/rawgService';

const games = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  try {
    games.value = await fetchGames(10);
  } catch (error) {
    console.error(error.message);
  }
});

async function buscarJogo() {
  try {
    if (searchQuery.value.trim() === '') {
      games.value = await fetchGames(10);
    } else {
      games.value = await searchGamesByName(searchQuery.value);
    }
  } catch (error) {
    console.error(error.message);
  }
}
</script>

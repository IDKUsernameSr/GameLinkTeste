// src/services/rawgService.js
const API_KEY = 'dca71595e62a4e8f8f2d818dcd73b2f9';
const BASE_URL = 'https://api.rawg.io/api';

export async function fetchGames(pageSize = 100) {
  const url = `${BASE_URL}/games?key=${API_KEY}&page_size=${pageSize}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao buscar jogos');
  }
  const data = await res.json();
  return data.results;
}

export async function fetchGameDetails(id) {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao buscar detalhes do jogo');
  }
  const data = await res.json();
  return data;
}
export async function searchGamesByName(query) {
  const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao buscar jogos pelo nome');
  }
  const data = await res.json();
  return data.results;
}

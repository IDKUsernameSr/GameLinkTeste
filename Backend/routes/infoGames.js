const axios = require("axios");

const API_URL = "https://www.freetogame.com/api/game";

async function getGameById(req, res) {
  try {
    const { id } = req.params;

    // Faz a requisição na API FreeToGame
    const response = await axios.get(`${API_URL}?id=${id}`);
    const game = response.data;

    // Normaliza e adiciona preço fixo
    const normalized = {
      id: game.id,
      title: game.title,
      description: game.short_description, // pode trocar por game.description se preferir
      thumbnail: game.thumbnail,
      genre: game.genre,
      platform: game.platform,
      publisher: game.publisher,
      developer: game.developer,
      release_date: game.release_date,
      rating: game.rating ?? "N/A", // se não existir, devolve "N/A"
      price: 50.0, // preço fixo
    };

    res.json(normalized);
  } catch (error) {
    console.error("Erro ao buscar jogo:", error.message);
    res.status(500).json({ error: "Erro ao buscar informações do jogo" });
  }
}

module.exports = { getGameById };

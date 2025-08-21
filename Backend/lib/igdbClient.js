// lib/igdbClient.js
const axios = require('axios');

let accessToken = null;
let expireAt = 0; // epoch ms

async function fetchToken() {
  const url = 'https://id.twitch.tv/oauth2/token';
  const params = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials'
  };
  const { data } = await axios.post(url, null, { params });
  accessToken = data.access_token;
  // margem de segurança de 60s
  expireAt = Date.now() + (data.expires_in - 60) * 1000;
  return accessToken;
}

async function getToken() {
  if (!accessToken || Date.now() >= expireAt) {
    await fetchToken();
  }
  return accessToken;
}

async function igdbPost(endpoint, body) {
  const token = await getToken();
  const url = `https://api.igdb.com/v4/${endpoint}`;
  try {
    const { data } = await axios.post(url, body, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    return data;
  } catch (err) {
    // Se o token expirou/invalidou no meio do caminho, renove e tente 1x
    if (err.response && err.response.status === 401) {
      await fetchToken();
      const { data } = await axios.post(url, body, {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
      return data;
    }
    throw err;
  }
}

module.exports = { igdbPost };
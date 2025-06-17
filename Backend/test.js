const axios = require('axios');
const CLIENT_ID = '';
const CLIENT_SECRET = '';

async function getAccessToken() {
  const res = await axios.post(
    'https://id.twitch.tv/oauth2/token',
    new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'client_credentials' }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return res.data.access_token;
}

async function run() {
  const token = await getAccessToken();
  console.log('✅ Token acquired');

  // Step 1: Confirm popularity type ID is 8
  console.log('🎯 Using popularity_type = 8 (Total Reviews)');

  // Step 2: Fetch top 10 games by Steam Total Reviews
  try {
    const popRes = await axios.post(
    'https://api.igdb.com/v4/popularity_primitives',
    `
      fields game_id, value;
      where popularity_type = 8;
      sort value desc;
      limit 10;
    `,
    {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain'
      }
    }
  );
  console.log('Pop', popRes.data);
} catch (err) {
  console.error('POP ERROR:', err.response?.status, err.response?.data);
}
  const pops = popRes.data;
  console.log('🎲 Raw PopScore Data:', pops);

  const gameIds = pops.map(p => p.game).join(',');
  console.log('📦 Top Game IDs:', gameIds);

  // Step 3: Fetch game details
  const gameRes = await axios.post(
    'https://api.igdb.com/v4/games',
    `fields name,cover.url,genres; where id = (${gameIds});`,
    {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain'
      }
    }
  );
  const games = gameRes.data;
  console.log('🎮 Game Details:', games);
}

run().catch(console.error);
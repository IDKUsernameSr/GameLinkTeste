const axios = require('axios');
const CLIENT_ID = 'lten08kpze2f3ezelxkf1wj87t8ja3';
const CLIENT_SECRET = 'fjbua6ln4do4nk8ebmbfhfhvs4q5r6';

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
    console.log('🎲 PopScore Results:', popRes.data);

    const gameIds = popRes.data.map((p) => p.game_id).join(',');
    console.log('📦 Top Game IDs:', gameIds);

    // Now fetch game details
    const gameRes = await axios.post(
      'https://api.igdb.com/v4/games',
      `fields id,name,cover.url,genres; where id = (${gameIds});`,
      {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain'
        }
      }
    );
    console.log('🎮 Game Details:', gameRes.data);

  } catch (err) {
    console.error('❌ Error:', err.response?.status, err.response?.data);
  }

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
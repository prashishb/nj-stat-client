import axios from 'axios';

const API_BASE_URL = 'https://api.njstats.com';

export const fetchSongAlbumStats = async (artistId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify-song-album/${artistId}`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch song and album stats', err);
    throw err;
  }
};

export const fetchArtistStats = async (artistId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/spotify-artist/${artistId}`);
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch artist stats', err);
    throw err;
  }
};

export const fetchGlobalChart = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/spotify-chart`);
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch global chart', err);
    throw err;
  }
};

export const fetchHistoricalSpotifyArtistStats = async (artistId, statType) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify-artist/${artistId}/historical/${statType}`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch historical artist stats', err);
    throw err;
  }
};

// TODO: Korean Charts (Melon, Genie, Bugs, FLO)
// export const fetchMelonTop100 = async (date, hour) => {
//   try {
//     const res = await axios.get(
//       `https://xn--o39an51b2re.com/_next/data/z3sOeMMMeitfE45MutUG_/melon/chart/top100/${date}/${hour}.json?date=${date}&hour=${hour}`
//     );
//     return res.data;
//   } catch (err) {
//     console.error('Error: Failed to fetch melon top 100', err);
//     throw err;
//   }
// }

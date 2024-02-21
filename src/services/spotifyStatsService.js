import axios from 'axios';

const API_BASE_URL = 'https://api.njstats.com';

export const fetchSongAlbumStats = async (artistId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify/artist/${artistId}/tracks`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch song and album stats', err);
    throw err;
  }
};

export const fetchArtistIds = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/spotify/artist/ids`);
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch artist ids', err);
    throw err;
  }
};

export const fetchArtistStats = async (artistId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify/artist/${artistId}/stats`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch artist stats', err);
    throw err;
  }
};

export const fetchGlobalChart = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/spotify/charts/global/latest`);
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch global chart', err);
    throw err;
  }
};

export const fetchHistoricalSpotifyArtistStats = async (artistId, statType) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify/artist/${artistId}/stats/${statType}/historical`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch historical artist stats', err);
    throw err;
  }
};

export const fetchArtistPlaylistsData = async (artistId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify/artist/${artistId}/playlists`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch artist playlists data', err);
    throw err;
  }
};

export const fetchTrackPlaylistsData = async (trackId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify/track/${trackId}/playlists`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch playlist track playlists data', err);
    throw err;
  }
};

export const fetchArtistTrackAndReachData = async (artistId) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/spotify/artist/${artistId}/playlist/tracks-reach`
    );
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch artist track and reach data', err);
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

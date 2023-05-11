import axios from 'axios';

const API_BASE_URL = 'https://api.njstats.com';

export const fetchVideoStats = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/youtube-stats`);
    return res.data;
  } catch (err) {
    console.error('Error: Failed to fetch video stats', err);
    throw err;
  }
};

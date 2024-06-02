import { useState, useEffect } from 'react';
import { fetchArtistIds } from '../services/spotifyStatsService';

const useFetchArtistIds = () => {
  const [artistIds, setArtistIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ids = await fetchArtistIds();
        setArtistIds(ids);
      } catch (err) {
        console.error('Error fetching artist ids:', err);
      }
    };
    fetchData();
  }, []);

  return artistIds;
};

export default useFetchArtistIds;

import { useState, useEffect, useRef } from 'react';
import {
  fetchSongAlbumStats,
  fetchArtistStats,
} from '../services/spotifyStatsService';
import {
  getUpdatedAt,
  processTracks,
  processAlbums,
} from '../utils/spotifyStatsUtils';
import { getTimeUntilNextUpdate } from '../utils/helperUtils';

export const useSpotifyStats = () => {
  const [songAlbumStats, setSongAlbumStats] = useState([]);
  const [artistStats, setArtistStats] = useState({});
  const [displayMode, setDisplayMode] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const INTERVAL = useRef(getTimeUntilNextUpdate());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songAlbumData = await fetchSongAlbumStats();
        const artistData = await fetchArtistStats();
        setSongAlbumStats(songAlbumData);
        setArtistStats(artistData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, INTERVAL.current);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (songAlbumStats.length && Object.keys(artistStats).length) {
      setIsLoading(false);
    }
  }, [songAlbumStats, artistStats]);

  const updatedAt = getUpdatedAt(songAlbumStats);
  const tracks = processTracks(songAlbumStats);
  const albums = processAlbums(songAlbumStats);

  return {
    isLoading,
    displayMode,
    setDisplayMode,
    artistStats,
    tracks,
    albums,
    updatedAt,
  };
};

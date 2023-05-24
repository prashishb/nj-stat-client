import { useState, useEffect, useRef } from 'react';
import {
  // fetchSongAlbumStats,
  fetchArtistStats,
} from '../services/spotifyStatsService';
// import {
//   getUpdatedAt,
//   processTracks,
//   processAlbums,
// } from '../utils/spotifyStatsUtils';
import { getTimeUntilNextUpdate } from '../utils/helperUtils';

export const useSpotifyStats = (artistId, setIsLoadingArtist) => {
  // const [songAlbumStats, setSongAlbumStats] = useState([]);
  const [artistStats, setArtistStats] = useState({});
  const [displayMode, setDisplayMode] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const INTERVAL = useRef(getTimeUntilNextUpdate());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingArtist(true);
        // const songAlbumData = await fetchSongAlbumStats(artistId);
        const artistData = await fetchArtistStats(artistId);
        // setSongAlbumStats(songAlbumData);
        setArtistStats(artistData);
        setIsLoadingArtist(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setIsLoadingArtist(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, INTERVAL.current);
    return () => clearInterval(interval);
  }, [artistId, setIsLoadingArtist]);

  // useEffect(() => {
  //   if (songAlbumStats.length && Object.keys(artistStats).length) {
  //     setIsLoading(false);
  //   }
  // }, [songAlbumStats, artistStats]);
  useEffect(() => {
    if (Object.keys(artistStats).length) {
      setIsLoading(false);
    }
  }, [artistStats]);

  // const updatedAt = getUpdatedAt(songAlbumStats);
  // const tracks = processTracks(songAlbumStats);
  // const albums = processAlbums(songAlbumStats);

  return {
    isLoading,
    displayMode,
    setDisplayMode,
    artistStats,
    // tracks,
    // albums,
    // updatedAt,
  };
};

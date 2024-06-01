import { useState, useEffect, useRef } from 'react';
import {
  fetchSongAlbumStats,
  fetchArtistStats,
  fetchArtistTrackAndReachData,
} from '../services/spotifyStatsService';
import {
  getUpdatedAt,
  processTracks,
  processAlbums,
} from '../utils/spotifyStatsUtils';
import { getTimeUntilNextUpdate } from '../utils/helperUtils';

export const useSpotifyStats = (artistId) => {
  const [data, setData] = useState({
    songAlbumStats: [],
    artistStats: {},
    artistTracksReach: [],
    isLoading: true,
    displayMode: 'all',
  });

  const INTERVAL = useRef(getTimeUntilNextUpdate());

  useEffect(() => {
    if (!artistId) return;

    const fetchData = async () => {
      try {
        const [songAlbumData, artistData, artistTrackAndReachData] =
          await Promise.all([
            fetchSongAlbumStats(artistId),
            fetchArtistStats(artistId),
            fetchArtistTrackAndReachData(artistId),
          ]);
        setData({
          songAlbumStats: songAlbumData,
          artistStats: artistData,
          artistTracksReach: artistTrackAndReachData,
          isLoading: false,
          displayMode: data.displayMode,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setData((prevData) => ({ ...prevData, isLoading: false }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, INTERVAL.current);
    return () => clearInterval(interval);
  }, [artistId]);

  const updatedAt = getUpdatedAt(data.songAlbumStats);
  const tracks = processTracks(data.songAlbumStats);
  const albums = processAlbums(data.songAlbumStats);

  return {
    isLoading: data.isLoading,
    displayMode: data.displayMode,
    setDisplayMode: (mode) =>
      setData((prevData) => ({ ...prevData, displayMode: mode })),
    artistStats: data.artistStats,
    tracks,
    albums,
    artistTracksReach: data.artistTracksReach,
    updatedAt,
  };
};

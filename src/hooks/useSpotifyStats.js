// import { useState, useEffect } from 'react';
// import {
//   fetchSongAlbumStats,
//   fetchArtistStats,
// } from '../services/spotifyStatsService';
// import {
//   getUpdatedAt,
//   processTracks,
//   processAlbums,
// } from '../utils/spotifyStatsUtils';

// export const useSpotifyStats = () => {
//   const [songAlbumStats, setSongAlbumStats] = useState([]);
//   const [artistStats, setArtistStats] = useState({});
//   const [displayMode, setDisplayMode] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const songAlbumData = await fetchSongAlbumStats();
//         console.log('songAlbumData', songAlbumData);
//         const artistData = await fetchArtistStats();
//         setSongAlbumStats(songAlbumData);
//         setArtistStats(artistData);
//         setIsLoading(false);
//         setIsDataFetched(true);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };
//     if (!isDataFetched) {
//       fetchData();
//     }
//   }, [isDataFetched]);

//   const updatedAt = getUpdatedAt(songAlbumStats);
//   const tracks = processTracks(songAlbumStats);
//   const albums = processAlbums(songAlbumStats);

//   return {
//     isLoading,
//     displayMode,
//     setDisplayMode,
//     artistStats,
//     tracks,
//     albums,
//     updatedAt,
//   };
// };

import { useState, useEffect } from 'react';
import {
  fetchSongAlbumStats,
  fetchArtistStats,
} from '../services/spotifyStatsService';
import {
  getUpdatedAt,
  processTracks,
  processAlbums,
} from '../utils/spotifyStatsUtils';

export const useSpotifyStats = () => {
  const [songAlbumStats, setSongAlbumStats] = useState([]);
  const [artistStats, setArtistStats] = useState({});
  const [displayMode, setDisplayMode] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  // const [isDataFetched, setIsDataFetched] = useState(false);

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
  }, []);

  useEffect(() => {
    if (songAlbumStats.length && Object.keys(artistStats).length) {
      setIsLoading(false);
      // setIsDataFetched(true);
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

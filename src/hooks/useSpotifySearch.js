import { useState, useEffect } from 'react';
import spotifyApi from '../services/spotifyAuthService';

const useSpotifySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      try {
        const results = await Promise.all([
          spotifyApi.searchTracks(searchQuery, { limit: 7 }),
          spotifyApi.searchAlbums(searchQuery, { limit: 7 }),
        ]);

        const tracks = results[0].tracks.items;
        const albums = results[1].albums.items;

        // Score results based on relevance (e.g., using popularity as a metric)
        const scoredTracks = tracks.map((track) => ({
          ...track,
          score: track.popularity,
          type: 'track',
        }));

        const scoredAlbums = albums.map((album) => ({
          ...album,
          score: album.popularity,
          type: 'album',
        }));

        // Merge and sort by score
        const mergedResults = [...scoredTracks, ...scoredAlbums].sort(
          (a, b) => b.score - a.score
        );

        // Prioritize albums if the search query includes the string "album"
        if (searchQuery.toLowerCase().includes('album')) {
          mergedResults.sort((a, b) => {
            if (a.type === 'album' && b.type !== 'album') {
              return -1;
            } else if (a.type !== 'album' && b.type === 'album') {
              return 1;
            } else {
              return b.score - a.score;
            }
          });
        } else {
          mergedResults.sort((a, b) => b.score - a.score);
        }

        setSearchResults(mergedResults);
      } catch (error) {
        console.error('Error searching Spotify:', error);
      }
    };

    const timer = setTimeout(() => {
      search();
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  };
};

export default useSpotifySearch;

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
        const queryIncludesAlbum = searchQuery.toLowerCase().includes('album');
        const queryIncludesPlaylist = searchQuery
          .toLowerCase()
          .includes('playlist');

        // Remove 'album' and 'playlist' from the query sent to Spotify
        const cleanedQuery = searchQuery.replace(/album|playlist/gi, '').trim();

        let tracks = [];
        let albums = [];
        let playlists = [];

        if (queryIncludesAlbum) {
          const albumResults = await spotifyApi.searchAlbums(cleanedQuery, {
            limit: 7,
          });
          albums = albumResults.albums.items;
        } else if (queryIncludesPlaylist) {
          const playlistResults = await spotifyApi.searchPlaylists(
            cleanedQuery,
            { limit: 7 }
          );
          playlists = playlistResults.playlists.items;
        } else {
          const [trackResults, albumResults, playlistResults] =
            await Promise.all([
              spotifyApi.searchTracks(cleanedQuery, { limit: 7 }),
              spotifyApi.searchAlbums(cleanedQuery, { limit: 7 }),
              spotifyApi.searchPlaylists(cleanedQuery, { limit: 7 }),
            ]);
          tracks = trackResults.tracks.items;
          albums = albumResults.albums.items;
          playlists = playlistResults.playlists.items;
        }

        // Scoring results
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

        const preparedPlaylists = playlists.map((playlist) => ({
          ...playlist,
          type: 'playlist',
        }));

        // Merge and sort by score
        const mergedResults = [
          ...scoredTracks,
          ...scoredAlbums,
          ...preparedPlaylists,
        ].sort((a, b) => b.score - a.score);

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

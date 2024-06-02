import { useState, useEffect } from 'react';
import { useSpotifyStats } from './useSpotifyStats';

const useArtistNavigation = (spotifyArtistIds) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (spotifyArtistIds.length > 0) {
      setCurrentIndex(0);
    }
  }, [spotifyArtistIds]);

  const artistId = spotifyArtistIds[currentIndex];
  const {
    isLoading,
    displayMode,
    setDisplayMode,
    artistStats,
    tracks,
    albums,
    artistTracksReach,
    updatedAt,
  } = useSpotifyStats(artistId);

  const goNextArtist = () => {
    if (currentIndex < spotifyArtistIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPreviousArtist = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    currentIndex,
    artistId,
    artistStats,
    tracks,
    albums,
    artistTracksReach,
    updatedAt,
    isLoading,
    displayMode,
    setDisplayMode,
    goNextArtist,
    goPreviousArtist,
  };
};

export default useArtistNavigation;

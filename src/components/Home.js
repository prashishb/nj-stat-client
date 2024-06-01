import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import { useSpotifyStats } from '../hooks/useSpotifyStats';
import Spinner from './Spinner';
import SpotifyStreamStats from './SpotifyStreamStats';

const Home = ({ spotifyArtistIds }) => {
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

  if (isLoading || !artistId) return <Spinner />;

  return (
    <div className='body-container p-2'>
      <div className='container mb-2 artist-container pb-0 border bg-light-subtle bg-opacity-10'>
        {Object.keys(artistStats).length > 0 && (
          <ArtistCard
            artist={artistStats}
            goNextArtist={goNextArtist}
            goPreviousArtist={goPreviousArtist}
            currentIndex={currentIndex}
            artistCount={spotifyArtistIds.length}
          />
        )}
      </div>
      <SpotifyStreamStats
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        tracks={tracks}
        groupedTracksByAlbum={albums}
        artistTracksReach={artistTracksReach}
        updatedAt={updatedAt}
      />
    </div>
  );
};

export default Home;

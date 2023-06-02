import React, { useState } from 'react';
import ArtistCard from './ArtistCard';
import { useSpotifyStats } from '../hooks/useSpotifyStats';
import Spinner from './Spinner';
import SpotifyStreamStats from './SpotifyStreamStats';

const artistIds = ['6HvZYsbFfjnjFrWF950C9d', '3BNhPTiKBExlE45mYeC9YY'];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingArtist, setIsLoadingArtist] = useState(false);

  const {
    isLoading,
    displayMode,
    setDisplayMode,
    artistStats,
    tracks,
    albums,
    updatedAt,
  } = useSpotifyStats(artistIds[currentIndex], setIsLoadingArtist);

  const goNextArtist = () => {
    if (currentIndex < artistIds.length - 1) {
      setIsLoadingArtist(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPreviousArtist = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className='body-container p-2'>
      <div className='container mb-2 artist-container pb-0 border bg-light-subtle bg-opacity-10'>
        {Object.keys(artistStats).length > 0 && (
          <ArtistCard
            artist={artistStats}
            goNextArtist={goNextArtist}
            goPreviousArtist={goPreviousArtist}
            currentIndex={currentIndex}
            artistCount={artistIds.length}
            isLoadingArtist={isLoadingArtist}
          />
        )}
      </div>
      <SpotifyStreamStats
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        tracks={tracks}
        groupedTracksByAlbum={albums}
        updatedAt={updatedAt}
      />
    </div>
  );
};

export default Home;

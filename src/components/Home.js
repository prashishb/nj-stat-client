import React from 'react';
import ArtistCard from './ArtistCard';
import Spinner from './Spinner';
import SpotifyStreamStats from './SpotifyStreamStats';
import useArtistNavigation from '../hooks/useArtistNavigation';

const Home = ({ spotifyArtistIds }) => {
  const {
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
  } = useArtistNavigation(spotifyArtistIds);

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

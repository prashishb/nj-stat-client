import React from 'react';
import ArtistCard from './ArtistCard';
import ContentContainer from './ContentContainer';
import { useSpotifyStats } from '../hooks/useSpotifyStats';
import Spinner from './Spinner';

const artistId = '6HvZYsbFfjnjFrWF950C9d';

const Home = () => {
  const {
    isLoading,
    displayMode,
    setDisplayMode,
    artistStats,
    tracks,
    albums,
    updatedAt,
  } = useSpotifyStats(artistId);

  if (isLoading) return <Spinner />;
  return (
    <div className='body-container mt-2 p-2'>
      <div className='container mb-2 artist-container pb-0 border bg-light-subtle bg-opacity-10'>
        {Object.keys(artistStats).length > 0 && (
          <ArtistCard artist={artistStats} />
        )}
      </div>
      <ContentContainer
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

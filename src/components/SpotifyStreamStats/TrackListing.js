import React from 'react';
import SongAlbumCard from './SongAlbumCard';

const TrackListing = ({ tracks, handleScreenshot, trackContainerRef }) => {
  return (
    <SongAlbumCard
      id='tracks'
      title='All Discography'
      tracks={tracks}
      handleScreenshot={handleScreenshot}
      ref={trackContainerRef}
    />
  );
};

export default TrackListing;

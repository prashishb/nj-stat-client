import React from 'react';
import TrackReachCard from './TrackReachCard';

const TrackReachListing = ({
  tracks,
  handleScreenshot,
  trackReachContainerRef,
}) => {
  return (
    <TrackReachCard
      id='tracks-reach'
      title='Playlist Reach'
      tracks={tracks}
      handleScreenshot={handleScreenshot}
      ref={trackReachContainerRef}
    />
  );
};

export default TrackReachListing;

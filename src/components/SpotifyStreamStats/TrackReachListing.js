import React from 'react';
import TrachReachCard from './TrackReachCard';

const TrackReachListing = ({
  tracks,
  handleScreenshot,
  trackReachContainerRef,
}) => {
  return (
    <TrachReachCard
      id='tracks-reach'
      title='Playlist Reach by Track'
      tracks={tracks}
      handleScreenshot={handleScreenshot}
      ref={trackReachContainerRef}
    />
  );
};

export default TrackReachListing;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { sortTracks, sorteTracksByAlbum } from '../../utils/spotifyStatsUtils';
import { formatDate } from '../../utils/valueFormatter';
import handleScreenshot from '../../utils/handleScreenshot';

import DisplayModeToggle from '../DisplayModeToggle';
import FilterOptions from './FilterOptions';
import TrackListing from './TrackListing';
import AlbumListing from './AlbumListing';
import TrackReachListing from './TrackReachListing';

const Index = ({
  displayMode,
  setDisplayMode,
  tracks,
  groupedTracksByAlbum,
  artistTracksReach,
  updatedAt,
}) => {
  const [filterOption, setFilterOption] = useState('Daily');

  // Initialize useRef for track and album containers
  const trackContainerRef = useRef(null);
  const albumContainerRefs = useRef([]);
  const trackReachContainerRef = useRef(null);

  const handleScreenshotEvent = (event) => {
    handleScreenshot(
      event,
      albumContainerRefs,
      trackContainerRef,
      trackReachContainerRef,
      updatedAt
    );
  };

  const sortedTracks = useMemo(
    () => sortTracks(tracks, filterOption),
    [tracks, filterOption]
  );

  const sortedAlbums = useMemo(
    () => sorteTracksByAlbum(groupedTracksByAlbum, filterOption),
    [groupedTracksByAlbum, filterOption]
  );

  // count the albums with more than 1 track
  const albumsWithMoreThanOneTrack = useMemo(
    () => groupedTracksByAlbum.filter((album) => album.tracks.length > 1),
    [groupedTracksByAlbum]
  );
  const hasMultipleAlbums = albumsWithMoreThanOneTrack.length > 1;
  const hasMultipleTracks = tracks.length > 1;

  useEffect(() => {
    if (!hasMultipleAlbums && displayMode === 'albums') {
      setDisplayMode('all');
    }
  }, [hasMultipleAlbums, displayMode, setDisplayMode]);

  return (
    <div className='content-container'>
      <div className='container'>
        <div className='row mb-2'>
          <div className='col-12 col-md-6 d-flex justify-content-start p-0'>
            <DisplayModeToggle
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
              hasMultipleAlbums={hasMultipleAlbums}
              hasMultipleTracks={hasMultipleTracks}
            />
          </div>
          <div className='col-12 col-md-6 d-flex justify-content-end p-0'>
            <FilterOptions
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              displayMode={displayMode}
              hasMultipleTracks={hasMultipleTracks}
            />
          </div>
        </div>
      </div>
      {displayMode === 'all' ? (
        <TrackListing
          tracks={sortedTracks}
          handleScreenshot={handleScreenshotEvent}
          trackContainerRef={trackContainerRef}
        />
      ) : displayMode === 'albums' ? (
        <AlbumListing
          albums={sortedAlbums}
          handleScreenshot={handleScreenshotEvent}
          albumContainerRefs={albumContainerRefs}
        />
      ) : (
        <TrackReachListing
          tracks={artistTracksReach}
          handleScreenshot={handleScreenshotEvent}
          trackReachContainerRef={trackReachContainerRef}
        />
      )}
      <div className='col d-flex justify-content-center p-0 align-items-center mobile-hidden'>
        {updatedAt && (
          <small className='fw-bold'>
            Last Updated: {formatDate(updatedAt)}
          </small>
        )}
      </div>
    </div>
  );
};

export default Index;

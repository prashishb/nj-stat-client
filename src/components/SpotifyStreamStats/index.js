import React, { useState, useEffect, useRef, useMemo } from 'react';
import { sortTracks, sorteTracksByAlbum } from '../../utils/spotifyStatsUtils';
import { formatDate } from '../../utils/valueFormatter';
import handleScreenshot from '../../utils/handleScreenshot';

import DisplayModeToggle from '../DisplayModeToggle';
import FilterOptions from './FilterOptions';
import TrackListing from './TrackListing';
import AlbumListing from './AlbumListing';

const Index = ({
  displayMode,
  setDisplayMode,
  tracks,
  updatedAt,
  groupedTracksByAlbum,
}) => {
  const [filterOption, setFilterOption] = useState('Daily');

  // Initialize useRef for track and album containers
  const trackContainerRef = useRef(null);
  const albumContainerRefs = useRef([]);

  const handleScreenshotEvent = (event) => {
    handleScreenshot(event, albumContainerRefs, trackContainerRef, updatedAt);
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
          {hasMultipleTracks && (
            <>
              {hasMultipleAlbums && (
                <div className='col d-flex justify-content-start p-0'>
                  <DisplayModeToggle
                    displayMode={displayMode}
                    setDisplayMode={setDisplayMode}
                  />
                </div>
              )}
              <div className='col d-flex justify-content-end p-0'>
                <FilterOptions
                  filterOption={filterOption}
                  setFilterOption={setFilterOption}
                />
              </div>
            </>
          )}
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
        <div className='container text-center'>WORK IN PROGRSS</div>
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

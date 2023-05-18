import React, { useState, useRef } from 'react';
import DisplayModeToggle from './DisplayModeToggle';
import { formatDate, formatDateNew } from '../utils/valueFormatter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faSort } from '@fortawesome/free-solid-svg-icons';
import { RiScreenshot2Fill } from 'react-icons/ri';
import { FaShareSquare } from 'react-icons/fa';
import SongAlbumCard from './SongAlbumCard';

import { createFileName } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import { isMobile } from 'react-device-detect';

const ContentContainer = ({
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

  const handleScreenshot = (event) => {
    const index = event.currentTarget.getAttribute('data-album-index');
    const ref =
      index !== null
        ? albumContainerRefs.current[index]
        : trackContainerRef.current;
    if (!ref) return;
    html2canvas(ref, {
      allowTaint: false,
      useCORS: true,
      height: ref.offsetHeight - 7,
      padding: 2,
      ignoreElements: (element) => element.id === 'screenshot-share-icon',
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (isMobile && navigator.share) {
          // Web Share API is supported and device is mobile
          const file = new File(
            [blob],
            createFileName(`spotify_${ref.id}_${formatDateNew(updatedAt)}.png`),
            { type: 'image/png' }
          );
          navigator
            .share({
              files: [file],
            })
            .catch((error) => console.log('Sharing failed', error));
        } else {
          // Fallback for desktop or browsers that don't support the Web Share API
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = createFileName(
            `spotify_${ref.id}_${formatDateNew(updatedAt)}`
          );
          link.click();
        }
      });
    });
  };

  const sortedTracks = () => {
    const sorted = [...tracks];
    if (filterOption === 'Daily') {
      sorted.sort((a, b) => b.dailyPlaycount - a.dailyPlaycount);
    } else {
      sorted.sort((a, b) => b.playcount - a.playcount);
    }
    return sorted;
  };

  const sortedGroupedTracksByAlbum = () => {
    const sorted = [...groupedTracksByAlbum];
    if (filterOption === 'Daily') {
      sorted.forEach((album) => {
        album.tracks.sort((a, b) => b.dailyPlaycount - a.dailyPlaycount);
      });
    } else {
      sorted.forEach((album) => {
        album.tracks.sort((a, b) => b.playcount - a.playcount);
      });
    }
    return sorted;
  };

  return (
    <div className='content-container'>
      {displayMode !== 'playlists' && (
        <div className='container'>
          <div className='row mb-2'>
            <div className='col d-flex justify-content-start p-0'>
              <DisplayModeToggle
                displayMode={displayMode}
                setDisplayMode={setDisplayMode}
              />
            </div>
            <div className='col d-flex justify-content-end p-0'>
              <div className='dropdown'>
                <button
                  className='btn btn-outline-green-moon dropdown-toggle'
                  type='button'
                  id='filterMenuButton'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <FontAwesomeIcon icon={faSort} /> Sort by: {filterOption}
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='filterMenuButton'
                  style={{ minWidth: '100%' }}
                >
                  <li>
                    <button
                      className='dropdown-item'
                      onClick={() => setFilterOption('Daily')}
                    >
                      Daily Streams
                    </button>
                  </li>
                  <li>
                    <button
                      className='dropdown-item'
                      onClick={() => setFilterOption('Total')}
                    >
                      Total Streams
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {displayMode === 'all' ? (
        <div
          id='tracks'
          className='container track-container p-1 bg-body rounded-0'
          ref={trackContainerRef}
        >
          <h2 className='mb-2'>All Discography</h2>
          <div className='d-flex gap-2 mb-2 pb-1 border-bottom justify-content-between'>
            <div className='total-playcount'>
              <span className='text-muted'>
                {tracks
                  .reduce(
                    (accumulator, track) => accumulator + track.playcount,
                    0
                  )
                  .toLocaleString()}
              </span>
              <div className='change-increase-totals d-inline-block ms-1'>
                <FontAwesomeIcon icon={faArrowUp} />{' '}
                {tracks
                  .reduce(
                    (accumulator, track) => accumulator + track.dailyPlaycount,
                    0
                  )
                  .toLocaleString()}
              </div>
            </div>
            <div>
              {isMobile ? (
                <FaShareSquare
                  id='screenshot-share-icon'
                  className='screenshot-share-icon ms-2'
                  size={25}
                  onClick={handleScreenshot}
                />
              ) : (
                <RiScreenshot2Fill
                  id='screenshot-share-icon'
                  className='screenshot-share-icon ms-2'
                  size={25}
                  onClick={handleScreenshot}
                />
              )}
            </div>
          </div>
          {sortedTracks().map((track) => (
            <SongAlbumCard key={track.uri} track={track} />
          ))}
        </div>
      ) : (
        sortedGroupedTracksByAlbum().map((albumData, index) => (
          <div
            key={index}
            className='container album-container p-1 bg-body rounded-0'
            ref={(el) => (albumContainerRefs.current[index] = el)}
            id={albumData.albumName}
          >
            <h2 className='mb-2'>{albumData.albumName}</h2>
            <div className='d-flex gap-2 mb-2 pb-1 border-bottom justify-content-between'>
              {albumData.tracks.length > 1 && (
                <div>
                  <span className='text-muted total-album-playcount'>
                    {albumData.tracks
                      .reduce(
                        (accumulator, track) => accumulator + track.playcount,
                        0
                      )
                      .toLocaleString()}
                  </span>
                  <div className='change-increase-totals d-inline-block ms-1'>
                    <FontAwesomeIcon icon={faArrowUp} />{' '}
                    {albumData.tracks
                      .reduce(
                        (accumulator, track) =>
                          accumulator + track.dailyPlaycount,
                        0
                      )
                      .toLocaleString()}
                  </div>
                </div>
              )}
              {isMobile ? (
                <FaShareSquare
                  id='screenshot-share-icon'
                  className='screenshot-share-icon ms-2'
                  size={25}
                  data-album-index={index}
                  onClick={handleScreenshot}
                />
              ) : (
                <RiScreenshot2Fill
                  id='screenshot-share-icon'
                  className='screenshot-share-icon ms-2'
                  size={25}
                  data-album-index={index}
                  onClick={handleScreenshot}
                />
              )}
            </div>
            {albumData.tracks.map((track) => (
              <SongAlbumCard key={track.uri} track={track} />
            ))}
          </div>
        ))
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

export default ContentContainer;

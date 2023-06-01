import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { RiScreenshot2Fill } from 'react-icons/ri';
import { FaShareSquare } from 'react-icons/fa';
import SongAlbumList from './SongAlbumList';
import { isMobile } from 'react-device-detect';

const SongAlbumCard = forwardRef(
  ({ id, title, tracks, handleScreenshot, albumIndex }, ref) => {
    return (
      <div
        id={id}
        className='container album-container p-1 bg-body rounded-0'
        ref={ref}
      >
        <h2 className='mb-2 fs-3'>{title}</h2>
        <div className='d-flex gap-2 mb-2 pb-1 border-bottom justify-content-between'>
          {tracks.length > 1 && (
            <div>
              <span className='text-muted total-album-playcount'>
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
          )}
          <div>
            {isMobile ? (
              <FaShareSquare
                id='screenshot-share-icon'
                className='screenshot-share-icon ms-2'
                size={20}
                data-album-index={albumIndex}
                onClick={handleScreenshot}
              />
            ) : (
              <RiScreenshot2Fill
                id='screenshot-share-icon'
                className='screenshot-share-icon ms-2'
                size={25}
                data-album-index={albumIndex}
                onClick={handleScreenshot}
              />
            )}
          </div>
        </div>
        {tracks.map((track) => (
          <SongAlbumList key={track.uri} track={track} />
        ))}
      </div>
    );
  }
);

export default SongAlbumCard;

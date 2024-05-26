import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { RiScreenshot2Fill } from 'react-icons/ri';
import { FaShareSquare } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import SongAlbumList from './SongAlbumList';

const SongAlbumCard = forwardRef(
  ({ id, title, tracks, handleScreenshot, albumIndex }, ref) => {
    const totalPlayCount = tracks.reduce(
      (acc, track) => acc + track.playcount,
      0
    );
    const dailyPlayCount = tracks.reduce(
      (acc, track) => acc + track.dailyPlaycount,
      0
    );

    return (
      <div
        id={id}
        className='container album-container p-0 bg-body border rounded-top-3 px-2'
        ref={ref}
      >
        <div className='screenshot-icon-container'>
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
        <div className='pt-2 row no-gutters align-items-center mx-0 my-2 track-card'>
          <div className='col-8 col-md-8 p-0'>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faCompactDisc} className='me-1' />{' '}
              <h2 className='fs-5 mb-1 fw-bold'>{title}</h2>
            </div>
          </div>
          <div className='col-4 col-md-4'>
            {tracks.length > 1 && (
              <div className='d-flex flex-column text-end'>
                <span className='text-muted total-album-playcount fs-7 fw-bold'>
                  {totalPlayCount.toLocaleString()}
                </span>
                {dailyPlayCount !== 0 && (
                  <div className='change-increase-totals d-inline-block ms-1'>
                    <FontAwesomeIcon icon={faPlus} />{' '}
                    <span className='fs-7'>
                      {dailyPlayCount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
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

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
        className='container album-container p-0 bg-body border rounded-top-3 px-2'
        ref={ref}
      >
        <div className='px-2 pt-2'>
          <h2 className='fs-5 mb-1'>{title}</h2>
          <div className='d-flex gap-2 pb-1 justify-content-between'>
            {tracks.length > 1 && (
              <div>
                <span className='text-muted total-album-playcount fs-7'>
                  {tracks
                    .reduce(
                      (accumulator, track) => accumulator + track.playcount,
                      0
                    )
                    .toLocaleString()}
                </span>
                <div className='change-increase-totals d-inline-block ms-1'>
                  <FontAwesomeIcon icon={faArrowUp} />{' '}
                  <span className='fs-7'>
                    {tracks
                      .reduce(
                        (accumulator, track) =>
                          accumulator + track.dailyPlaycount,
                        0
                      )
                      .toLocaleString()}
                  </span>
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
        </div>
        {tracks.map((track) => (
          <SongAlbumList key={track.uri} track={track} />
        ))}
      </div>
    );
  }
);

export default SongAlbumCard;

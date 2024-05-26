import React, { forwardRef } from 'react';
import { RiScreenshot2Fill } from 'react-icons/ri';
import { FaShareSquare } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import TrackReachList from './TrackReachList';

const TrackReachCard = forwardRef(
  ({ id, title, tracks, handleScreenshot, albumIndex }, ref) => {
    // filter out tracks with 0 reach
    tracks = tracks.filter((track) => track.track_reach > 0);
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
        <div className='pt-2 row no-gutters d-flex mx-0 my-2'>
          <div className='col-8 col-md-8 p-0'>
            <h2 className='fs-5 mb-1 fw-bold'>{title}</h2>
          </div>
          <div className='col-4 col-md-4'>
            {tracks.length > 1 && (
              <div className='d-flex flex-column text-end'>
                <span className='text-muted total-album-playcount fs-7 fw-bold'>
                  {tracks
                    .reduce(
                      (accumulator, track) => accumulator + track.track_reach,
                      0
                    )
                    .toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
        {tracks.map((track) => (
          <TrackReachList key={track.track_id} track={track} />
        ))}
      </div>
    );
  }
);

export default TrackReachCard;

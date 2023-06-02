import React from 'react';

const TrackReachList = ({ track }) => {
  return (
    <div className='card bg-light-subtle bg-opacity-10 mb-2 border'>
      <div className='row no-gutters align-items-center m-0 track-card'>
        <div className='col-2 col-md-1 p-2'>
          <img
            src={track.image_url}
            alt={track.name}
            className='card-img-top border border-light-subtle rounded'
          />
        </div>
        <div className='col-6 col-md-7'>
          <div className='card-body'>
            <h5 className='card-title fs-6 text-truncate'>{track.name}</h5>
          </div>
        </div>
        <div className='col-4 col-md-4'>
          <div
            className='card-body'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <span className='text-muted'>
              {track.track_reach.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackReachList;

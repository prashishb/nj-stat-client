import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const SongAlbumCard = ({ track }) => {
  return (
    <div className='card bg-light-subtle bg-opacity-10 mb-2 border'>
      <div className='row no-gutters align-items-center m-0'>
        <div className='col-2 col-md-1 p-2'>
          <img
            src={track.imageUrl}
            alt={track.name}
            className='card-img-top border border-light-subtle rounded'
          />
        </div>
        <div className='col-6 col-md-7'>
          <div className='card-body'>
            <h5 className='card-title'>{track.name}</h5>
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
            <span>{track.playcount.toLocaleString()}</span>
            <div className='change-increase d-inline-block'>
              <FontAwesomeIcon icon={faArrowUp} />{' '}
              {track.dailyPlaycount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongAlbumCard;

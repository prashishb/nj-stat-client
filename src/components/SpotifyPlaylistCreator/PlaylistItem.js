import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PlaylistItem = ({
  song,
  count,
  updatePlaylistItemCount,
  removeFromPlaylist,
}) => {
  return (
    <div className='row mb-2'>
      <div className='col-2'>
        <img
          src={song.album.images[0]?.url}
          alt='Album cover'
          className='img-fluid'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className='col-4 d-flex align-items-center'>
        <div>
          <div
            className='fs-xs song-title-truncate'
            style={{ fontSize: '1em' }}
          >
            {song.name}
          </div>
          <div className='fs-xs' style={{ fontSize: '0.8em' }}>
            {song.artists[0].name}
          </div>
        </div>
      </div>
      <div className='col-4 p-0 d-flex align-items-center justify-content-end'>
        <input
          type='number'
          min='1'
          value={count}
          className='form-control'
          style={{
            width: '80px',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
            textAlign: 'center',
          }}
          onChange={(event) =>
            updatePlaylistItemCount(parseInt(event.target.value))
          }
        />
      </div>
      <div className='col-2 d-flex align-items-center justify-content-end'>
        <button className='btn btn-danger' onClick={removeFromPlaylist}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistItem;

import React, { useCallback } from 'react';

const DisplayModeToggle = ({ displayMode, setDisplayMode }) => {
  const handleClick = useCallback(
    (mode) => {
      setDisplayMode(mode);
    },
    [setDisplayMode]
  );

  return (
    <div className='btn-group' role='group'>
      <input
        type='radio'
        className='btn-check'
        name='displayModeToggle'
        id='allSongs'
        autoComplete='off'
        checked={displayMode === 'all'}
        onChange={() => handleClick('all')}
      />
      <label
        className='btn btn-outline-green-moon button-transition'
        htmlFor='allSongs'
      >
        Songs
      </label>

      <input
        type='radio'
        className='btn-check'
        name='displayModeToggle'
        id='albums'
        autoComplete='off'
        checked={displayMode === 'albums'}
        onChange={() => handleClick('albums')}
      />
      <label
        className='btn btn-outline-green-moon button-transition'
        htmlFor='albums'
      >
        Albums
      </label>
    </div>
  );
};

export default DisplayModeToggle;

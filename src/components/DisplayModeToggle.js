import React, { useCallback } from 'react';

const ToggleOption = ({ id, label, checked, onChange }) => (
  <>
    <input
      type='radio'
      className='btn-check'
      name='displayModeToggle'
      id={id}
      autoComplete='off'
      checked={checked}
      onChange={onChange}
    />
    <label
      className='btn btn-outline-green-moon button-transition'
      htmlFor={id}
    >
      {label}
    </label>
  </>
);

const DisplayModeToggle = ({
  displayMode,
  setDisplayMode,
  hasMultipleAlbums,
}) => {
  const handleClick = useCallback(
    (mode) => {
      setDisplayMode(mode);
    },
    [setDisplayMode]
  );

  return (
    <div className='btn-group' role='group'>
      <ToggleOption
        id='allSongs'
        label='All'
        checked={displayMode === 'all'}
        onChange={() => handleClick('all')}
      />

      {hasMultipleAlbums && (
        <ToggleOption
          id='albums'
          label='Albums'
          checked={displayMode === 'albums'}
          onChange={() => handleClick('albums')}
        />
      )}

      <ToggleOption
        id='playlists'
        label='Playlists'
        checked={displayMode === 'playlists'}
        onChange={() => handleClick('playlists')}
      />
    </div>
  );
};

export default DisplayModeToggle;

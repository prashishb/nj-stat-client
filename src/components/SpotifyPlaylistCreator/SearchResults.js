import React from 'react';

const SearchResult = ({ item, type, onClick }) => {
  const displayImage = item.album
    ? item.album.images[0]?.url
    : item.images[0]?.url;

  return (
    <li
      className='dropdown-item search-result d-flex align-items-center'
      onClick={() => onClick(item)}
    >
      <img
        src={displayImage}
        alt='Album cover'
        className='img-thumbnail'
        style={{
          width: '50px',
          height: '50px',
          marginRight: '10px',
        }}
      />
      <div>
        <div className='truncate'>{item.name}</div>
        <small className='text-muted'>{type}</small>
      </div>
    </li>
  );
};

export default SearchResult;

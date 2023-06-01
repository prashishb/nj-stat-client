import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const FilterOptions = ({ filterOption, setFilterOption }) => {
  return (
    <div className='dropdown'>
      <button
        className='btn btn-outline-green-moon dropdown-toggle'
        type='button'
        id='filterMenuButton'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <FontAwesomeIcon icon={faSort} /> Sort by: {filterOption}
      </button>
      <ul
        className='dropdown-menu'
        aria-labelledby='filterMenuButton'
        style={{ minWidth: '100%' }}
      >
        <li>
          <button
            className='dropdown-item'
            onClick={() => setFilterOption('Daily')}
          >
            Daily Streams
          </button>
        </li>
        <li>
          <button
            className='dropdown-item'
            onClick={() => setFilterOption('Total')}
          >
            Total Streams
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterOptions;

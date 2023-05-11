import React from 'react';
import { formatDate } from '../utils/valueFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

const ChangeIcon = ({ change }) => {
  if (change > 0) {
    return <FontAwesomeIcon icon={faArrowUp} />;
  } else if (change < 0) {
    return <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    return <FontAwesomeIcon icon={faMinus} className='text-body-emphasis' />;
  }
};

const ArtistCard = ({ artist }) => {
  const { name, current, changes, headerImageUrl, timestamp } = artist;
  const { monthlyListeners, worldRank, followers } = current;
  const changeInMonthlyListeners = changes.monthlyListeners;
  const changeInWorldRank = changes.worldRank;
  const changeInFollowers = changes.followers;

  return (
    <div className='card artist-card'>
      <div className='artist-card-container'>
        <div className='header-image-container'>
          <img src={headerImageUrl} className='header-image' alt={name} />
          <div className='overlay'></div>
          <h1 className='artist-name'>{name}</h1>
          <span className='d-flex flex-row-reverse timestamp'>
            {/* if timestamp is null or undefined show current date else show timedate */}
            Updated: {formatDate(timestamp)}
          </span>
        </div>
      </div>
      <div className='card-body artist-body bg-light-subtle bg-opacity-10'>
        <div className='row justify-content-around'>
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center border-end'>
            <div className='stat-container'>
              <p className='stat-label text-truncate text-muted mb-2 mt-1'>
                Monthly Listeners
              </p>
              <h6>{monthlyListeners.toLocaleString()}</h6>
              <div className='change'>
                <ChangeIcon change={changeInMonthlyListeners} />
                {changeInMonthlyListeners !== 0 && (
                  <span
                    className={
                      changeInMonthlyListeners > 0
                        ? 'change-increase'
                        : 'change-decrease'
                    }
                  >
                    {Math.abs(changeInMonthlyListeners).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center border-end'>
            <div className='stat-container'>
              <p className='stat-label text-truncate text-muted mb-2 mt-1'>
                Global Rank
              </p>
              <h6>{worldRank.toLocaleString()}</h6>
              <div className='change'>
                <ChangeIcon change={changeInWorldRank} />
                {changeInWorldRank !== 0 && (
                  <span
                    className={
                      changeInWorldRank > 0
                        ? 'change-increase'
                        : 'change-decrease'
                    }
                  >
                    {Math.abs(changeInWorldRank).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center'>
            <div className='stat-container'>
              <p className='stat-label text-truncate text-muted mb-2 mt-1'>
                Followers
              </p>
              <h6>{followers.toLocaleString()}</h6>
              <div className='change'>
                <ChangeIcon change={changeInFollowers} />
                {changeInFollowers !== 0 && (
                  <span
                    className={
                      changeInFollowers > 0
                        ? 'text-truncate change-increase'
                        : 'text-truncate change-decrease'
                    }
                  >
                    {Math.abs(changeInFollowers).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;

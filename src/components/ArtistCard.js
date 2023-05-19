import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/valueFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faMinus,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { fetchHistoricalSpotifyArtistStats } from '../services/spotifyStatsService';
import ChartModal from './ChartModal';

const ChangeIcon = ({ change }) => {
  if (change > 0) {
    return <FontAwesomeIcon icon={faArrowUp} />;
  } else if (change < 0) {
    return <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    return <FontAwesomeIcon icon={faMinus} className='text-body-emphasis' />;
  }
};

const ArtistCard = ({
  artist,
  goNextArtist,
  goPreviousArtist,
  currentIndex,
  artistCount,
}) => {
  const { name, current, changes, headerImageUrl, timestamp, artistId } =
    artist;
  const { monthlyListeners, worldRank, followers } = current;
  const changeInMonthlyListeners = changes.monthlyListeners;
  const changeInWorldRank = changes.worldRank;
  const changeInFollowers = changes.followers;
  const defualtImg = 'https://i.ibb.co/1ZmqTMG/1659632359-untitled-1-013.jpg';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState('');
  const [theme, setTheme] = useState(
    document.documentElement.className || 'light'
  );

  useEffect(() => {
    const classObserver = new MutationObserver(() => {
      setTheme(document.documentElement.className);
    });

    classObserver.observe(document.documentElement, { attributes: true });

    return () => classObserver.disconnect();
  }, []);

  const handleStatClick = async (statType) => {
    try {
      const res = await fetchHistoricalSpotifyArtistStats(artistId, statType);
      if (Array.isArray(res.data)) {
        setChartData(res.data);
        setChartTitle(
          statType === 'monthlyListeners' ? 'Monthly Listeners' : 'Followers'
        );
        setIsModalOpen(true);
      } else {
        console.error('Unexpected data format: ', res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='card artist-card'>
      <div className='artist-card-container'>
        <div className='header-image-container'>
          <img
            src={headerImageUrl ? headerImageUrl : defualtImg}
            className='header-image'
            alt={name}
          />
          <div className='overlay'></div>
          <h1 className='artist-name'>{name}</h1>
          <span className='d-flex flex-row-reverse timestamp'>
            {/* if timestamp is null or undefined show current date else show timedate */}
            Updated: {formatDate(timestamp)}
          </span>
          <button
            className={
              currentIndex === 0
                ? 'disabled navigation-arrow left'
                : 'navigation-arrow left'
            }
            onClick={goPreviousArtist}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className={
              currentIndex === artistCount - 1
                ? 'disabled navigation-arrow right'
                : 'navigation-arrow right'
            }
            onClick={goNextArtist}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className='card-body artist-body bg-light-subtle bg-opacity-10'>
        <div className='row justify-content-around'>
          <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center border-end'>
            <div
              className='stat-container'
              onClick={() => handleStatClick('monthlyListeners')}
            >
              <p className='stat-label text-truncate text-muted mb-2 mt-1'>
                Monthly Listeners
              </p>
              <h6 className='open-chart'>
                {monthlyListeners.toLocaleString()}
              </h6>
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
            <div className='stat-container global-rank'>
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
            <div
              className='stat-container'
              onClick={() => handleStatClick('followers')}
            >
              <p className='stat-label text-truncate text-muted mb-2 mt-1'>
                Followers
              </p>
              <h6 className='open-chart'>{followers.toLocaleString()}</h6>
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
      <ChartModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        data={chartData}
        title={chartTitle}
        theme={theme}
      />
    </div>
  );
};

export default ArtistCard;

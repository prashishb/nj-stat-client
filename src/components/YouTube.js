import React, { useState } from 'react';
import VideoCard from './VideoCard';
import { useYouTubeStats } from '../hooks/useYouTubeStats';
import { formatDate } from '../utils/valueFormatter';
import {
  getSortedVideos,
  filterVideosByDisplayMode,
} from '../utils/youtubeStatsUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';

const YouTube = () => {
  const {
    isLoading,
    videos,
    updatedAt,
    displayMode,
    setDisplayMode,
    hourlyTrendingVideoId,
    dailyTrendingVideoId,
  } = useYouTubeStats();

  const [filterOption, setFilterOption] = useState('Hourly');

  if (isLoading) return <Spinner />;

  const sortedVideos = getSortedVideos(videos, filterOption);
  const filteredVideos = filterVideosByDisplayMode(sortedVideos, displayMode);

  return (
    <div className='container mt-2 mb-2'>
      <h1 className='text-center fs-4 mb-0'>
        Last Updated: {formatDate(updatedAt)}
      </h1>
      <span className='d-flex justify-content-center align-items-center text-center fs-6 mb-2 fst-italic'>
        Tracking {videos.length} videos. Updated every hour.
      </span>
      <div className='row mb-2 mx-2'>
        <div className='col d-flex justify-content-start p-0 mb-2'>
          <div className='dropdown'>
            <button
              className='btn btn-outline-green-moon dropdown-toggle'
              type='button'
              id='displayModeMenuButton'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <FontAwesomeIcon icon={faFilter} /> Filter by: {displayMode}
            </button>
            <ul
              className='dropdown-menu'
              aria-labelledby='displayModeMenuButton'
              style={{ minWidth: '100%' }}
            >
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setDisplayMode('All')}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setDisplayMode('Perf')}
                >
                  Performance
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setDisplayMode('MV')}
                >
                  MV
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setDisplayMode('Teaser')}
                >
                  Teaser
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setDisplayMode('Audio')}
                >
                  Audio
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setDisplayMode('Other')}
                >
                  Other
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='col d-flex justify-content-end p-0'>
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
                  onClick={() => setFilterOption('Hourly')}
                >
                  Hourly Views
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setFilterOption('24H')}
                >
                  24H Views
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  onClick={() => setFilterOption('Total')}
                >
                  Total Views
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='row row-cols-1 row-cols-md-2 g-4 youtube'>
        {filteredVideos.map((video, index) => {
          return (
            <div className='col' key={index}>
              <VideoCard
                video={video}
                hourlyTrending={video.id === hourlyTrendingVideoId}
                dailyTrending={video.id === dailyTrendingVideoId}
                hourlyTrendingVideoId={hourlyTrendingVideoId}
                dailyTrendingVideoId={dailyTrendingVideoId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouTube;

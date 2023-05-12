import React, { useRef } from 'react';
import { FiThumbsUp, FiArrowUp } from 'react-icons/fi';
import { BsEyeFill } from 'react-icons/bs';
import {
  formatCount,
  checkMilestone,
  getBadgeClass,
} from '../utils/youtubeStatsUtils';

const VideoCard = ({ video, hourlyTrending }) => {
  const { image, title, viewCount, hourlyViewCount, dayViewCount, likeCount } =
    video;

  const cardRef = useRef(null);

  const milestone = checkMilestone(viewCount);
  const badgeClass = getBadgeClass(viewCount);

  return (
    <div
      className='card video-card border-dark-subtle'
      ref={cardRef}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='backdrop-filter-overlay'></div>
      <div className='card-body video-card-body p-2'>
        <div className='d-flex align-items-start mb-3'>
          <img className='video-card-img me-3' src={image} alt={title} />
          <div>
            <h5 className='card-title video-card-title text-wrap'>{title}</h5>
            <div className='d-flex'>
              <p className='video-card-likes'>
                <FiThumbsUp className='me-1' />{' '}
                <span>{formatCount(likeCount)}</span>
              </p>
              {hourlyTrending && (
                <p className='ms-2 video-badge badge-hourly-gainer'>
                  <FiArrowUp className='me-1' /> Top Hourly
                </p>
              )}
              {milestone && (
                <p className={`ms-2 video-badge ${badgeClass}`}>
                  <BsEyeFill className='me-1' /> {milestone}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='row justify-content-center text-center stat-body'>
          <div className='col border-end border-dark-subtle'>
            <p className='col-title'>Hourly</p>
            <div className='d-flex justify-content-center'>
              <h6 className='text-font-normal text-stat-value'>
                {hourlyViewCount.toLocaleString()}
              </h6>
            </div>
          </div>
          <div className='col border-end border-dark-subtle'>
            <p className='col-title'>24H</p>
            <h6 className='text-font-normal text-stat-value'>
              {dayViewCount.toLocaleString()}
            </h6>
          </div>
          <div className='col'>
            <p className='col-title'>Total</p>
            <h6 className='total-views text-font-normal text-stat-value'>
              {viewCount.toLocaleString()}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

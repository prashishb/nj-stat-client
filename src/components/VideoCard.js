import React, { useRef } from 'react';
import { FiThumbsUp } from 'react-icons/fi';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { BsEyeFill } from 'react-icons/bs';
import { formatCount, getBadges } from '../utils/youtubeStatsUtils';

const VideoCard = ({ video, hourlyTrendingVideoId }) => {
  const { image, title, viewCount, hourlyViewCount, dayViewCount, likeCount } =
    video;
  const badges = getBadges(viewCount, video.id, hourlyTrendingVideoId);
  const cardRef = useRef(null);
  const titleWithoutNewJeans = title.replace('NewJeans (뉴진스)', '');

  return (
    <div className='card video-card border-dark-subtle' ref={cardRef}>
      <div className='backdrop-filter-overlay'></div>
      <div className='card-body video-card-body p-2'>
        <div className='d-flex align-items-start mb-1'>
          <img className='video-card-img me-2' src={image} alt={title} />
          <div className='overflow-hidden'>
            <h5 className='card-title video-card-title text-truncate'>
              {titleWithoutNewJeans}
            </h5>
            <div className='d-flex'>
              <p className='video-card-likes'>
                <FiThumbsUp className='me-1' />{' '}
                <span>{formatCount(likeCount)}</span>
              </p>
              {badges.map((badge, index) => (
                <p key={index} className={`ms-2 video-badge ${badge.variant}`}>
                  {badge.label === 'Trending' ? (
                    <>
                      <FaArrowTrendUp className='me-1' /> {badge.label}
                    </>
                  ) : (
                    <>
                      <BsEyeFill className='me-1' /> {badge.label}
                    </>
                  )}
                </p>
              ))}
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

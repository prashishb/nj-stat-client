import React, { useRef } from 'react';
// import { RiScreenshot2Fill } from 'react-icons/ri';
import { FiThumbsUp, FiEye } from 'react-icons/fi';
// import html2canvas from 'html2canvas';
// import { createFileName } from 'use-react-screenshot';

const VideoCard = ({ video }) => {
  const { image, title, viewCount, hourlyViewCount, dayViewCount, likeCount } =
    video;

  const cardRef = useRef(null);

  const formatCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count;
  };

  const checkMilestone = (count) => {
    if (count >= 100000000) return Math.floor(count / 100000000) * 100 + 'M';
    if (count >= 1000000000) return Math.floor(count / 1000000000) * 100 + 'B';
    return null;
  };

  const milestone = checkMilestone(viewCount);

  // TODO: Fix CORS issue (maybe implement it in the backend)
  // const handleScreenshot = () => {
  //   const proxy = 'https://cors-anywhere.herokuapp.com/';
  //   const ref = cardRef.current;
  //   if (!ref) return;
  //   html2canvas(ref, {
  //     allowTaint: false,
  //     useCORS: true,
  //     height: ref.offsetHeight - 7,
  //     padding: 2,
  //     proxy: proxy,
  //     ignoreElements: (element) => element.id === 'screenshot-icon',
  //   }).then((canvas) => {
  //     const link = document.createElement('a');
  //     link.href = canvas.toDataURL();
  //     link.download = createFileName(`youtube_${ref.id}`);
  //     link.click();
  //   });
  // };

  return (
    <div
      className='card video-card border-dark-subtle'
      ref={cardRef}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* <RiScreenshot2Fill
        className='video-card-icon screenshot-icon'
      /> */}
      <div className='backdrop-filter-overlay'></div>
      <div className='card-body video-card-body p-2'>
        <div className='d-flex align-items-start mb-3'>
          <img
            className='video-card-img me-3 border-secondary'
            src={image}
            alt={title}
          />
          <div>
            <h5 className='card-title video-card-title text-wrap'>{title}</h5>
            <div className='d-flex'>
              <p className='video-card-likes'>
                <FiThumbsUp className='me-1' />{' '}
                <span>{formatCount(likeCount)}</span>
              </p>
              {milestone && (
                <p className='ms-2 video-card-milestone-badge'>
                  <FiEye className='me-1' /> {milestone}
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

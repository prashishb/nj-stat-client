import { useState, useEffect } from 'react';
import { fetchVideoStats } from '../services/youtubeStatsService';
import {
  getHourlyTrendingVideo,
  getDailyTrendingVideo,
  getUpdatedAt,
  processVideos,
} from '../utils/youtubeStatsUtils';

export const useYouTubeStats = () => {
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await fetchVideoStats();
        setVideoData(videoData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setIsLoading(false);
    }
  }, [videoData]);

  const updatedAt = getUpdatedAt(videoData);
  const videos = processVideos(videoData);
  const hourlyTrendingVideoId = getHourlyTrendingVideo(videoData);
  const dailyTrendingVideoId = getDailyTrendingVideo(videoData);

  return {
    isLoading,
    videos,
    updatedAt,
    displayMode,
    setDisplayMode,
    hourlyTrendingVideoId,
    dailyTrendingVideoId,
  };
};

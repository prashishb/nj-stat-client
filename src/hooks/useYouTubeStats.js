import { useState, useEffect, useRef } from 'react';
import { fetchVideoStats } from '../services/youtubeStatsService';
import {
  getHourlyTrendingVideo,
  getDailyTrendingVideo,
  getUpdatedAt,
  processVideos,
} from '../utils/youtubeStatsUtils';
import { getTimeUntilNextUpdate } from '../utils/helperUtils';

export const useYouTubeStats = () => {
  const [data, setData] = useState({
    videoData: [],
    isLoading: true,
    displayMode: 'All',
  });

  const INTERVAL = useRef(getTimeUntilNextUpdate());

  const fetchData = async () => {
    try {
      const videoData = await fetchVideoStats();
      setData((prevData) => ({
        ...prevData,
        videoData,
        isLoading: false,
      }));
    } catch (err) {
      console.error('Error fetching data:', err);
      setData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, INTERVAL.current);
    return () => clearInterval(interval);
  }, []);

  const updatedAt = getUpdatedAt(data.videoData);
  const videos = processVideos(data.videoData);
  const hourlyTrendingVideoId = getHourlyTrendingVideo(data.videoData);
  const dailyTrendingVideoId = getDailyTrendingVideo(data.videoData);

  return {
    isLoading: data.isLoading,
    videos,
    updatedAt,
    displayMode: data.displayMode,
    setDisplayMode: (mode) =>
      setData((prevData) => ({ ...prevData, displayMode: mode })),
    hourlyTrendingVideoId,
    dailyTrendingVideoId,
  };
};

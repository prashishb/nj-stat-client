export const getUpdatedAt = (videoData) => {
  if (!videoData || videoData.length === 0) return null;
  const updatedAt = videoData[0].timestamp;
  return updatedAt;
};

export const formatCount = (count) => {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
  return count;
};

export const checkMilestone = (count) => {
  if (count >= 100000000) return Math.floor(count / 100000000) * 100 + 'M+';
  if (count >= 1000000000) return Math.floor(count / 1000000000) * 100 + 'B+';
  return null;
};

export const processVideos = (videoData) => {
  const sortedVideoData = videoData.sort((a, b) => {
    return b.hourlyViewCount - a.hourlyViewCount;
  });

  return sortedVideoData;
};

export const getBadgeClass = (count) => {
  if (count >= 1000000000) return 'badge-1B';
  if (count >= 900000000) return 'badge-900M';
  if (count >= 800000000) return 'badge-800M';
  if (count >= 700000000) return 'badge-700M';
  if (count >= 600000000) return 'badge-600M';
  if (count >= 500000000) return 'badge-500M';
  if (count >= 400000000) return 'badge-400M';
  if (count >= 300000000) return 'badge-300M';
  if (count >= 200000000) return 'badge-200M';
  if (count >= 100000000) return 'badge-100M';
  return null;
};

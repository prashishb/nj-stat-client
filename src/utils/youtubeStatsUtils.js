export const getUpdatedAt = (videoData) => {
  if (!videoData || videoData.length === 0) return null;
  const updatedAt = videoData[0].timestamp;
  return updatedAt;
};

export const processVideos = (videoData) => {
  const sortedVideoData = videoData.sort((a, b) => {
    return b.hourlyViewCount - a.hourlyViewCount;
  });

  return sortedVideoData;
};

// const videoData = [
//   {
//     timestamp: '2023-05-08T23:34:50.735Z',
//     id: 'js1CtxSY38I',
//     title: "NewJeans (뉴진스) 'Attention' Official MV",
//     image: 'https://i.ytimg.com/vi/js1CtxSY38I/hqdefault.jpg',
//     viewCount: 48186786,
//     hourlyViewCount: 0,
//     dayViewCount: 0,
//     likeCount: 1522284,
//     commentCount: 39740,
//     publishedDate: '2022-07-21T15:00:14Z',
//     channelId: 'UC3IZKseVpdzPSBaWxBxundA',
//   },
//   {
//     timestamp: '2023-05-08T23:34:50.735Z',
//     id: 'XIOoqJyx8E4',
//     title: "NewJeans (뉴진스) 'Zero' Official MV",
//     image: 'https://i.ytimg.com/vi/XIOoqJyx8E4/hqdefault.jpg',
//     viewCount: 14464510,
//     hourlyViewCount: 0,
//     dayViewCount: 41136,
//     likeCount: 740006,
//     commentCount: 33091,
//     publishedDate: '2023-04-03T09:00:00Z',
//     channelId: 'UC3IZKseVpdzPSBaWxBxundA',
//   },
//   {
//     timestamp: '2023-05-08T23:34:50.735Z',
//     id: 'uONSk48LW1A',
//     title: "NewJeans (뉴진스) 'Hurt (250 Remix)' Special Video",
//     image: 'https://i.ytimg.com/vi/uONSk48LW1A/hqdefault.jpg',
//     viewCount: 3391576,
//     hourlyViewCount: 0,
//     dayViewCount: 5640,
//     likeCount: 231172,
//     commentCount: 5482,
//     publishedDate: '2022-12-28T15:00:02Z',
//     channelId: 'UC3IZKseVpdzPSBaWxBxundA',
//   },
//   {
//     timestamp: '2023-05-08T23:34:50.735Z',
//     id: 'DrNtuAgwWgQ',
//     title: "NewJeans (뉴진스) 'Zero' Performance Video",
//     image: 'https://i.ytimg.com/vi/DrNtuAgwWgQ/hqdefault.jpg',
//     viewCount: 3292812,
//     hourlyViewCount: 0,
//     dayViewCount: 34608,
//     likeCount: 145195,
//     commentCount: 4497,
//     publishedDate: '2023-04-10T02:00:02Z',
//     channelId: 'UC3IZKseVpdzPSBaWxBxundA',
//   },
// ];

// sort hourlyViewCount

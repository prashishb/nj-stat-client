export const getUpdatedAt = (songAlbumStats) => {
  return (
    songAlbumStats.length > 0 &&
    (songAlbumStats.length === 1
      ? songAlbumStats[0].tracks[0].updatedAt
      : songAlbumStats.reduce((acc, curr) => {
          const latestTrack = curr.tracks.reduce((acc, curr) => {
            return acc.updatedAt > curr.updatedAt ? acc : curr;
          });
          return acc.updatedAt > latestTrack.updatedAt ? acc : latestTrack;
        }).updatedAt)
  );
};

export const processTracks = (songAlbumStats) => {
  const tracks = [];

  const uniqueTracks = {};

  songAlbumStats.forEach((album) => {
    album.tracks.forEach((track) => {
      if (!uniqueTracks[track.isrc]) {
        uniqueTracks[track.isrc] = {
          uri: track.uri,
          name: track.name,
          playcount: track.playcount,
          imageUrl: track.imageUrl,
          albumUri: `spotify:album:${album.albumId}`,
          dailyPlaycount: track.dailyPlaycount,
          isrc: track.isrc,
        };
      } else if (track.albumType === 'single') {
        uniqueTracks[track.isrc] = {
          uri: track.uri,
          name: track.name,
          playcount: track.playcount,
          imageUrl: track.imageUrl,
          albumUri: `spotify:album:${album.albumId}`,
          dailyPlaycount: track.dailyPlaycount,
          isrc: track.isrc,
        };
      }
    });
  });

  Object.keys(uniqueTracks).forEach((isrc) => {
    tracks.push(uniqueTracks[isrc]);
  });

  return tracks.sort((a, b) => b.dailyPlaycount - a.dailyPlaycount);
};

export const processAlbums = (songAlbumStats) => {
  const albums = songAlbumStats
    .filter((album) => !album.name.toLowerCase().includes('soundtrack'))
    .map((album) => {
      return {
        albumId: album.albumId,
        name: album.name,
        tracks: album.tracks.map((track) => {
          return {
            uri: track.uri,
            name: track.name,
            playcount: track.playcount,
            imageUrl: track.imageUrl,
            albumUri: `spotify.album:${album.albumId}`,
            dailyPlaycount: track.dailyPlaycount,
            isrc: track.isrc,
          };
        }),
      };
    });

  const filteredGroupedTracksByAlbum = albums.filter(
    (albumData) => albumData.tracks.length > 1
  );

  const uniqueTracks = {};

  filteredGroupedTracksByAlbum.forEach((album) => {
    album.tracks.forEach((track) => {
      if (!uniqueTracks[track.isrc]) {
        uniqueTracks[track.isrc] = {
          uri: track.uri,
          name: track.name,
          playcount: track.playcount,
          imageUrl: track.imageUrl,
          albumUri: track.albumUri,
          dailyPlaycount: track.dailyPlaycount,
          isrc: track.isrc,
          albumName: album.name,
        };
      } else {
        // Maintain the original track's playcount and dailyPlaycount
        uniqueTracks[track.isrc].playcount = track.playcount;
        uniqueTracks[track.isrc].dailyPlaycount = track.dailyPlaycount;
      }
    });
  });

  const uniqueAlbums = {};

  Object.keys(uniqueTracks).forEach((isrc) => {
    const albumUri = uniqueTracks[isrc].albumUri;
    if (!uniqueAlbums[albumUri]) {
      uniqueAlbums[albumUri] = {
        albumName: uniqueTracks[isrc].albumName,
        tracks: [uniqueTracks[isrc]],
      };
    } else {
      uniqueAlbums[albumUri].tracks.push(uniqueTracks[isrc]);
    }
  });

  const filteredAlbums = Object.keys(uniqueAlbums).map((albumUri) => {
    return {
      albumName: uniqueAlbums[albumUri].albumName,
      tracks: uniqueAlbums[albumUri].tracks,
    };
  });

  return filteredAlbums.map((albumData) => {
    const sortedTracks = albumData.tracks.sort(
      (a, b) => b.dailyPlaycount - a.dailyPlaycount
    );
    return {
      albumName: albumData.albumName,
      tracks: sortedTracks,
    };
  });
};

export const sortTracks = (tracks, filterOption) => {
  const sorted = [...tracks];
  if (filterOption === 'Daily') {
    sorted.sort((a, b) => b.dailyPlaycount - a.dailyPlaycount);
  } else {
    sorted.sort((a, b) => b.playcount - a.playcount);
  }
  return sorted;
};

export const sortTracksByAlbum = (groupedTracksByAlbum, filterOption) => {
  const sorted = [...groupedTracksByAlbum];
  if (filterOption === 'Daily') {
    sorted.forEach((album) => {
      album.tracks.sort((a, b) => b.dailyPlaycount - a.dailyPlaycount);
    });
  } else {
    sorted.forEach((album) => {
      album.tracks.sort((a, b) => b.playcount - a.playcount);
    });
  }
  return sorted;
};

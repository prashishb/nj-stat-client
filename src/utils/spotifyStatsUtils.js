export const getUpdatedAt = (songAlbumStats) => {
  return (
    songAlbumStats.length > 0 &&
    songAlbumStats.reduce((acc, curr) => {
      const latestTrack = curr.tracks.reduce((acc, curr) => {
        return acc.updatedAt > curr.updatedAt ? acc : curr;
      });
      return acc.updatedAt > latestTrack.updatedAt ? acc : latestTrack;
    }).updatedAt
  );
};

export const processTracks = (songAlbumStats) => {
  const tracks = [];
  songAlbumStats.forEach((album) => {
    album.tracks.forEach((track) => {
      const index = tracks.findIndex((t) => t.isrc === track.isrc);
      if (index === -1) {
        tracks.push({
          uri: track.uri,
          name: track.name,
          playcount: track.playcount,
          imageUrl: track.imageUrl,
          albumUri: `spotify:album:${album.albumId}`,
          dailyPlaycount: track.dailyPlaycount,
          isrc: track.isrc,
        });
      } else {
        const otherTrack = tracks[index];
        if (
          album.tracks.length === 1 ||
          otherTrack.albumUri === `spotify:album:${album.albumId}`
        ) {
          tracks.splice(index, 1, {
            uri: track.uri,
            name: track.name,
            playcount: track.playcount,
            imageUrl: track.imageUrl,
            albumUri: `spotify:album:${album.albumId}`,
            dailyPlaycount: track.dailyPlaycount,
            isrc: track.isrc,
          });
        }
      }
    });
  });
  return tracks.sort((a, b) => b.dailyPlaycount - a.dailyPlaycount);
};

export const processAlbums = (songAlbumStats) => {
  const albums = songAlbumStats.map((album) => {
    return {
      name: album.name,
      tracks: album.tracks.map((track) => {
        return {
          uri: track.uri,
          name: track.name,
          playcount: track.playcount,
          imageUrl: track.imageUrl,
          albumUri: `spotify.album:${album.albumId}`,
          dailyPlaycount: track.dailyPlaycount,
        };
      }),
    };
  });

  const filteredGroupedTracksByAlbum = albums.filter(
    (albumData) => albumData.tracks.length > 1
  );

  return filteredGroupedTracksByAlbum.map((albumData) => {
    const sortedTracks = albumData.tracks.sort(
      (a, b) => b.dailyPlaycount - a.dailyPlaycount
    );
    return {
      albumName: albumData.name,
      tracks: sortedTracks,
    };
  });
};

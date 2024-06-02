export const sortAlbums = (albums, filterOption) => {
  return [...albums].sort((a, b) => {
    const aTotalPlayCount = a.tracks.reduce(
      (acc, track) => acc + track.playcount,
      0
    );
    const bTotalPlayCount = b.tracks.reduce(
      (acc, track) => acc + track.playcount,
      0
    );
    const aDailyPlayCount = a.tracks.reduce(
      (acc, track) => acc + track.dailyPlaycount,
      0
    );
    const bDailyPlayCount = b.tracks.reduce(
      (acc, track) => acc + track.dailyPlaycount,
      0
    );

    if (filterOption === 'Total') {
      return bTotalPlayCount - aTotalPlayCount;
    } else {
      return bDailyPlayCount - aDailyPlayCount;
    }
  });
};

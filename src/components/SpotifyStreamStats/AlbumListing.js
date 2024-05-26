import React, { useMemo } from 'react';
import SongAlbumCard from './SongAlbumCard';

const AlbumListing = ({
  albums,
  handleScreenshot,
  albumContainerRefs,
  filterOption,
}) => {
  const sortedAlbums = useMemo(() => {
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
  }, [albums, filterOption]);

  return sortedAlbums.map((albumData, index) => (
    <SongAlbumCard
      key={index}
      id={albumData.albumName}
      ref={(el) => (albumContainerRefs.current[index] = el)}
      title={albumData.albumName}
      tracks={albumData.tracks}
      handleScreenshot={handleScreenshot}
      albumIndex={index}
    />
  ));
};

export default AlbumListing;

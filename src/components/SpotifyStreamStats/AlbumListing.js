import React, { useMemo } from 'react';
import SongAlbumCard from './SongAlbumCard';
import { sortAlbums } from '../../utils/sortingUtils';

const AlbumListing = ({
  albums,
  handleScreenshot,
  albumContainerRefs,
  filterOption,
}) => {
  const sortedAlbums = useMemo(
    () => sortAlbums(albums, filterOption),
    [albums, filterOption]
  );

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

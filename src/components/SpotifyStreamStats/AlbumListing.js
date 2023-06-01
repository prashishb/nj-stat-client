import React from 'react';
import SongAlbumCard from './SongAlbumCard';

const AlbumListing = ({ albums, handleScreenshot, albumContainerRefs }) => {
  return albums.map((albumData, index) => (
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

import { useMemo } from 'react';
import { sortTracks, sortTracksByAlbum } from '../utils/spotifyStatsUtils';

export const useSortedTracks = (tracks, filterOption) => {
  return useMemo(
    () => sortTracks(tracks, filterOption),
    [tracks, filterOption]
  );
};

export const useSortedAlbums = (albums, filterOption) => {
  return useMemo(
    () => sortTracksByAlbum(albums, filterOption),
    [albums, filterOption]
  );
};

export const useAlbumsWithMultipleTracks = (albums) => {
  return useMemo(
    () => albums.filter((album) => album.tracks.length > 1),
    [albums]
  );
};

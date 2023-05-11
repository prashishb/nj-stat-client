// import { useState } from 'react';
// import spotifyApi from '../services/spotifyAuthService';

// const usePlaylist = () => {
//   const [playlist, setPlaylist] = useState([]);
//   const [trackCount, setTrackCount] = useState({});
//   const [notification, setNotification] = useState(null);
//   const [streamingFocus, setStreamingFocus] = useState(true);

//   const addToPlaylist = (track) => {
//     setPlaylist((prevState) => [...prevState, { ...track, count: 1 }]);
//   };

//   const addAlbumToPlaylist = async (albumId) => {
//     try {
//       const album = await spotifyApi.getAlbum(albumId);
//       const tracks = album.tracks.items;
//       const tracksWithCount = tracks.map((track) => ({
//         ...track,
//         album: { name: album.name, images: album.images },
//         count: 1,
//       }));
//       setPlaylist((prevState) => [...prevState, ...tracksWithCount]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updatePlaylistItemCount = (songId, count) => {
//     setPlaylist((prevState) =>
//       prevState.map((song) => (song.id === songId ? { ...song, count } : song))
//     );
//   };

//   const removeFromPlaylist = (trackId) => {
//     setPlaylist((prevPlaylistArray) =>
//       prevPlaylistArray.filter((track) => track.id !== trackId)
//     );
//   };

//   const shuffle = (array) => {
//     let currentIndex = array.length,
//       randomIndex;

//     while (currentIndex !== 0) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex],
//         array[currentIndex],
//       ];
//     }

//     return array;
//   };

//   const generateDescription = (playlist) => {
//     const sortedPlaylist = [...playlist].sort((a, b) => b.count - a.count);

//     let description = '';
//     const maxLength = 300;

//     for (let i = 0; i < sortedPlaylist.length; i++) {
//       const song = sortedPlaylist[i];
//       const songName = song.name;
//       const songCount = song.count;

//       const songDescription = `${songName} x${songCount}, `;

//       if (description.length + songDescription.length <= maxLength) {
//         description += songDescription;
//       } else {
//         description += '...';
//         break;
//       }
//     }

//     return description;
//   };

//   const generateName = (playlist) => {
//     const sortedPlaylist = [...playlist].sort((a, b) => b.count - a.count);
//     let name = '';
//     const maxLength = 100;

//     for (let i = 0; i < sortedPlaylist.length; i++) {
//       const song = sortedPlaylist[i];
//       const songName = song.name;

//       if (name.length + songName.length <= maxLength) {
//         name += songName + ', ';
//       } else {
//         name += '...';
//         break;
//       }
//     }

//     return name;
//   };

//   const includesNewJeansSong = () => {
//     const newJeansId = '6HvZYsbFfjnjFrWF950C9d';
//     return playlist.some((song) =>
//       song.artists.some((artist) => artist.id === newJeansId)
//     );
//   };

//   const generatePlaylist = async () => {
//     if (!includesNewJeansSong()) {
//       setNotification({
//         type: 'error',
//         message:
//           'Sorry, this tool is only inteded for bunnies. Add a song by NewJeans to your playlist and try again.',
//       });

//       setTimeout(() => setNotification(null), 5000);
//       return;
//     }
//     let playlistWithCount = [];

//     playlist.forEach((song) => {
//       for (let i = 0; i < song.count; i++) {
//         playlistWithCount.push(song);
//       }
//     });

//     let resultingPlaylist = [...playlistWithCount];

//     if (streamingFocus) {
//       resultingPlaylist = shuffle(resultingPlaylist);

//       for (let i = 0; i < resultingPlaylist.length - 1; i++) {
//         if (resultingPlaylist[i].id === resultingPlaylist[i + 1].id) {
//           for (let j = i + 2; j < resultingPlaylist.length; j++) {
//             if (resultingPlaylist[j].id !== resultingPlaylist[i].id) {
//               [resultingPlaylist[i + 1], resultingPlaylist[j]] = [
//                 resultingPlaylist[j],
//                 resultingPlaylist[i + 1],
//               ];
//               break;
//             }
//           }
//         }
//       }
//     }

//     const chunks = [];
//     while (resultingPlaylist.length) {
//       chunks.push(resultingPlaylist.splice(0, 100));
//     }

//     try {
//       const user = await spotifyApi.getMe();
//       const name = generateName(playlist);
//       const description = generateDescription(playlist);
//       const createdPlaylist = await spotifyApi.createPlaylist(user.id, {
//         name: name,
//         description: description,
//         public: true,
//       });

//       for (let chunk of chunks) {
//         await spotifyApi.addTracksToPlaylist(
//           createdPlaylist.id,
//           chunk.map((t) => t.uri)
//         );
//       }
//       setNotification({
//         type: 'success',
//         message: 'Playlist created successfully!',
//         playlistUrl: `https://open.spotify.com/playlist/${createdPlaylist.id}`,
//       });
//       setTimeout(() => {
//         setNotification(null);
//         clearAll();
//       }, 20000);
//     } catch (error) {
//       console.error(error);
//       setNotification({
//         type: 'error',
//         message: 'Error creating playlist. Please try again.',
//       });
//     }
//   };

//   const clearAll = () => {
//     setPlaylist([]);
//     setTrackCount({});
//   };

//   return {
//     playlist,
//     trackCount,
//     notification,
//     setNotification,
//     addToPlaylist,
//     addAlbumToPlaylist,
//     updatePlaylistItemCount,
//     removeFromPlaylist,
//     generatePlaylist,
//     clearAll,
//     streamingFocus,
//     setStreamingFocus,
//   };
// };

// export default usePlaylist;

import { useState, useMemo, useCallback } from 'react';
import spotifyApi from '../services/spotifyAuthService';

const NOTIFICATION_TIMEOUT = 5000;
const CLEAR_PLAYLIST_TIMEOUT = 20000;

const usePlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [trackCount, setTrackCount] = useState({});
  const [notification, setNotification] = useState(null);
  const [streamingFocus, setStreamingFocus] = useState(true);

  const addToPlaylist = (track) => {
    setPlaylist((prevState) => [...prevState, { ...track, count: 1 }]);
  };

  const addAlbumToPlaylist = async (albumId) => {
    try {
      const album = await spotifyApi.getAlbum(albumId);
      const tracks = album.tracks.items;
      const tracksWithCount = tracks.map((track) => ({
        ...track,
        album: { name: album.name, images: album.images }, // Add this line
        count: 1,
      }));
      setPlaylist((prevState) => [...prevState, ...tracksWithCount]);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePlaylistItemCount = (songId, count) => {
    setPlaylist((prevState) =>
      prevState.map((song) => (song.id === songId ? { ...song, count } : song))
    );
  };

  const removeFromPlaylist = (trackId) => {
    setPlaylist((prevPlaylistArray) =>
      prevPlaylistArray.filter((track) => track.id !== trackId)
    );
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const generateDescription = useMemo(() => {
    const sortedPlaylist = [...playlist].sort((a, b) => b.count - a.count);

    let description = '';
    const maxLength = 300;

    for (let i = 0; i < sortedPlaylist.length; i++) {
      const song = sortedPlaylist[i];
      const songName = song.name;
      const songCount = song.count;

      const songDescription = `${songName} x${songCount}, `;

      if (description.length + songDescription.length <= maxLength) {
        description += songDescription;
      } else {
        description += '...';
        break;
      }
    }

    return description;
  }, [playlist]);

  const generateName = useMemo(() => {
    const sortedPlaylist = [...playlist].sort((a, b) => b.count - a.count);
    let name = '';
    const maxLength = 100;

    for (let i = 0; i < sortedPlaylist.length; i++) {
      const song = sortedPlaylist[i];
      const songName = song.name;

      if (name.length + songName.length <= maxLength) {
        name += songName + ', ';
      } else {
        name += '...';
        break;
      }
    }

    return name;
  }, [playlist]);

  const includesNewJeansSong = useCallback(() => {
    const newJeansId = '6HvZYsbFfjnjFrWF950C9d';
    return playlist.some((song) =>
      song.artists.some((artist) => artist.id === newJeansId)
    );
  }, [playlist]);

  const generatePlaylist = useCallback(async () => {
    if (!includesNewJeansSong()) {
      setNotification({
        type: 'error',
        message:
          'Sorry, this tool is only intended for bunnies. Add a song by NewJeans to your playlist and try again.',
      });

      setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT);
      return;
    }
    let playlistWithCount = [];

    playlist.forEach((song) => {
      for (let i = 0; i < song.count; i++) {
        playlistWithCount.push(song);
      }
    });

    let resultingPlaylist = [...playlistWithCount];

    if (streamingFocus) {
      resultingPlaylist = shuffle(resultingPlaylist);

      for (let i = 0; i < resultingPlaylist.length - 1; i++) {
        if (resultingPlaylist[i].id === resultingPlaylist[i + 1].id) {
          for (let j = i + 2; j < resultingPlaylist.length; j++) {
            if (resultingPlaylist[j].id !== resultingPlaylist[i].id) {
              [resultingPlaylist[i + 1], resultingPlaylist[j]] = [
                resultingPlaylist[j],
                resultingPlaylist[i + 1],
              ];
              break;
            }
          }
        }
      }
    }

    const chunks = [];
    while (resultingPlaylist.length) {
      chunks.push(resultingPlaylist.splice(0, 100));
    }

    try {
      const user = await spotifyApi.getMe();
      const name = generateName;
      const description = generateDescription;
      const createdPlaylist = await spotifyApi.createPlaylist(user.id, {
        name: name,
        description: description,
        public: true,
      });

      for (let chunk of chunks) {
        await spotifyApi.addTracksToPlaylist(
          createdPlaylist.id,
          chunk.map((t) => t.uri)
        );
      }
      setNotification({
        type: 'success',
        message: 'Playlist created successfully!',
        playlistUrl: `https://open.spotify.com/playlist/${createdPlaylist.id}`,
      });
      // clear playlist after 20 seconds
      setTimeout(() => {
        setNotification(null);
        clearAll();
      }, CLEAR_PLAYLIST_TIMEOUT);
    } catch (error) {
      console.error(error);
      setNotification({
        type: 'error',
        message: 'Error creating playlist. Please try again.',
      });
    }
  }, [
    playlist,
    includesNewJeansSong,
    streamingFocus,
    generateName,
    generateDescription,
  ]);

  const clearAll = () => {
    setPlaylist([]);
    setTrackCount({});
  };

  return {
    playlist,
    trackCount,
    notification,
    setNotification,
    addToPlaylist,
    addAlbumToPlaylist,
    updatePlaylistItemCount,
    removeFromPlaylist,
    generatePlaylist,
    clearAll,
    streamingFocus,
    setStreamingFocus,
  };
};

export default usePlaylist;

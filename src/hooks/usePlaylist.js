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

// import { useState, useMemo, useCallback } from 'react';
// import spotifyApi from '../services/spotifyAuthService';

// const NOTIFICATION_TIMEOUT = 5000;
// const CLEAR_PLAYLIST_TIMEOUT = 20000;
// const MIN_DISTANCE = 4;

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
//         album: { name: album.name, images: album.images }, // Add this line
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

//   const generateDescription = useMemo(() => {
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
//   }, [playlist]);

//   const generateName = useMemo(() => {
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
//   }, [playlist]);

//   const includesNewJeansSong = useCallback(() => {
//     const newJeansId = '6HvZYsbFfjnjFrWF950C9d';
//     return playlist.some((song) =>
//       song.artists.some((artist) => artist.id === newJeansId)
//     );
//   }, [playlist]);

//   const generatePlaylist = useCallback(async () => {
//     if (!includesNewJeansSong()) {
//       setNotification({
//         type: 'error',
//         message:
//           'Sorry, this tool is only intended for bunnies. Add a song by NewJeans to your playlist and try again.',
//       });

//       setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT);
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

//       // for (let i = 0; i < resultingPlaylist.length - 1; i++) {
//       //   if (resultingPlaylist[i].id === resultingPlaylist[i + 1].id) {
//       //     for (let j = i + 2; j < resultingPlaylist.length; j++) {
//       //       if (resultingPlaylist[j].id !== resultingPlaylist[i].id) {
//       //         [resultingPlaylist[i + 1], resultingPlaylist[j]] = [
//       //           resultingPlaylist[j],
//       //           resultingPlaylist[i + 1],
//       //         ];
//       //         break;
//       //       }
//       //     }
//       //   }
//       // }
//       // for (let i = MIN_DISTANCE; i < resultingPlaylist.length - 1; i++) {
//       //   if (resultingPlaylist[i].id === resultingPlaylist[i + 1].id) {
//       //     let minRandomDistance = MIN_DISTANCE;
//       //     let maxRandomDistance = 2 * MIN_DISTANCE;

//       //     // Randomly choose a distance within the range [minRandomDistance, maxRandomDistance]
//       //     let distance = Math.floor(
//       //       Math.random() * (maxRandomDistance - minRandomDistance + 1) + minRandomDistance
//       //     );

//       //     let position = i - distance - 1;
//       //     while (position >= 0 && resultingPlaylist[position].id === resultingPlaylist[i].id) {
//       //       position--;
//       //     }
//       //     // Insert the song into the playlist at the calculated position
//       //     [resultingPlaylist[i + 1], resultingPlaylist[position + 1]] = [
//       //       resultingPlaylist[position + 1],
//       //       resultingPlaylist[i + 1],
//       //     ]
//       //   }
//       // }

//       for (let i = 0; i < resultingPlaylist.length - 1; i++) {
//         if (resultingPlaylist[i].id === resultingPlaylist[i + 1].id) {
//           // Find a non-identical track to swap with
//           let swapIndex = -1;
//           for (let j = i + 2; j < resultingPlaylist.length; j++) {
//             if (resultingPlaylist[j].id !== resultingPlaylist[i].id &&
//                 (j === i + 2 || resultingPlaylist[j].id !== resultingPlaylist[j - 1].id) &&
//                 (j === resultingPlaylist.length - 1 || resultingPlaylist[j].id !== resultingPlaylist[j + 1].id)) {
//               swapIndex = j;
//               break;
//             }
//           }

//           // If a swap is possible, perform the swap
//           if (swapIndex !== -1) {
//             [resultingPlaylist[i + 1], resultingPlaylist[swapIndex]] = [resultingPlaylist[swapIndex], resultingPlaylist[i + 1]];
//           } else {
//             // Handle the case where a swap is not possible (e.g., reshuffle, retry, or inform the user)
//             console.error("Couldn't avoid adjacent duplicates. You may want to reshuffle or handle this case differently.");
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
//       const name = generateName;
//       const description = generateDescription;
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
//       // clear playlist after 20 seconds
//       setTimeout(() => {
//         setNotification(null);
//         clearAll();
//       }, CLEAR_PLAYLIST_TIMEOUT);
//     } catch (error) {
//       console.error(error);
//       setNotification({
//         type: 'error',
//         message: 'Error creating playlist. Please try again.',
//       });
//     }
//   }, [
//     playlist,
//     includesNewJeansSong,
//     streamingFocus,
//     generateName,
//     generateDescription,
//   ]);

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

// Alternative solution for usePlaylist.js:

import { useState, useMemo, useCallback } from 'react';
import spotifyApi from '../services/spotifyAuthService';

const NOTIFICATION_TIMEOUT = 5000;
const CLEAR_PLAYLIST_TIMEOUT = 20000;

const usePlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [notification, setNotification] = useState(null);
  const [streamingFocus, setStreamingFocus] = useState(true);
  const [neededTracks, setNeededTracks] = useState(0);
  const [neededArtists, setNeededArtists] = useState(0);

  const shuffle = useCallback((array) => {
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
  }, []);

  const handleErrors = useCallback((error, userMessage) => {
    console.error(error);
    setNotification({ type: 'error', message: userMessage });
  }, []);

  const calculateScore = useCallback((track, resultingPlaylist) => {
    // Example scoring function; may need adjustment
    let score = Math.random(); // Start with some randomness

    // Penalize if the track or artist is the same as the last track in the resultingPlaylist
    if (resultingPlaylist.length > 0) {
      const lastTrack = resultingPlaylist[resultingPlaylist.length - 1];
      if (
        lastTrack.id === track.id ||
        lastTrack.artists.some((a) =>
          track.artists.map((ta) => ta.id).includes(a.id)
        )
      ) {
        score -= 1000; // Large penalty to prevent consecutive tracks/artists
      }
    }

    // Additional scoring logic can be added here
    const newJeansId = '6HvZYsbFfjnjFrWF950C9d';
    if (
      // If the track is by NewJeans, give it a boost
      track.artists.some((artist) => artist.id === newJeansId)
    ) {
      score += 100;
    }

    return score;
  }, []);

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

  // const generateName = useMemo(() => {
  //   const sortedPlaylist = [...playlist].sort((a, b) => b.count - a.count);
  //   let name = "";
  //   const maxLength = 100;
  //   for (let i = 0; i < sortedPlaylist.length; i++) {
  //     const song = sortedPlaylist[i];
  //     const songName = song.name;
  //     if (name.length + songName.length <= maxLength) {
  //       name += songName + ", ";
  //     } else {
  //       name += "...";
  //       break;
  //     }
  //   }
  //   return name;
  // }, [playlist]);

  const generateName = useMemo(() => {
    // name format will be "Artist x Artist x Artist x ..." based on how many times each artist appears in the playlist. If only once then we will not include that artist in the name. Only if their songs make up significant portions of the playlist will they be included in the name.
    const sortedPlaylist = [...playlist].sort((a, b) => b.count - a.count);
    let name = '';
    const maxLength = 100;
    let artistCountMap = new Map();
    for (let i = 0; i < sortedPlaylist.length; i++) {
      const song = sortedPlaylist[i];
      const songName = song.name;
      const songCount = song.count;
      const songDescription = `${songName} x${songCount}, `;
      if (name.length + songDescription.length <= maxLength) {
        name += songDescription;
      } else {
        name += '...';
        break;
      }
      song.artists.forEach((artist) => {
        artistCountMap.set(
          artist.id,
          (artistCountMap.get(artist.id) || 0) + song.count
        );
      });
    }
    let artistCountArray = Array.from(artistCountMap.entries());
    artistCountArray.sort((a, b) => b[1] - a[1]);

    let artistCount = 0;
    for (let i = 0; i < artistCountArray.length; i++) {
      if (artistCountArray[i][1] > 1) {
        artistCount++;
      }
    }
    if (artistCount > 0) {
      name = name.slice(0, -2); // Remove the last ", "
      name += ' x' + artistCount;
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
        playlistWithCount.push({ ...song }); // Creating a new object to ensure no reference issues
      }
    });

    let shuffledPlaylist = shuffle([...playlistWithCount]);

    let resultingPlaylist = [];
    while (shuffledPlaylist.length > 0) {
      let nextTrack = null;
      for (let i = 0; i < shuffledPlaylist.length; i++) {
        const candidate = shuffledPlaylist[i];

        // Conditions check
        if (
          (resultingPlaylist.length === 0 ||
            resultingPlaylist[resultingPlaylist.length - 1].id !==
              candidate.id) && // 4a
          (resultingPlaylist.length < 4 ||
            !resultingPlaylist
              .slice(-4)
              .some((track) => track.id === candidate.id)) && // 4c
          (!resultingPlaylist.length ||
            !resultingPlaylist[resultingPlaylist.length - 1].artists.some(
              (artist) => candidate.artists.map((a) => a.id).includes(artist.id)
            )) // 4b
        ) {
          nextTrack = candidate;
          shuffledPlaylist.splice(i, 1); // remove the chosen track from playlistWithCount
          break;
        }
      }

      if (!nextTrack) {
        // Soft fail - try the next best track for the next 5 tracks
        let alternativeFound = false;
        for (let i = 1; i < 5; i++) {
          nextTrack = shuffledPlaylist[i];
          if (
            nextTrack &&
            resultingPlaylist[resultingPlaylist.length - 1].id !== nextTrack.id
          ) {
            shuffledPlaylist.splice(i, 1); // remove the chosen track from playlistWithCount
            alternativeFound = true;
            break;
          }
        }

        if (!alternativeFound) {
          handleErrors(
            new Error('Track selection failed'),
            'Could not meet all conditions for track selection.'
          );
          return;
        }
      }

      resultingPlaylist.push(nextTrack);
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

      setTimeout(() => {
        setNotification(null);
        clearAll();
      }, CLEAR_PLAYLIST_TIMEOUT);
    } catch (error) {
      handleErrors(error, 'Error creating playlist. Please try again.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    playlist,
    shuffle,
    includesNewJeansSong,
    generateName,
    generateDescription,
    handleErrors,
    calculateScore,
  ]);

  const clearAll = useCallback(() => {
    setPlaylist([]);
  }, []);

  const isTrackInPlaylist = (trackId, playlist) => {
    return playlist.some((track) => track.id === trackId);
  };

  const addToPlaylist = useCallback(
    (track) => {
      // setPlaylist((prevState) => [...prevState, { ...track, count: 1 }]);
      if (!isTrackInPlaylist(track.id, playlist)) {
        setPlaylist((prevState) => [...prevState, { ...track, count: 1 }]);
      }
    },
    [playlist]
  );

  // const addAlbumToPlaylist = useCallback(
  //   async (albumId) => {
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
  //       handleErrors(
  //         error,
  //         'Error adding album to playlist. Please try again.'
  //       );
  //     }
  //   },
  //   [handleErrors]
  // );

  const addAlbumToPlaylist = useCallback(
    async (albumId) => {
      try {
        const album = await spotifyApi.getAlbum(albumId);
        const tracks = album.tracks.items;
        const tracksWithCount = tracks
          .filter((track) => !isTrackInPlaylist(track.id, playlist))
          .map((track) => ({
            ...track,
            album: { name: album.name, images: album.images },
            count: 1,
          }));
        setPlaylist((prevState) => [...prevState, ...tracksWithCount]);
      } catch (error) {
        handleErrors(
          error,
          'Error adding album to playlist. Please try again.'
        );
      }
    },
    [handleErrors, playlist]
  );

  // const addPlaylistToPlaylist = useCallback(
  //   async (playlistId) => {
  //     try {
  //       let offset = 0;
  //       let total = 0;
  //       let fetchedTracks = [];

  //       // Fetch all tracks from the playlist
  //       do {
  //         const playlistData = await spotifyApi.getPlaylistTracks(playlistId, {
  //           offset,
  //         });
  //         fetchedTracks = [
  //           ...fetchedTracks,
  //           ...playlistData.items.map((item) => item.track),
  //         ];
  //         total = playlistData.total;
  //         offset += playlistData.items.length;
  //       } while (fetchedTracks.length < total);

  //       const tracksWithCount = fetchedTracks.map((track) => ({
  //         ...track,
  //         album: { name: track.album.name, images: track.album.images },
  //         count: 1, // Adjust this if you have a specific count in mind
  //       }));

  //       // Add fetched tracks to the current playlist
  //       setPlaylist((prevState) => [...prevState, ...tracksWithCount]);
  //     } catch (error) {
  //       handleErrors(
  //         error,
  //         'Error adding playlist to playlist. Please try again.'
  //       );
  //     }
  //   },
  //   [handleErrors]
  // );

  const addPlaylistToPlaylist = useCallback(
    async (playlistId) => {
      try {
        let offset = 0;
        let total = 0;
        let fetchedTracks = [];

        do {
          const playlistData = await spotifyApi.getPlaylistTracks(playlistId, {
            offset,
          });
          fetchedTracks = [
            ...fetchedTracks,
            ...playlistData.items.map((item) => item.track),
          ];
          total = playlistData.total;
          offset += playlistData.items.length;
        } while (fetchedTracks.length < total);

        const tracksWithCount = fetchedTracks
          .filter((track) => !isTrackInPlaylist(track.id, playlist))
          .map((track) => ({
            ...track,
            album: { name: track.album.name, images: track.album.images },
            count: 1,
          }));

        setPlaylist((prevState) => [...prevState, ...tracksWithCount]);
      } catch (error) {
        handleErrors(
          error,
          'Error adding playlist to playlist. Please try again.'
        );
      }
    },
    [handleErrors, playlist]
  );

  // Add Recommendations:

  // const addRecommendsToPlaylist = useCallback(
  //   async (neededTracks, neededArtists) => {
  //     try {
  //       const seedTracks = playlist.map((track) => track.id).slice(0, 3);
  //       const seedArtists = [
  //         ...new Set(
  //           playlist.flatMap((track) =>
  //             track.artists.map((artist) => artist.id)
  //           )
  //         ),
  //       ].slice(0, 2);

  //       const currentTrackIds = new Set(playlist.map((track) => track.id));
  //       const currentArtistIds = new Set(
  //         playlist.flatMap((track) => track.artists.map((artist) => artist.id))
  //       );

  //       let recommendedTracksWithCount = [];
  //       let retryCount = 0; // To prevent infinite loops in edge cases

  //       while (
  //         recommendedTracksWithCount.length < neededTracks + neededArtists &&
  //         retryCount < 5 // Arbitrary retry limit to prevent excessive API calls
  //       ) {
  //         const recommendations = await spotifyApi.getRecommendations({
  //           seed_tracks: seedTracks,
  //           seed_artists: seedArtists,
  //           limit: 50, // Fetching in smaller chunks to manage API calls
  //         });

  //         const uniqueRecommendations = recommendations.tracks.filter(
  //           (recTrack) =>
  //             !currentTrackIds.has(recTrack.id) &&
  //             recTrack.artists.some(
  //               (artist) => !currentArtistIds.has(artist.id)
  //             )
  //         );

  //         recommendedTracksWithCount = [
  //           ...recommendedTracksWithCount,
  //           ...uniqueRecommendations
  //             .slice(
  //               0,
  //               neededTracks + neededArtists - recommendedTracksWithCount.length
  //             )
  //             .map((track) => ({ ...track, count: 1 })),
  //         ];

  //         retryCount++;
  //       }

  //       if (recommendedTracksWithCount.length < neededTracks + neededArtists) {
  //         // Handle scenarios where not enough recommendations could be fetched
  //         console.warn('Could not fetch enough unique recommendations.');
  //         handleErrors(
  //           new Error('Insufficient unique recommendations'),
  //           'Could not fetch enough unique recommendations. Please try again or modify your playlist.'
  //         );
  //         return;
  //       }

  //       setPlaylist((prevState) => [
  //         ...prevState,
  //         ...recommendedTracksWithCount,
  //       ]);
  //     } catch (error) {
  //       console.error(error);
  //       handleErrors(
  //         error,
  //         'Error adding recommended tracks to playlist. Please try again.'
  //       );
  //     }
  //   },
  //   [playlist, handleErrors]
  // );

  // const addRecommendsToPlaylist = useCallback(
  //   async (neededTracks, neededArtists) => {
  //     try {
  //       // Extract all possible track and artist seeds
  //       const allTrackSeeds = playlist.map((track) => track.id);
  //       const allArtistSeeds = [
  //         ...new Set(
  //           playlist.flatMap((track) =>
  //             track.artists.map((artist) => artist.id)
  //           )
  //         ),
  //       ];

  //       const currentTrackIds = new Set(playlist.map((track) => track.id));
  //       const currentArtistIds = new Set(
  //         playlist.flatMap((track) => track.artists.map((artist) => artist.id))
  //       );

  //       let recommendedTracksWithCount = [];
  //       let retryCount = 0; // To prevent infinite loops in edge cases

  //       while (
  //         recommendedTracksWithCount.length < neededTracks + neededArtists &&
  //         retryCount < 5 // Arbitrary retry limit to prevent excessive API calls
  //       ) {
  //         // Randomly select seeds
  //         const seedTracks = shuffle(allTrackSeeds).slice(0, 3);
  //         const seedArtists = shuffle(allArtistSeeds).slice(0, 2);

  //         const recommendations = await spotifyApi.getRecommendations({
  //           seed_tracks: seedTracks,
  //           seed_artists: seedArtists,
  //           limit: 50, // Fetching in smaller chunks to manage API calls
  //         });

  //         const uniqueRecommendations = recommendations.tracks.filter(
  //           (recTrack) =>
  //             !currentTrackIds.has(recTrack.id) &&
  //             recTrack.artists.some(
  //               (artist) => !currentArtistIds.has(artist.id)
  //             )
  //         );

  //         recommendedTracksWithCount = [
  //           ...recommendedTracksWithCount,
  //           ...uniqueRecommendations
  //             .slice(
  //               0,
  //               neededTracks + neededArtists - recommendedTracksWithCount.length
  //             )
  //             .map((track) => ({ ...track, count: 1 })),
  //         ];

  //         retryCount++;
  //       }

  //       if (recommendedTracksWithCount.length < neededTracks + neededArtists) {
  //         // Handle scenarios where not enough recommendations could be fetched
  //         console.warn('Could not fetch enough unique recommendations.');
  //         handleErrors(
  //           new Error('Insufficient unique recommendations'),
  //           'Could not fetch enough unique recommendations. Please try again or modify your playlist.'
  //         );
  //         return;
  //       }

  //       setPlaylist((prevState) => [
  //         ...prevState,
  //         ...recommendedTracksWithCount,
  //       ]);
  //     } catch (error) {
  //       console.error(error);
  //       handleErrors(
  //         error,
  //         'Error adding recommended tracks to playlist. Please try again.'
  //       );
  //     }
  //   },
  //   [playlist, handleErrors]
  // );

  // const addRecommendsToPlaylist = useCallback(
  //   async (neededTracks, neededArtists) => {
  //     try {
  //       const allTrackSeeds = playlist.map((track) => track.id);
  //       const allArtistSeeds = [
  //         ...new Set(
  //           playlist.flatMap((track) =>
  //             track.artists.map((artist) => artist.id)
  //           )
  //         ),
  //       ];

  //       let recommendedTracksWithCount = [];
  //       let retryCount = 0;

  //       while (
  //         recommendedTracksWithCount.length < neededTracks + neededArtists &&
  //         retryCount < 5
  //       ) {
  //         const seedTracks = shuffle(allTrackSeeds).slice(0, 3);
  //         const seedArtists = shuffle(allArtistSeeds).slice(0, 2);

  //         const recommendations = await spotifyApi.getRecommendations({
  //           seed_tracks: seedTracks,
  //           seed_artists: seedArtists,
  //           limit: 50,
  //         });

  //         const uniqueRecommendations = recommendations.tracks.filter(
  //           (recTrack) =>
  //             !isTrackInPlaylist(recTrack.id, playlist) &&
  //             recTrack.artists.every(
  //               (artist) => !isTrackInPlaylist(artist.id, playlist)
  //             )
  //         );

  //         recommendedTracksWithCount = [
  //           ...recommendedTracksWithCount,
  //           ...uniqueRecommendations
  //             .slice(
  //               0,
  //               neededTracks + neededArtists - recommendedTracksWithCount.length
  //             )
  //             .map((track) => ({ ...track, count: 1 })),
  //         ];

  //         retryCount++;
  //       }

  //       if (recommendedTracksWithCount.length < neededTracks + neededArtists) {
  //         handleErrors(
  //           new Error('Insufficient unique recommendations'),
  //           'Could not fetch enough unique recommendations. Please try again or modify your playlist.'
  //         );
  //         return;
  //       }

  //       setPlaylist((prevState) => [
  //         ...prevState,
  //         ...recommendedTracksWithCount,
  //       ]);
  //     } catch (error) {
  //       handleErrors(
  //         error,
  //         'Error adding recommended tracks to playlist. Please try again.'
  //       );
  //     }
  //   },
  //   [playlist, handleErrors]
  // );

  const addRecommendsToPlaylist = useCallback(
    async (neededTracks, neededArtists) => {
      try {
        const allTrackSeeds = playlist.map((track) => track.id);
        const allArtistSeeds = [
          ...new Set(
            playlist.flatMap((track) =>
              track.artists.map((artist) => artist.id)
            )
          ),
        ];

        let recommendedTracksWithCount = [];
        let retryCount = 0;

        while (
          recommendedTracksWithCount.length < neededTracks + neededArtists &&
          retryCount < 10
        ) {
          const seedTracks = shuffle(allTrackSeeds).slice(0, 3);
          const seedArtists = shuffle(allArtistSeeds).slice(0, 2);

          const recommendations = await spotifyApi.getRecommendations({
            seed_tracks: seedTracks,
            seed_artists: seedArtists,
            limit: 50,
          });

          const uniqueRecommendations = recommendations.tracks.filter(
            (recTrack) =>
              // Ensure the track doesn't exist in the playlist
              !isTrackInPlaylist(recTrack.id, playlist) &&
              // Ensure the track doesn't exist in the current recommendation set
              !recommendedTracksWithCount.some(
                (track) => track.id === recTrack.id
              ) &&
              recTrack.artists.every(
                (artist) => !isTrackInPlaylist(artist.id, playlist)
              )
          );

          recommendedTracksWithCount = [
            ...recommendedTracksWithCount,
            ...uniqueRecommendations
              .slice(
                0,
                neededTracks + neededArtists - recommendedTracksWithCount.length
              )
              .map((track) => ({ ...track, count: 1 })),
          ];

          retryCount++;
        }

        if (recommendedTracksWithCount.length < neededTracks + neededArtists) {
          handleErrors(
            new Error('Insufficient unique recommendations'),
            'Could not fetch enough unique recommendations. Please try again or modify your playlist.'
          );
          return;
        }

        setPlaylist((prevState) => [
          ...prevState,
          ...recommendedTracksWithCount,
        ]);
      } catch (error) {
        handleErrors(
          error,
          'Error adding recommended tracks to playlist. Please try again.'
        );
      }
    },
    [playlist, shuffle, handleErrors]
  );

  const updatePlaylistItemCount = useCallback((songId, count) => {
    setPlaylist((prevState) =>
      prevState.map((song) =>
        song.id === songId ? { ...song, count: parseInt(count, 10) } : song
      )
    );
  }, []);

  const removeFromPlaylist = useCallback((trackId) => {
    setPlaylist((prevPlaylistArray) =>
      prevPlaylistArray.filter((track) => track.id !== trackId)
    );
  }, []);

  // const calculateWarningMessage = () => {
  //   if (playlist.length === 0) {
  //     return null;
  //   }

  //   // Calculate the maximum count of a single track and a single artist
  //   let maxTrackRepeats = Math.max(...playlist.map((song) => song.count));
  //   let artistCountMap = new Map();

  //   playlist.forEach((song) => {
  //     song.artists.forEach((artist) => {
  //       artistCountMap.set(
  //         artist.id,
  //         (artistCountMap.get(artist.id) || 0) + song.count
  //       );
  //     });
  //   });

  //   let maxArtistRepeats = Math.max(...Array.from(artistCountMap.values()));

  //   // Calculate the minimum required unique tracks and artists to avoid back-to-back repeats
  //   let neededTracks =
  //     maxTrackRepeats + 1 - new Set(playlist.map((song) => song.id)).size;
  //   let neededArtists = maxArtistRepeats + 1 - artistCountMap.size;

  //   // Construct warning message based on the needed tracks and artists
  //   if (neededTracks > 0 && neededArtists > 0) {
  //     return `Note: Add ${neededTracks} more unique track(s) and tracks from ${neededArtists} more unique artist(s) to ensure variety in your playlist.`;
  //   } else if (neededTracks > 0) {
  //     return `Note: Add ${neededTracks} more unique track(s) to ensure no two identical tracks are back-to-back.`;
  //   } else if (neededArtists > 0) {
  //     return `Note: Add tracks from ${neededArtists} more unique artist(s) to ensure no two tracks from the same artist are back-to-back.`;
  //   } else {
  //     return null;
  //   }
  // };

  const calculateWarningMessage = () => {
    if (playlist.length === 0) {
      return null;
    }

    // Calculate the maximum count of a single track and a single artist
    let maxTrackRepeats = Math.max(...playlist.map((song) => song.count));
    let artistCountMap = new Map();

    playlist.forEach((song) => {
      song.artists.forEach((artist) => {
        artistCountMap.set(
          artist.id,
          (artistCountMap.get(artist.id) || 0) + song.count
        );
      });
    });

    let maxArtistRepeats = Math.max(...Array.from(artistCountMap.values()));

    // Calculate the minimum required unique tracks and artists to avoid back-to-back repeats
    let calcNeededTracks =
      maxTrackRepeats + 1 - new Set(playlist.map((song) => song.id)).size;
    let calcNeededArtists = maxArtistRepeats + 1 - artistCountMap.size;

    setNeededTracks(Math.max(0, calcNeededTracks));
    setNeededArtists(Math.max(0, calcNeededArtists));

    // Construct warning message based on the needed tracks and artists
    if (calcNeededTracks > 0 && calcNeededArtists > 0) {
      return `Note: Add ${calcNeededTracks} more unique track(s) and tracks from ${calcNeededArtists} more unique artist(s) to ensure variety in your playlist.`;
    } else if (calcNeededTracks > 0) {
      return `Note: Add ${calcNeededTracks} more unique track(s) to ensure no two identical tracks are back-to-back.`;
    } else if (calcNeededArtists > 0) {
      return `Note: Add tracks from ${calcNeededArtists} more unique artist(s) to ensure no two tracks from the same artist are back-to-back.`;
    } else {
      return null;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const warningMessage = useMemo(() => calculateWarningMessage(), [playlist]);

  console.log('neededTracks: ', neededTracks);
  console.log('neededArtists: ', neededArtists);

  return {
    playlist,
    notification,
    setNotification,
    warningMessage,
    addToPlaylist,
    addAlbumToPlaylist,
    addPlaylistToPlaylist,
    addRecommendsToPlaylist,
    neededArtists,
    neededTracks,
    updatePlaylistItemCount,
    removeFromPlaylist,
    generatePlaylist,
    clearAll,
    streamingFocus,
    setStreamingFocus,
  };
};

export default usePlaylist;

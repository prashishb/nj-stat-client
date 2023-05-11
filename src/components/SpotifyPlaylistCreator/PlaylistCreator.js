import React, { useState, useEffect, useRef } from 'react';
import spotifyApi from '../../services/spotifyAuthService';
import useSpotifySearch from '../../hooks/useSpotifySearch';
import usePlaylist from '../../hooks/usePlaylist';
import SearchResult from './SearchResults';
import PlaylistItem from './PlaylistItem';

const PlaylistCreator = () => {
  const { searchQuery, setSearchQuery, searchResults } =
    useSpotifySearch(spotifyApi);
  const {
    playlist,
    addToPlaylist,
    addAlbumToPlaylist,
    removeFromPlaylist,
    updatePlaylistItemCount,
    generatePlaylist,
    clearAll,
    setNotification,
    notification,
    // streamingFocus,
    // setStreamingFocus,
  } = usePlaylist(spotifyApi);
  const [dropdownVisible, setDropdownVisible] = useState(true);

  const dropdownRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    if (searchResults.length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchResults]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  const handleClick = (item) => {
    setDropdownVisible(false);
    if (item.type === 'track') {
      addToPlaylist(item);
    } else if (item.type === 'album') {
      addAlbumToPlaylist(item.id);
    } else {
      console.error('Unsupported item type:', item.type);
    }
    setSearchQuery('');
    setDropdownVisible(false);
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !searchInputRef.current.contains(e.target)
    ) {
      setDropdownVisible(false);
    }
  };

  // const handleStreamingFocusToggle = () => {
  //   setStreamingFocus((prevState) => !prevState);
  // };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='container playlist-creator-form-container mt-2'>
      <h1 className='mb-4 playlist-creator-title'>Custom Playlist Creator</h1>

      <div
        className='input-group mb-2 position-relative'
        style={{ borderRadius: '25px' }}
      >
        <input
          className='form-control mb-2'
          type='text'
          ref={searchInputRef}
          placeholder='Start typing song name, artist, or album...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '25px',
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '16px',
          }}
        />
        {dropdownVisible && searchResults && searchResults.length > 0 ? (
          <ul
            className='dropdown-menu show position-absolute'
            ref={dropdownRef}
            style={{
              width: '100%',
              top: 'calc(100% + 5px)',
              overflowY: 'scroll',
              height: 'auto',
              maxHeight: '400px',
              zIndex: '1000',
            }}
          >
            {searchResults.map((item) => (
              <SearchResult
                key={item.id}
                item={item}
                type={item.type}
                onClick={handleClick}
              />
            ))}
          </ul>
        ) : null}
      </div>
      <div
        className={`song-list ${
          playlist && playlist.length > 0 && 'song-list-item-added p-3 pb-1'
        }`}
      >
        {playlist &&
          playlist.map((song) => (
            <PlaylistItem
              key={song.id}
              song={song}
              count={song.count}
              updatePlaylistItemCount={(count) =>
                updatePlaylistItemCount(song.id, count)
              }
              removeFromPlaylist={() => removeFromPlaylist(song.id)}
            />
          ))}
      </div>
      {notification && (
        <div
          className={`alert ${
            notification.type === 'success' ? 'alert-success' : 'alert-danger'
          } mt-3`}
          role='alert'
        >
          {notification.message}
          {notification.playlistUrl && (
            <div>
              <a
                href={notification.playlistUrl}
                target='_blank'
                rel='noreferrer'
                className='ml-2'
              >
                View Playlist
              </a>
            </div>
          )}
        </div>
      )}
      {playlist && playlist.length > 0 && (
        <div className='d-flex justify-content-between'>
          <button
            className='btn btn-green-moon mt-3 create-btn'
            onClick={generatePlaylist}
            style={{
              width: '45%',
              padding: '12px 25px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              marginRight: '5%',
            }}
          >
            Create
          </button>
          <button
            className='btn btn-danger mt-3 clear-btn'
            onClick={clearAll}
            style={{
              width: '45%',
              backgroundColor: '#dc3545',
              borderColor: '#dc3545',
              padding: '12px 25px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            Clear List
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaylistCreator;

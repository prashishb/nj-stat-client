import React, { useEffect, useState } from 'react';
import spotifyApi from '../../services/spotifyAuthService';
import UserInformation from './UserInformation';
import PlaylistCreator from './PlaylistCreator';
import usePlaylist from '../../hooks/usePlaylist';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = 'playlist-modify-public playlist-modify-private';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;

const SpotifyPlaylistCreator = () => {
  const [accessToken, setAccessToken] = useState('');
  const playlist = usePlaylist(accessToken);

  const validateAccessToken = async (accessToken) => {
    if (!accessToken) return false;
    try {
      spotifyApi.setAccessToken(accessToken);
      await spotifyApi.getMe();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('spotify_access_token');

    if (storedAccessToken) {
      (async () => {
        const isValid = await validateAccessToken(storedAccessToken);
        if (isValid) {
          setAccessToken(storedAccessToken);
        } else {
          handleLogout();
        }
      })();
    }
  }, []);

  const handleLogout = () => {
    spotifyApi.setAccessToken(null);
    setAccessToken(null);
    localStorage.removeItem('spotify_access_token');
  };

  useEffect(() => {
    if (accessToken) {
      const checkTokenExpiration = async () => {
        try {
          await spotifyApi.getMe();
        } catch (error) {
          if (error.status === 401) {
            alert(
              'Your Spotify access token has expired. Please log in again.'
            );
            handleLogout();
          }
        }
      };
      const interval = setInterval(checkTokenExpiration, 1000 * 60 * 10);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  return (
    <div className='spotify-playlist-creator-container'>
      <div>
        {accessToken ? (
          <>
            <UserInformation onLogout={handleLogout} />
            <PlaylistCreator handleLogout={handleLogout} {...playlist} />
          </>
        ) : (
          <div className='container login-container text-center border-light rounded-2 p-4 bg-light-subtle bg-opacity-10'>
            <h1>Create Focus Playlists</h1>
            <p>
              Connect your Spotify account and create playlists with ease. Add
              songs, set how many times they should appear in your playlist, and
              we'll take care of the rest.
            </p>
            <a href={AUTH_URL} className='btn btn-green-moon'>
              Login with Spotify
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyPlaylistCreator;

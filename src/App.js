import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SpotifyPlaylistCreator from './components/SpotifyPlaylistCreator';
import Callback from './components/SpotifyPlaylistCreator/Callback';
import YouTube from './components/YouTube';
import ComingSoon from './components/ComingSoon';
import { fetchArtistIds } from './services/spotifyStatsService';

function App() {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const [SpotifyArtistIds, setSpotifyArtistIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistIds = await fetchArtistIds();
        setSpotifyArtistIds(artistIds);
      } catch (err) {
        console.error('Error fetching artist ids:', err);
      }
    };
    fetchData();
  }, []);

  console.log('SpotifyArtistIds:', SpotifyArtistIds);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home spotifyArtistIds={SpotifyArtistIds} />}
        />
        {isFeatureEnabled ? (
          <Route
            path='/spotify-playlist-creator'
            element={<SpotifyPlaylistCreator />}
          />
        ) : (
          <Route
            path='/spotify-playlist-creator'
            element={
              <ComingSoon
                isFeatureEnabled={isFeatureEnabled}
                setIsFeatureEnabled={setIsFeatureEnabled}
              />
            }
          />
        )}
        <Route path='/callback' element={<Callback />} />
        <Route path='/youtube' element={<YouTube />} />
      </Routes>
    </div>
  );
}

export default App;

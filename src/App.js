import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SpotifyPlaylistCreator from './components/SpotifyPlaylistCreator';
import Callback from './components/SpotifyPlaylistCreator/Callback';
import YouTube from './components/YouTube';
import ComingSoon from './components/ComingSoon';
import useFetchArtistIds from './hooks/useFetchArtistIds';

function App() {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const spotifyArtistIds = useFetchArtistIds();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home spotifyArtistIds={spotifyArtistIds} />}
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

import { useState, useEffect } from 'react';
import spotifyApi from '../../services/spotifyAuthService';
import avatar from '../../assets/avatar.png';

const UserInformation = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState({
    imageUrl: '',
    displayName: '',
    playlistsCount: 0,
    followers: 0,
  });

  const defaultImage = avatar;

  useEffect(() => {
    const getUserInfo = async () => {
      const [user, playlists] = await Promise.all([
        spotifyApi.getMe(),
        spotifyApi.getUserPlaylists(),
      ]);

      const imageUrl = user.images.length ? user.images[0].url : defaultImage;
      setUserInfo({
        imageUrl,
        displayName: user.display_name,
        playlistsCount: playlists.total,
        followers: user.followers.total,
      });
    };

    getUserInfo();
  }, [defaultImage]);

  return (
    <div className='container user-info-container my-4'>
      <div className='d-flex align-items-center'>
        <img
          src={userInfo.imageUrl || defaultImage}
          alt='Profile'
          className='me-3'
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        <div className='d-flex flex-column align-items-start justify-content-center'>
          <div className='mb-2'>
            <span className='fw-bold'>Display Name:</span>{' '}
            {userInfo.displayName}
          </div>
          <div className='mb-2'>
            <span className='fw-bold'>Current Playlists:</span>{' '}
            {userInfo.playlistsCount}
          </div>
          <div className='mb-2'>
            <span className='fw-bold'>Followers:</span> {userInfo.followers}
          </div>
          <div className='mb-2'>
            <button className='btn btn-danger w-100 mt-2' onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;

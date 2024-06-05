import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import ToggleButton from './ToggleButton';
import { FaCaretDown, FaCaretUp, FaSpotify } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import useTheme from '../hooks/useTheme';
import useDropdown from '../hooks/useDropdown';

const Navbar = () => {
  const [theme, toggleTheme] = useTheme();
  const [dropdownOpen, toggleDropdown, closeNavbar] = useDropdown();

  const handleThemeToggle = () => {
    toggleTheme();
    closeNavbar();
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${theme} container navbar-container mt-0`}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <Logo
            className='navbar-logo'
            fill={theme === 'light' ? '#000' : '#adb5bd'}
            style={{ height: '30px' }}
          />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse mt-2' id='navbarNav'>
          <div className={`navbar-items-container ${theme} ms-auto`}>
            <ul className='navbar-nav gap-2'>
              <li className='nav-item dropdown'>
                <NavLink
                  href='/'
                  className='nav-link d-flex align-items-center text-body'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded={dropdownOpen}
                  onClick={toggleDropdown}
                >
                  <span className='spotify-icon d-flex align-items-center'>
                    <FaSpotify size={20} />
                  </span>
                  <span className='spotify-label'>Spotify</span>
                  <span className='dropdown-icon d-none d-lg-inline'>
                    <FaCaretDown />
                  </span>
                  <span className='dropdown-icon d-inline-block d-lg-none ms-auto'>
                    {dropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
                  </span>
                </NavLink>
                <ul
                  className='dropdown-menu dropdown-menu-size dropdown-menu-end'
                  aria-labelledby='navbarDropdown'
                >
                  <li>
                    <Link
                      to='/'
                      className='dropdown-item'
                      onClick={() => {
                        toggleDropdown();
                        closeNavbar();
                      }}
                    >
                      Stats
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/spotify-playlist-creator'
                      className='dropdown-item'
                      onClick={() => {
                        toggleDropdown();
                        closeNavbar();
                      }}
                    >
                      Create Playlist
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <NavLink
                  to='/youtube'
                  className='nav-link d-flex align-items-center text-body'
                  onClick={closeNavbar}
                >
                  <span className='youtube-icon d-flex align-items-center'>
                    <IoLogoYoutube size={20} />
                  </span>
                  <span className='youtube-label'>YouTube</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <button
                  className={`p-0 btn d-flex align-items-center toggle-button ${
                    theme === 'light'
                      ? 'toggle-button-light'
                      : 'toggle-button-dark'
                  }`}
                  onClick={handleThemeToggle}
                >
                  <ToggleButton theme={theme} />
                  <span className='theme-label d-inline-block d-lg-none'>
                    {theme === 'light' ? 'Use Dark Mode' : 'Use Light Mode'}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = ({ theme }) => (
  <div>
    {theme === 'light' ? (
      <FaMoon className='toggle-icon' />
    ) : (
      <FaSun className='toggle-icon' />
    )}
  </div>
);

export default ToggleButton;

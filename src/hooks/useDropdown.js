import { useState } from 'react';

const useDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (window.innerWidth < 991) {
      navbarToggler.click();
    }
  };

  return [dropdownOpen, toggleDropdown, closeNavbar];
};

export default useDropdown;

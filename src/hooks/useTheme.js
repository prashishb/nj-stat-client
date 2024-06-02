import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(
    document.documentElement.className || 'light'
  );

  useEffect(() => {
    const classObserver = new MutationObserver(() => {
      setTheme(document.documentElement.className);
    });

    classObserver.observe(document.documentElement, { attributes: true });

    return () => classObserver.disconnect();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setTheme(prefersDarkScheme ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('navbar-light', theme === 'light');
    navbar.classList.toggle('navbar-dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return [theme, toggleTheme];
};

export default useTheme;

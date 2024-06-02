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

  return theme;
};

export default useTheme;

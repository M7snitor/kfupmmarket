import { useEffect, useState } from 'react';
import moonSunIcon from '../assets/icons/moonsun.svg'; // Adjust path if different

function MorePage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>More Page</h2>
      <p>Additional settings and features will be added here.</p>
      <button
        onClick={toggleTheme}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--gray-border)',
          background: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <img src={moonSunIcon} alt="Toggle Theme" style={{ width: 20, height: 20 }} />
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}

export default MorePage;

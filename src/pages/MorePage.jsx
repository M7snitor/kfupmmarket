import { useState } from 'react';
import { ReactComponent as MoonSunIcon } from '../assets/icons/moonsun.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phonef.svg';
import { ReactComponent as MailIcon } from '../assets/icons/mailf.svg';

function MorePage() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setDarkMode(!darkMode);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        <button onClick={toggleTheme} style={styles.cardBtn}>
          <MoonSunIcon style={styles.icon} />
          <span style={styles.btnText}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <div style={styles.supportBox}>
        <h4 style={styles.supportTitle}>Customer Support</h4>
        <div style={styles.supportItem}>
          <PhoneIcon style={styles.supportIcon} />
          <span>+966 55 555 5555</span>
        </div>
        <div style={styles.supportItem}>
          <MailIcon style={styles.supportIcon} />
          <span>support@kfupmmarket.sa</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '2rem 1rem',
    color: 'var(--text-dark)',
    backgroundColor: 'var(--white)',
    minHeight: '100vh',
    userSelect: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    justifyItems: 'center',
  },
  cardBtn: {
    width: '100%',
    maxWidth: 140,
    aspectRatio: '1 / 1',
    border: '1px solid var(--gray-border)',
    background: 'var(--white)',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--text-dark)',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 6,
    fill: 'currentColor',
  },
  btnText: {
    fontSize: '0.85rem',
  },
  supportBox: {
    marginTop: '3rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    opacity: 0.9,
  },
  supportTitle: {
    fontSize: '1rem',
    marginBottom: '0.8rem',
  },
  supportItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  supportIcon: {
    width: 18,
    height: 18,
    fill: 'currentColor',
  },
};

export default MorePage;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ae from '../assets/clubs/ae.jpeg';
import consulting from '../assets/clubs/consulting.jpeg';
import cyclists from '../assets/clubs/cyclists.jpeg';
import ie from '../assets/clubs/ie.jpeg';
import media from '../assets/clubs/media.jpeg';

import furnitureIcon from '../assets/icons/chair.png';
import electronicsIcon from '../assets/icons/electronics.png';
import booksIcon from '../assets/icons/book.png';
import toolsIcon from '../assets/icons/tools.png';
import allIcon from '../assets/icons/new.png';
import dropdownIcon from '../assets/icons/dropdown.svg';

import logo from '../assets/LogoNameAlpha.png';

function HomePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({ green: '#00813e' });
  const [clubOpen, setClubOpen] = useState(true);
  const [resellOpen, setResellOpen] = useState(true);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setTheme({
      green: root.getPropertyValue('--primary-green') || '#00813e',
    });
  }, []);

  const handleClick = (seller, category, club = null) => {
    const query = new URLSearchParams();
    query.set('seller', seller);
    if (category !== 'All') query.set('category', category);
    if (seller === 'Clubs' && club && club !== 'All') query.set('club', club);
    navigate(`/browse?${query.toString()}`);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageContent}>
        <img src={logo} alt="KFUPM Market Logo" style={styles.logo} />

        {/* Club Section */}
        <div style={styles.section}>
          <div style={{ ...styles.headerCapsule, backgroundColor: theme.green }} onClick={() => setClubOpen(!clubOpen)}>
            <img src={dropdownIcon} alt="toggle" style={{ ...styles.dropdownIcon, transform: clubOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            <div>
              <div style={styles.headerText}>KFUPM Club services</div>
              <div style={styles.subText}>Support your favorite clubs</div>
            </div>
          </div>
          <div
            style={{
              ...styles.animatedGrid,
              maxHeight: clubOpen ? '500px' : '0',
              opacity: clubOpen ? 1 : 0,
              marginTop: clubOpen ? 10 : 0,
            }}
          >
            {[{ img: allIcon, label: 'All' }, { img: media, label: 'Media' }, { img: consulting, label: 'Consulting' }, { img: cyclists, label: 'Cyclists' }, { img: ae, label: 'AE' }, { img: ie, label: 'IE' }].map((club, i) => (
              <div
                key={i}
                style={{ ...styles.resellCard, cursor: 'pointer' }}
                onClick={() => handleClick('Clubs', 'All', club.label)}
              >
                <img src={club.img} alt={club.label} style={styles.icon} />
                <span>{club.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resell Section */}
        <div style={styles.section}>
          <div style={{ ...styles.headerCapsule, backgroundColor: theme.green }} onClick={() => setResellOpen(!resellOpen)}>
            <img src={dropdownIcon} alt="toggle" style={{ ...styles.dropdownIcon, transform: resellOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            <div>
              <div style={styles.headerText}>KFUPM Student resell</div>
              <div style={styles.subText}>Help students while saving money</div>
            </div>
          </div>
          <div
            style={{
              ...styles.animatedGrid,
              maxHeight: resellOpen ? '500px' : '0',
              opacity: resellOpen ? 1 : 0,
              marginTop: resellOpen ? 10 : 0,
            }}
          >
            {[{ img: allIcon, label: 'All' }, { img: furnitureIcon, label: 'Furniture' }, { img: electronicsIcon, label: 'Electronics' }, { img: booksIcon, label: 'Books' }, { img: toolsIcon, label: 'Tools' }].map((item, i) => (
              <div
                key={i}
                style={{ ...styles.resellCard, cursor: 'pointer' }}
                onClick={() => handleClick('Resell', item.label)}
              >
                <img src={item.img} alt={item.label} style={styles.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    paddingBottom: '4.5rem',
  },
  pageContent: {
    padding: '1rem',
  },
  logo: {
    width: 240,
    margin: '0 auto 1rem',
    display: 'block',
  },
  section: {
    marginBottom: 30,
  },
  headerCapsule: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 30,
    padding: '0.75rem 1rem',
    color: 'white',
    cursor: 'pointer',
    gap: 10,
  },
  headerText: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: '0.75rem',
    opacity: 0.9,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    filter: 'brightness(0) invert(1)',
    transition: 'transform 0.3s ease',
  },
  animatedGrid: {
    overflow: 'hidden',
    transition: 'max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    justifyItems: 'center',
  },
  resellCard: {
    border: '1px solid #ccc',
    borderRadius: 12,
    width: 100,
    height: 100,
    textAlign: 'center',
    fontSize: '0.85rem',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  icon: {
    width: 34,
    height: 34,
    objectFit: 'contain',
    marginBottom: 6,
  },
};

export default HomePage;

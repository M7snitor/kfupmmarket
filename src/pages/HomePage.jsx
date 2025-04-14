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
import newIcon from '../assets/icons/new.png';

import logo from '../assets/LogoNameAlpha.png';

function HomePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({ green: '#00813e' });
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setTheme({
      green: root.getPropertyValue('--primary-green') || '#00813e',
    });
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/browse?category=${encodeURIComponent(category)}`);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageContent}>
        <img src={logo} alt="KFUPM Market Logo" style={styles.logo} />

        <div style={styles.section}>
          <div style={styles.sectionHeader}>KFUPM Club services</div>
          <p style={styles.sectionSub}>Support your favorite clubs</p>
          <div style={styles.grid}>
            {[ae, consulting, cyclists, ie, media].map((img, i) => (
              <div key={i} style={styles.clubCard}>
                <img src={img} alt={`club-${i}`} style={styles.clubImage} />
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>KFUPM Student resell</div>
          <p style={styles.sectionSub}>Help students while saving money</p>
          <div style={styles.grid}>
            {[
              { img: furnitureIcon, label: 'Furniture' },
              { img: electronicsIcon, label: 'Electronics' },
              { img: booksIcon, label: 'Books' },
              { img: toolsIcon, label: 'Tools' },
              { img: newIcon, label: 'New' },
            ].map((item, i) => (
              <div
                key={i}
                style={{ ...styles.resellCard, cursor: 'pointer' }}
                onClick={() => handleCategoryClick(item.label)}
              >
                <img src={item.img} alt={item.label} style={styles.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Search for specific items with name/ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchEnter}
          style={styles.search}
        />
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
  sectionHeader: {
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '1px solid #ccc',
    padding: '0.5rem',
    borderRadius: 30,
    textAlign: 'center',
  },
  sectionSub: {
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center',
    margin: '0.5rem 0 1rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    justifyItems: 'center',
  },
  clubCard: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  resellCard: {
    border: '1px solid #ccc',
    borderRadius: 10,
    width: 80,
    height: 80,
    textAlign: 'center',
    fontSize: '0.8rem',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  icon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
    marginBottom: 5,
  },
  search: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 30,
    border: '1px solid #ccc',
    fontSize: '0.9rem',
    marginTop: 15,
  },
};

export default HomePage;

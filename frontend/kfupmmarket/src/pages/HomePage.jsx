import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ae from '../assets/clubs/ae.jpeg';
import consulting from '../assets/clubs/consulting.jpeg';
import cyclists from '../assets/clubs/cyclists.jpeg';
import ie from '../assets/clubs/ie.jpeg';
import media from '../assets/clubs/media.jpeg';

import { ReactComponent as FurnitureIcon } from '../assets/icons/couch.svg';
import { ReactComponent as ElectronicsIcon } from '../assets/icons/electronics.svg';
import { ReactComponent as BooksIcon } from '../assets/icons/bookf.svg';
import { ReactComponent as ToolsIcon } from '../assets/icons/tools.svg';
import { ReactComponent as AllIcon } from '../assets/icons/packagef.svg';

import { ReactComponent as DropdownIcon } from '../assets/icons/dropdown.svg';
import { ReactComponent as GroupIcon } from '../assets/icons/group.svg';
import { ReactComponent as PersonSearchIcon } from '../assets/icons/personsearch.svg';

import logo from '../assets/LogoNameAlpha.png';

function HomePage() {
  const navigate = useNavigate();
  const [clubOpen, setClubOpen] = useState(true);
  const [resellOpen, setResellOpen] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const HeaderCapsule = ({ title, desc, open, setOpen, icon: Icon }) => (
    <div
      style={{ ...styles.headerCapsule, backgroundColor: 'var(--primary-green)' }}
      onClick={() => setOpen(!open)}
    >
      <div style={styles.leftSection}>
        <DropdownIcon
          style={{
            ...styles.dropdownIcon,
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
        <div>
          <div style={styles.headerText}>{title}</div>
          <div style={styles.subText}>{desc}</div>
        </div>
      </div>
      <Icon style={styles.sectionIcon} />
    </div>
  );

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
        <img src={logo} alt="Market Logo" style={styles.logo} />

        <div style={styles.section}>
          <HeaderCapsule
            title="Clubs Services"
            desc="Support your favorite clubs"
            open={clubOpen}
            setOpen={setClubOpen}
            icon={GroupIcon}
          />
          <div
            style={{
              ...styles.animatedGrid,
              maxHeight: clubOpen ? '500px' : '0',
              opacity: clubOpen ? 1 : 0,
              marginTop: clubOpen ? 10 : 0,
            }}
          >
            {[{ Icon: AllIcon, label: 'All' }, { img: media, label: 'Media' }, { img: consulting, label: 'Consulting' }, { img: cyclists, label: 'Cyclists' }, { img: ae, label: 'AE' }, { img: ie, label: 'IE' }].map((club, i) => (
              <div
                key={i}
                style={{ ...styles.resellCard, cursor: 'pointer' }}
                onClick={() => handleClick('Clubs', 'All', club.label)}
              >
                {club.Icon ? (
                  <club.Icon style={styles.iconSvg} />
                ) : (
                  <img src={club.img} alt={club.label} style={styles.iconImg} />
                )}
                <span>{club.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <HeaderCapsule
            title="Student Resell"
            desc="Help students while saving money"
            open={resellOpen}
            setOpen={setResellOpen}
            icon={PersonSearchIcon}
          />
          <div
            style={{
              ...styles.animatedGrid,
              maxHeight: resellOpen ? '500px' : '0',
              opacity: resellOpen ? 1 : 0,
              marginTop: resellOpen ? 10 : 0,
            }}
          >
            {[{ Icon: AllIcon, label: 'All' }, { Icon: FurnitureIcon, label: 'Furniture' }, { Icon: ElectronicsIcon, label: 'Electronics' }, { Icon: BooksIcon, label: 'Books' }, { Icon: ToolsIcon, label: 'Tools' }].map((item, i) => (
              <div
                key={i}
                style={{ ...styles.resellCard, cursor: 'pointer' }}
                onClick={() => handleClick('Resell', item.label)}
              >
                <item.Icon style={styles.iconSvg} />
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
    backgroundColor: 'var(--white)',
    paddingBottom: '4.5rem',
    color: 'var(--text-dark)',
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
    marginBottom: '2rem',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  headerCapsule: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    padding: '0.75rem 1rem',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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
    transition: 'transform 0.4s ease',
  },
  sectionIcon: {
    width: 28,
    height: 28,
    fill: 'white',
  },
  animatedGrid: {
    overflow: 'hidden',
    transition: 'all 0.4s ease',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    justifyItems: 'center',
  },
  resellCard: {
    border: '1px solid var(--gray-border)',
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
    boxShadow: '0 2px 6px var(--card-shadow)',
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
  },
  iconImg: {
    width: 34,
    height: 34,
    objectFit: 'contain',
    marginBottom: 6,
  },
  iconSvg: {
    width: 34,
    height: 34,
    marginBottom: 6,
    fill: 'var(--text-dark)',
  },
};

export default HomePage;

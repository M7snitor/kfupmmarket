import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as HomeIconActive } from '../assets/icons/homef.svg';
import { ReactComponent as ShopIcon } from '../assets/icons/shopbag.svg';
import { ReactComponent as ShopIconActive } from '../assets/icons/shopbagf.svg';
import { ReactComponent as BrowseIcon } from '../assets/icons/cart.svg';
import { ReactComponent as BrowseIconActive } from '../assets/icons/cartf.svg';
import { ReactComponent as AccountIcon } from '../assets/icons/person.svg';
import { ReactComponent as AccountIconActive } from '../assets/icons/personf.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import searchIcon from '../assets/icons/search.png';
import closeIcon from '../assets/icons/close.svg';
import { ReactComponent as ArrowBackIcon } from '../assets/icons/arrowl.svg';
import scrollUpIcon from '../assets/icons/scrollup.svg';

const tabs = [
  { path: '/home', label: 'Home', icon: HomeIcon, active: HomeIconActive },
  { path: '/browse', label: 'Market', icon: ShopIcon, active: ShopIconActive },
  { path: '/cart', label: 'Cart', icon: BrowseIcon, active: BrowseIconActive },
  { path: '/account', label: 'You', icon: AccountIcon, active: AccountIconActive },
  { path: '/more', label: 'More', icon: MenuIcon, active: MenuIcon },
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/';
  const [search, setSearch] = useState('');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchInputRef = useRef(null);
  const navRefs = useRef([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => location.pathname.startsWith(tab.path));
    const ref = navRefs.current[activeIndex];
    if (ref) {
      const left = ref.offsetLeft + ref.offsetWidth / 4;
      const width = ref.offsetWidth / 2;
      setUnderlineStyle({ left, width });
    }
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) {
      setSearch(q);
      setShowBackArrow(true);
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/browse?search=${encodeURIComponent(search.trim())}`);
      searchInputRef.current?.blur();
    }
  };

  const handleSearchClear = () => {
    setSearch('');
    searchInputRef.current?.focus();
  };

  const handleSearchBack = () => {
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate(`${location.pathname}?${params.toString()}`);
    setSearch('');
    setShowBackArrow(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {!isLogin && (
        <div style={styles.searchContainer}>
          <div style={styles.searchBarWrapper}>
            <div
              style={{
                ...styles.arrowWrapper,
                transform: showBackArrow ? 'translateX(0)' : 'translateX(-150%)',
                opacity: showBackArrow ? 1 : 0,
              }}
            >
              <ArrowBackIcon
                onClick={handleSearchBack}
                style={styles.backSvgIcon}
              />
            </div>
            <div
              style={{
                ...styles.inputWrapper,
                marginLeft: showBackArrow ? '0' : '-2rem',
                flexGrow: 1,
                transition: 'all 0.3s ease',
              }}
            >
              <img src={searchIcon} alt="search" style={styles.inputLeftIcon} />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                placeholder="Search KFUPM Market"
                onFocus={() => setShowBackArrow(true)}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchEnter}
                style={styles.searchInput}
              />
              {search && (
                <img
                  src={closeIcon}
                  alt="clear"
                  onClick={handleSearchClear}
                  style={styles.inputRightIcon}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingBottom: isLogin ? 0 : '6rem' }}>
        <Outlet />
      </div>

      {showScrollTop && (
        <button style={styles.scrollTopBtn} onClick={scrollToTop}>
          <div style={styles.scrollTopCircle}>
            <img
              src={scrollUpIcon}
              alt="Scroll to top"
              style={{ width: 28, height: 28, filter: 'invert(28%) sepia(91%) saturate(1422%) hue-rotate(88deg) brightness(92%) contrast(93%)' }}
            />
          </div>
        </button>
      )}

      {!isLogin && (
        <div style={styles.navbar}>
          {tabs.map((tab, index) => {
            const isTabActive = location.pathname.startsWith(tab.path);
            const IconComponent = isTabActive ? tab.active : tab.icon;
            return (
              <button
                key={tab.path}
                ref={(el) => (navRefs.current[index] = el)}
                onClick={() => navigate(tab.path)}
                style={styles.navBtn}
              >
                <div style={styles.navContent}>
                  <IconComponent
                    style={{
                      ...styles.icon,
                      fill: isTabActive ? 'var(--primary-green)' : 'var(--text-light)',
                    }}
                  />
                  <div
                    style={{
                      ...styles.label,
                      color: isTabActive ? 'var(--primary-green)' : 'var(--text-light)',
                      fontWeight: isTabActive ? '600' : '400',
                    }}
                  >
                    {tab.label}
                  </div>
                </div>
              </button>
            );
          })}
          <div style={{ ...styles.underline, ...underlineStyle }} />
        </div>
      )}
    </>
  );
}

const styles = {
  searchContainer: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--white)',
    zIndex: 101,
    padding: '1rem 1rem 0.5rem',
    borderBottom: '1px solid var(--gray-border)',
  },
  searchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    transition: 'all 0.3s ease',
  },
  arrowWrapper: {
    width: 24,
    height: 24,
    marginRight: 8,
    transition: 'all 0.3s ease',
  },
  backSvgIcon: {
    width: 20,
    height: 20,
    cursor: 'pointer',
    fill: 'var(--text-dark)',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputLeftIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 16,
    height: 16,
    opacity: 0.6,
  },
  inputRightIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 16,
    height: 16,
    cursor: 'pointer',
    opacity: 0.6,
  },
  searchInput: {
    width: '100%',
    padding: '0.6rem 2rem',
    paddingLeft: '2rem',
    borderRadius: 25,
    border: '1px solid var(--gray-border)',
    fontSize: '16px',
  },
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'var(--white)',
    borderTop: '1px solid var(--gray-border)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0.3rem 0.25rem 0.2rem',
    zIndex: 100,
  },
  navBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  navContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    width: 22,
    height: 22,
    transition: 'transform 0.3s ease',
  },
  label: {
    fontSize: '0.7rem',
    transition: 'none',
  },
  underline: {
    position: 'absolute',
    top: 0,
    height: '2px',
    width: '50%',
    backgroundColor: 'var(--primary-green)',
    transition: 'all 0.3s ease',
    borderRadius: 2,
  },
  scrollTopBtn: {
    position: 'fixed',
    top: '4.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 102,
  },
  scrollTopCircle: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
};

export default Layout;

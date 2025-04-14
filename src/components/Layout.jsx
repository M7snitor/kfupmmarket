import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import homeIcon from '../assets/icons/home.png';
import shopIcon from '../assets/icons/shop.png';
import browseIcon from '../assets/icons/cart.png';
import accountIcon from '../assets/icons/person.png';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/';

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <div style={{ paddingBottom: isLogin ? 0 : '4rem' }}>
        <Outlet />
      </div>

      {!isLogin && (
        <div style={styles.navbar}>
          <button
            onClick={() => navigate('/home')}
            style={{
              ...styles.navBtn,
              ...(isActive('/home') && styles.activeBtn),
            }}
          >
            <img
              src={homeIcon}
              alt="Home"
              style={{
                ...styles.icon,
                filter: isActive('/home') ? activeFilter : 'none',
              }}
            />
          </button>

          <button
            onClick={() => navigate('/browse/clubs?category=All')}
            style={{
              ...styles.navBtn,
              ...(isActive('/browse/clubs') && styles.activeBtn),
            }}
          >
            <img
              src={shopIcon}
              alt="Clubs"
              style={{
                ...styles.icon,
                filter: isActive('/browse/clubs') ? activeFilter : 'none',
              }}
            />
          </button>

          <button
            onClick={() => navigate('/browse/resell?category=All')}
            style={{
              ...styles.navBtn,
              ...(isActive('/browse/resell') && styles.activeBtn),
            }}
          >
            <img
              src={browseIcon}
              alt="Browse"
              style={{
                ...styles.icon,
                filter: isActive('/browse/resell') ? activeFilter : 'none',
              }}
            />
          </button>

          <button
            onClick={() => navigate('/account')}
            style={{
              ...styles.navBtn,
              ...(isActive('/account') && styles.activeBtn),
            }}
          >
            <img
              src={accountIcon}
              alt="Account"
              style={{
                ...styles.icon,
                filter: isActive('/account') ? activeFilter : 'none',
              }}
            />
          </button>
        </div>
      )}
    </>
  );
}

const activeFilter =
  'brightness(0) saturate(100%) sepia(100%) hue-rotate(90deg) brightness(90%) contrast(85%)';

const styles = {
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0.6rem 0',
    zIndex: 100,
  },
  navBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderTop: '3px solid transparent',
    paddingTop: '6px',
    paddingBottom: '0',
  },
  activeBtn: {
    borderTop: '3px solid #00813e',
  },
  icon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
    transition: 'filter 0.3s ease',
  },
};

export default Layout;

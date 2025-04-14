import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import searchIcon from '../assets/icons/search.png';
import logo from '../assets/LogoNameAlpha.png';

import iphoneImg from '../assets/items/iphone16.jpg';
import bookImg from '../assets/items/book.jpeg';
import couchImg from '../assets/items/couch.jpg';
import chairImg from '../assets/items/gamingchair.jpg';
import paintingImg from '../assets/items/paintingstarrynight.jpg';
import powerbankImg from '../assets/items/powebankanker.jpg';
import bikeImg from '../assets/items/bike.jpg';

function BrowsePage({ type }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState({ green: '#00813e' });
  const stickyRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const search = params.get('search');
    if (cat) setFilter(cat);
    if (search) setSearchQuery(search);
  }, [location.search]);

  const items = [
    {
      id: 's202100001',
      name: 'iPhone 16',
      price: '3000 SAR',
      categories: ['Electronics'],
      fromClub: false,
      image: iphoneImg,
    },
    {
      id: 's202100002',
      name: 'Rich Dad Poor Dad',
      price: '20 SAR',
      categories: ['Books'],
      fromClub: false,
      image: bookImg,
    },
    {
      id: 's202100003',
      name: 'Modern Sofa',
      price: '500 SAR',
      bid: '100 SAR',
      timeLeft: '2 Days',
      categories: ['Furniture'],
      fromClub: false,
      image: couchImg,
    },
    {
      id: 's202028860',
      name: 'Gaming Chair',
      bid: '300 SAR',
      timeLeft: '5 Days',
      categories: ['Furniture'],
      fromClub: false,
      image: chairImg,
    },
    {
      name: 'Starry Night Poster',
      price: '45 SAR',
      quantity: '3 left',
      categories: ['Media'],
      fromClub: true,
      image: paintingImg,
    },
    {
      id: 's202100005',
      name: 'Anker Power Bank',
      price: '150 SAR',
      categories: ['Electronics'],
      fromClub: false,
      image: powerbankImg,
    },
    {
      id: 's202100006',
      name: 'Sport Bike',
      bid: '900 SAR',
      timeLeft: '5 Days',
      categories: ['Sports'],
      fromClub: false,
      image: bikeImg,
    },
    {
      name: 'Sport Bike',
      price: '1000 SAR',
      quantity: 'On Request',
      categories: ['Cyclists'],
      fromClub: true,
      image: bikeImg,
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesType = type === 'clubs' ? item.fromClub : !item.fromClub;
    const matchesCategory = filter === 'All' || item.categories.includes(filter);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setTheme({
      green: root.getPropertyValue('--primary-green') || '#00813e',
    });
  }, []);

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      navigate(`/browse/${type}?search=${searchQuery}`);
    }
  };

  const handleCategoryClick = (cat) => {
    navigate(`/browse/${type}?category=${cat}`);
  };

  const clubCategories = ['All', 'Media', 'Consulting', 'Cyclists', 'AE', 'IE'];
  const studentCategories = ['All', 'Electronics', 'Furniture', 'Books', 'Art', 'Sports'];

  return (
    <div style={styles.wrapper}>
      <img src={logo} alt="KFUPM Market" style={styles.logo} />

      <div ref={stickyRef} style={styles.stickyHeader}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchEnter}
            placeholder="Search for specific items with name/ID"
            style={styles.search}
          />
          <img src={searchIcon} alt="Search" style={styles.searchIcon} />
        </div>

        <div style={styles.filterRow}>
          {(type === 'clubs' ? clubCategories : studentCategories).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === cat ? theme.green : '#fff',
                color: filter === cat ? '#fff' : '#000',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.itemGrid}>
        {filteredItems.map((item, i) => (
          <div key={i} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.itemImage} />
            <div style={styles.itemName}>{item.name}</div>
            <div style={styles.itemPrice}>
              {item.price ? `Buy: ${item.price}` : <span style={{ opacity: 0.5 }}>Buy: —</span>}
            </div>
            {item.fromClub ? (
              <div style={styles.quantityInfo}>{item.quantity || 'On Request'}</div>
            ) : (
              <div style={styles.bidInfo}>
                {item.bid ? `Bid: ${item.bid} | ${item.timeLeft}` : <span style={{ opacity: 0.5 }}>Bid: —</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    paddingBottom: '5rem',
  },
  logo: {
    width: 240,
    margin: '0 auto 1rem',
    display: 'block',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    padding: '0.5rem 1rem 1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '0.5rem',
  },
  search: {
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    borderRadius: 30,
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 20,
    height: 20,
    objectFit: 'contain',
    opacity: 0.6,
  },
  filterRow: {
    display: 'flex',
    overflowX: 'auto',
    gap: 8,
    paddingBottom: 5,
  },
  filterBtn: {
    flexShrink: 0,
    padding: '0.5rem 1rem',
    borderRadius: 20,
    border: '1px solid #ccc',
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  itemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
    padding: 10,
    textAlign: 'center',
    height: 190,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: 8,
  },
  itemName: {
    fontSize: '0.85rem',
    fontWeight: 600,
    marginTop: 3,
    marginBottom: 0,
  },
  itemPrice: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#00813e',
    fontFamily: 'system-ui, sans-serif',
    marginBottom: 0,
  },
  bidInfo: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: '#d8c555',
    fontFamily: 'system-ui, sans-serif',
  },
  quantityInfo: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: '#d8c555',
    fontFamily: 'system-ui, sans-serif',
  },
};

export default BrowsePage;

import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/LogoNameAlpha.png';

import iphoneImg from '../assets/items/iphone16.jpg';
import bookImg from '../assets/items/book.jpeg';
import couchImg from '../assets/items/couch.jpg';
import chairImg from '../assets/items/gamingchair.jpg';
import paintingImg from '../assets/items/paintingstarrynight.jpg';
import powerbankImg from '../assets/items/powebankanker.jpg';
import bikeImg from '../assets/items/bike.jpg';

function BrowsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [seller, setSeller] = useState('All');
  const [filter, setFilter] = useState('All');
  const [club, setClub] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState({ green: '#00813e' });
  const stickyRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const sellerParam = params.get('seller');
    const clubParam = params.get('club');
    const search = params.get('search');

    if (cat) setFilter(cat); else setFilter('All');
    if (sellerParam) setSeller(sellerParam); else setSeller('All');
    if (clubParam) setClub(clubParam); else setClub('All');
    if (search) setSearchQuery(search); else setSearchQuery('');
  }, [location.search]);

  const items = [
    {
      id: 'itm000001',
      name: 'iPhone 16',
      price: '3000 SAR',
      categories: ['Electronics'],
      fromClub: false,
      image: iphoneImg,
    },
    {
      id: 'itm000002',
      name: 'Rich Dad Poor Dad',
      price: '20 SAR',
      categories: ['Books'],
      fromClub: false,
      image: bookImg,
    },
    {
      id: 'itm000003',
      name: 'Modern Sofa',
      price: '500 SAR',
      bid: '100 SAR',
      timeLeft: '2 Days',
      categories: ['Furniture'],
      fromClub: false,
      image: couchImg,
    },
    {
      id: 'itm000004',
      name: 'Gaming Chair',
      bid: '300 SAR',
      timeLeft: '5 Days',
      categories: ['Furniture'],
      fromClub: false,
      image: chairImg,
    },
    {
      id: 'club001',
      name: 'Starry Night Poster',
      price: '45 SAR',
      quantity: '3 left',
      categories: ['Art'],
      fromClub: true,
      club: 'Media',
      image: paintingImg,
    },
    {
      id: 'itm000005',
      name: 'Anker Power Bank',
      price: '150 SAR',
      categories: ['Electronics'],
      fromClub: false,
      image: powerbankImg,
    },
    {
      id: 'itm000006',
      name: 'Sport Bike Auction',
      bid: '900 SAR',
      timeLeft: '5 Days',
      categories: ['Sports'],
      fromClub: false,
      image: bikeImg,
    },
    {
      id: 'club002',
      name: 'Sport Bike',
      price: '1000 SAR',
      quantity: 'On Request',
      categories: ['Cyclists', 'Sports'],
      fromClub: true,
      club: 'Cyclists',
      image: bikeImg,
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesSeller =
      seller === 'All' ||
      (seller === 'Clubs' && item.fromClub) ||
      (seller === 'Resell' && !item.fromClub);
    const matchesCategory = filter === 'All' || item.categories.includes(filter);
    const matchesClub = !item.fromClub || seller !== 'Clubs' || club === 'All' || item.club === club;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSeller && matchesCategory && matchesClub && matchesSearch;
  });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setTheme({
      green: root.getPropertyValue('--primary-green') || '#00813e',
    });
  }, []);

  const updateQuery = (nextSeller = seller, nextFilter = filter, nextClub = club) => {
    const query = new URLSearchParams();
    if (nextSeller !== 'All') query.set('seller', nextSeller);
    if (nextFilter !== 'All') query.set('category', nextFilter);
    if (nextSeller === 'Clubs' && nextClub !== 'All') query.set('club', nextClub);
    if (searchQuery) query.set('search', searchQuery);
    return query.toString();
  };

  const handleSellerClick = (val) => {
    setSeller(val);
    const nextClub = val === 'Clubs' ? club : 'All';
    navigate(`/browse?${updateQuery(val, filter, nextClub)}`);
  };

  const handleCategoryClick = (cat) => {
    setFilter(cat);
    navigate(`/browse?${updateQuery(seller, cat, club)}`);
  };

  const handleClubChange = (clubName) => {
    setClub(clubName);
    navigate(`/browse?${updateQuery(seller, filter, clubName)}`);
  };

  const clubList = ['All', 'Media', 'Consulting', 'Cyclists', 'AE', 'IE'];
  const categories = ['All', 'Electronics', 'Furniture', 'Books', 'Art', 'Sports'];
  const sellers = ['All', 'Clubs', 'Resell'];

  return (
    <div style={styles.wrapper}>
      <img src={logo} alt="KFUPM Market" style={styles.logo} />

      



      <div style={styles.headerContent}>
        <div style={styles.filterRow}>
          {sellers.map((val) => (
            <button
              key={val}
              onClick={() => handleSellerClick(val)}
              style={{
                ...styles.filterBtn,
                backgroundColor: seller === val ? theme.green : '#fff',
                color: seller === val ? '#fff' : '#000',
              }}
            >
              {val === 'Resell' ? 'Student Resell' : val}
            </button>
          ))}
        </div>

        <div style={styles.filterRow}>
          {categories.map((cat) => (
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

        {seller === 'Clubs' && (
          <div style={styles.filterRow}>
            {clubList.map((clubName) => (
              <button
                key={clubName}
                onClick={() => handleClubChange(clubName)}
                style={{
                  ...styles.filterBtn,
                  backgroundColor: club === clubName ? theme.green : '#fff',
                  color: club === clubName ? '#fff' : '#000',
                }}
              >
                {clubName}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={styles.itemGrid}>
        {filteredItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.itemImage} />
            <div style={styles.itemName}>{item.name}</div>
            <div style={styles.itemPrice}>
              {item.price ? `Buy: ${item.price}` : <span style={{ opacity: 0.5 }}>Buy: —</span>}
            </div>
            {item.fromClub ? (
              <>
                <div style={styles.quantityInfo}>{item.quantity || 'On Request'}</div>
                <div style={styles.bidInfo}>Club: {item.club}</div>
              </>
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
    margin: '1rem auto',
    display: 'block',
  },
  headerContent: {
    padding: '0 1rem 1rem',
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

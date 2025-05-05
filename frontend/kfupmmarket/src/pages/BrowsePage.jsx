import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/LogoNameAlpha.png';

function BrowsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [seller, setSeller] = useState('All');
  const [filter, setFilter] = useState('All');
  const [club, setClub] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [theme, setTheme] = useState({ green: '#00813e' });
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/items/all`)
      .then(res => setItems(res.data.items || []))
      .catch(err => console.error('Error fetching items:', err));
  }, []);

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

  const filteredItems = items.filter((item) => {
    if (typeof item.quantity === 'number' && item.quantity <= 0) return false;
    if (item.auctionEndDate && new Date(item.auctionEndDate) <= new Date()) return false;
    const matchesSeller = seller === 'All' || (seller === 'Clubs' && item.fromClub) || (seller === 'Resell' && !item.fromClub);
    const matchesCategory = filter === 'All' || item.categories.includes(filter);
    const matchesClub = !item.fromClub || seller !== 'Clubs' || club === 'All' || (item.club && item.club === club);
    const matchesSearch = searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeller && matchesCategory && matchesClub && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setTheme({ green: root.getPropertyValue('--primary-green') || '#00813e' });
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

  const handleSortChange = (val) => setSortBy(val);

  const clubList = ['All', 'Media', 'Consulting', 'Cyclists', 'AE', 'IE'];
  const categories = ['All', 'Electronics', 'Furniture', 'Books', 'Art', 'Sports'];
  const sellers = ['All', 'Clubs', 'Resell'];

  return (
    <div style={styles.wrapper}>
      <img src={logo} alt="KFUPM Market" style={styles.logo} />

      <div style={styles.headerContent}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={styles.filterLabel}>Seller:</span>
          <div style={{ ...styles.filterRow, overflowX: 'auto' }}>
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
        </div>

        <hr style={{ margin: '6px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={styles.filterLabel}>Type:</span>
          <div style={{ ...styles.filterRow, overflowX: 'auto' }}>
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
        </div>

        {seller === 'Clubs' && (
          <>
            <hr style={{ margin: '6px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={styles.filterLabel}>Club:</span>
              <div style={{ ...styles.filterRow, overflowX: 'auto' }}>
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
            </div>
          </>
        )}

        <hr style={{ margin: '6px 0' }} />

        <div style={{ ...styles.filterRow, justifyContent: 'flex-end', marginTop: 6 }}>
          <span style={{ marginRight: 10, fontSize: '0.85rem' }}>Sort by:</span>
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} style={{ padding: '0.25rem 0.5rem', borderRadius: 6 }}>
            <option value="new">New</option>
            <option value="price">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div style={styles.itemGrid}>
        {filteredItems.map((item) => (
          <Link to={`/item/${item._id}`} key={item._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={styles.card}>
              <img src={(item.images && item.images[0]) || ''} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemPrice}>
                {item.price ? `Buy: ${item.price} SAR` : <span style={{ opacity: 0.5 }}>Buy: —</span>}
              </div>
              <div style={styles.bidInfo}>
                {item.auctionEndDate ? `Bid ends: ${new Date(item.auctionEndDate).toLocaleDateString()}` : <span style={{ opacity: 0.5 }}>Bid: —</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: 'var(--white)',
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
    border: '1px solid var(--gray-border)',
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
    backgroundColor: 'var(--white)',
    borderRadius: 10,
    boxShadow: '0 1px 6px var(--card-shadow)',
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
};

export default BrowsePage;

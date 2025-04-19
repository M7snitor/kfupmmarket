import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import items from '../data/items';

import { ReactComponent as BidIcon } from '../assets/icons/bid.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/deletef.svg';
import { ReactComponent as EyeIcon } from '../assets/icons/eyef.svg';
import { ReactComponent as CartIcon } from '../assets/icons/cartf.svg';
import { ReactComponent as DropdownIcon } from '../assets/icons/dropdown.svg';

function CartPage() {
  const [cartOpen, setCartOpen] = useState(true);
  const [watchOpen, setWatchOpen] = useState(true);
  const [bidOpen, setBidOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [bidlist, setBidlist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const otherItems = items.filter((item) => item.accountId !== '000001');
    const priced = otherItems.filter((item) => item.price);
    const biddable = otherItems.filter((item) => item.bid);

    setCart(priced.slice(0, 2));
    setWatchlist(priced.slice(2, 4));
    setBidlist(biddable.slice(0, 2));
  }, []);

  const moveToCart = (item) => {
    setWatchlist(watchlist.filter((i) => i.id !== item.id));
    setCart([...cart, item]);
  };

  const moveToWatchlist = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
    setWatchlist([...watchlist, item]);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => {
      const num = parseFloat(item.price?.replace(/[^\d.]/g, '') || 0);
      return sum + num;
    }, 0);

  const HeaderCapsule = ({ title, count, open, setOpen }) => (
    <div style={styles.headerCapsule} onClick={() => setOpen(!open)}>
      <div style={styles.leftSection}>
        <DropdownIcon
          style={{
            ...styles.dropdownIcon,
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
        <div>
          <div style={styles.headerText}>{title}</div>
          <div style={styles.subText}>{count} item(s)</div>
        </div>
      </div>
    </div>
  );

  const ItemCard = ({ item, type }) => (
    <div style={styles.card}>
      <img src={item.images?.[0] || item.image} alt={item.name} style={styles.itemImage} />
      <div style={styles.itemText} onClick={() => navigate(`/item/${item.id}`)}>
        <div style={styles.name}>{item.name}</div>
        {item.price && <div style={styles.buy}>Buy: {item.price}</div>}
        {item.bid && <div style={styles.bid}>Bid: {item.bid} | {item.timeLeft}</div>}
      </div>
      <div style={styles.buttonBox}>
        {type === 'cart' && (
          <button style={styles.btn} onClick={() => moveToWatchlist(item)}>
            <EyeIcon style={styles.btnIcon} /> Move to Watchlist
          </button>
        )}
        {type === 'watch' && (
          <button style={styles.btn} onClick={() => moveToCart(item)}>
            <CartIcon style={styles.btnIcon} /> Move to Cart
          </button>
        )}
        {type === 'bid' && (
          <button style={styles.btn}>
            <BidIcon style={styles.btnIcon} /> Bid
          </button>
        )}
        <button style={styles.btn}>
          <DeleteIcon style={styles.btnIcon} /> Remove
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.section}>
        <HeaderCapsule title="In Your Cart" count={cart.length} open={cartOpen} setOpen={setCartOpen} />
        <div
          style={{
            ...styles.animatedBox,
            maxHeight: cartOpen ? '1000px' : '0',
            opacity: cartOpen ? 1 : 0,
            marginTop: cartOpen ? 10 : 0,
          }}
        >
          {cart.map((item) => (
            <ItemCard key={item.id} item={item} type="cart" />
          ))}
          {cart.length > 0 && (
            <div style={styles.totalBox}>
              <div style={styles.totalText}>Total: {getTotal()} SAR</div>
              <button style={styles.buyBtn}>
                <CheckIcon style={styles.btnIconWhite} /> Buy All
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule title="Watchlist" count={watchlist.length} open={watchOpen} setOpen={setWatchOpen} />
        <div
          style={{
            ...styles.animatedBox,
            maxHeight: watchOpen ? '1000px' : '0',
            opacity: watchOpen ? 1 : 0,
            marginTop: watchOpen ? 10 : 0,
          }}
        >
          {watchlist.map((item) => (
            <ItemCard key={item.id} item={item} type="watch" />
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule title="Bid List" count={bidlist.length} open={bidOpen} setOpen={setBidOpen} />
        <div
          style={{
            ...styles.animatedBox,
            maxHeight: bidOpen ? '1000px' : '0',
            opacity: bidOpen ? 1 : 0,
            marginTop: bidOpen ? 10 : 0,
          }}
        >
          {bidlist.map((item) => (
            <ItemCard key={item.id} item={item} type="bid" />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: 'var(--white)',
    minHeight: '100vh',
    paddingBottom: '5rem',
    padding: '1rem',
    color: 'var(--text-dark)',
  },
  section: {
    marginBottom: '2rem',
  },
  headerCapsule: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    cursor: 'pointer',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    filter: 'brightness(0) invert(1)',
    transition: 'transform 0.3s ease',
  },
  headerText: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: '0.75rem',
    opacity: 0.9,
  },
  animatedBox: {
    overflow: 'hidden',
    transition: 'all 0.4s ease',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.7rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 10,
    marginBottom: '0.8rem',
    boxShadow: '0 1px 4px var(--card-shadow)',
    backgroundColor: 'var(--white)',
  },
  itemImage: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 8,
    marginRight: '0.75rem',
  },
  itemText: {
    flex: 1,
    cursor: 'pointer',
  },
  name: {
    fontWeight: 600,
    marginBottom: 4,
  },
  bid: {
    color: '#d8c555',
    fontSize: '0.8rem',
  },
  buy: {
    color: '#00813e',
    fontSize: '0.8rem',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  btn: {
    padding: '0.3rem 0.5rem',
    fontSize: '0.75rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 6,
    backgroundColor: 'var(--white)',
    cursor: 'pointer',
    color: 'var(--text-dark)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  btnIcon: {
    width: 16,
    height: 16,
    fill: 'currentColor',
  },
  btnIconWhite: {
    width: 16,
    height: 16,
    fill: 'white',
  },
  totalBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.8rem',
    borderTop: '1px solid var(--gray-border)',
    marginTop: 8,
  },
  totalText: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
  },
  buyBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
};

export default CartPage;

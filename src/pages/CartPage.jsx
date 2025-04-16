import { useEffect, useState } from 'react';
import couchImg from '../assets/items/couch.jpg';
import powerbankImg from '../assets/items/powebankanker.jpg';
import bookImg from '../assets/items/book.jpeg';
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
            transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
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

  return (
    <div style={{ padding: '1rem' }}>
      <div style={styles.section}>
        <HeaderCapsule title="Cart" desc="Items you are ready to buy" open={cartOpen} setOpen={setCartOpen} icon={CartIcon} />
        <div style={{
          ...styles.animatedGrid,
          maxHeight: cartOpen ? '500px' : '0',
          opacity: cartOpen ? 1 : 0,
          marginTop: cartOpen ? 10 : 0,
        }}>
          <div style={styles.card}>
            <img src={couchImg} alt="Modern Sofa" style={styles.itemImage} />
            <div style={styles.itemText}>
              <div style={styles.name}>Modern Sofa</div>
              <div style={styles.buy}>Buy: 500 SAR</div>
            </div>
            <div style={styles.buttonBox}>
              <button style={styles.btn}><EyeIcon style={styles.icon} /> Watch</button>
              <button style={styles.btn}><DeleteIcon style={styles.icon} /> Remove</button>
            </div>
          </div>
          <div style={styles.card}>
            <img src={powerbankImg} alt="Anker Power Bank" style={styles.itemImage} />
            <div style={styles.itemText}>
              <div style={styles.name}>Anker Power Bank</div>
              <div style={styles.buy}>Buy: 150 SAR</div>
            </div>
            <div style={styles.buttonBox}>
              <button style={styles.btn}><EyeIcon style={styles.icon} /> Watch</button>
              <button style={styles.btn}><DeleteIcon style={styles.icon} /> Remove</button>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <div style={styles.total}>Total: 650 SAR</div>
            <button style={styles.buyBtn}>Buy Now</button>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule title="Watchlist" desc="Saved items for later" open={watchOpen} setOpen={setWatchOpen} icon={EyeIcon} />
        <div style={{
          ...styles.animatedGrid,
          maxHeight: watchOpen ? '500px' : '0',
          opacity: watchOpen ? 1 : 0,
          marginTop: watchOpen ? 10 : 0,
        }}>
          <div style={styles.card}>
            <img src={bookImg} alt="Rich Dad Poor Dad" style={styles.itemImage} />
            <div style={styles.itemText}>
              <div style={styles.name}>Rich Dad Poor Dad</div>
              <div style={styles.buy}>Buy: 20 SAR</div>
            </div>
            <div style={styles.buttonBox}>
              <button style={styles.btn}><CartIcon style={styles.icon} /> Add</button>
              <button style={styles.btn}><DeleteIcon style={styles.icon} /> Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule title="Bid List" desc="Items you're bidding on" open={bidOpen} setOpen={setBidOpen} icon={BidIcon} />
        <div style={{
          ...styles.animatedGrid,
          maxHeight: bidOpen ? '500px' : '0',
          opacity: bidOpen ? 1 : 0,
          marginTop: bidOpen ? 10 : 0,
        }}>
          <div style={styles.card}>
            <img src={couchImg} alt="Modern Sofa" style={styles.itemImage} />
            <div style={styles.itemText}>
              <div style={styles.name}>Modern Sofa</div>
              <div style={styles.buy}>Buy: 500 SAR</div>
              <div style={styles.bid}>Bid: 100 SAR | 2 Days</div>
            </div>
            <div style={styles.buttonBox}>
              <button style={styles.btn}><BidIcon style={styles.icon} /> Rebid</button>
              <button style={styles.btn}><DeleteIcon style={styles.icon} /> Remove</button>
            </div>
          </div>
          <div style={styles.card}>
            <img src={powerbankImg} alt="Anker Power Bank" style={styles.itemImage} />
            <div style={styles.itemText}>
              <div style={styles.name}>Anker Power Bank</div>
              <div style={styles.buy}>Buy: 150 SAR</div>
              <div style={styles.bid}>Bid: 130 SAR | 3 Days</div>
            </div>
            <div style={styles.buttonBox}>
              <button style={styles.btn}><BidIcon style={styles.icon} /> Rebid</button>
              <button style={styles.btn}><CheckIcon style={styles.icon} /> Top Bid</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: '1px solid var(--gray-border)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    background: 'var(--white)',
  },
  itemImage: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 8,
  },
  itemText: {
    flexGrow: 1,
    textAlign: 'left',
  },
  name: {
    fontWeight: '600',
  },
  buy: {
    fontSize: '0.85rem',
    color: '#00813e',
    fontWeight: '500',
  },
  bid: {
    fontSize: '0.8rem',
    color: '#d8c555',
    fontWeight: '500',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: 'var(--white)',
    border: '1px solid var(--gray-border)',
    borderRadius: 8,
    padding: '0.2rem 0.6rem',
    fontSize: '0.8rem',
    cursor: 'pointer',
    color: 'var(--text-dark)',
  },
  icon: {
    width: 16,
    height: 16,
    fill: 'var(--black)',
  },
  total: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'var(--primary-green)',
  },
  buyBtn: {
    marginTop: 6,
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    background: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
  },
};

export default CartPage;

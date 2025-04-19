import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import items from '../data/items';

import { ReactComponent as DropdownIcon } from '../assets/icons/dropdown.svg';
import { ReactComponent as AccountIcon } from '../assets/icons/manageaccountf.svg';
import { ReactComponent as ListingIcon } from '../assets/icons/pricetagf.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as StatIcon } from '../assets/icons/stat.svg';
import { ReactComponent as EditIcon } from '../assets/icons/editf.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/deletef.svg';

function AccountPage() {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [listingOpen, setListingOpen] = useState(true);
  const [email, setEmail] = useState('m7snitor@gmail.com');
  const [phone, setPhone] = useState('0599766163');
  const [dormStatus, setDormStatus] = useState('Off Campus');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const userAccountId = '000001';
  const myItems = items.filter((item) => item.accountId === userAccountId);

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

  return (
    <div style={styles.wrapper}>
      <div style={styles.section}>
        <HeaderCapsule
          title="Account Details"
          desc="Your account information"
          open={detailsOpen}
          setOpen={setDetailsOpen}
          icon={AccountIcon}
        />
        <div style={{
          ...styles.animatedBox,
          maxHeight: detailsOpen ? '1000px' : '0',
          opacity: detailsOpen ? 1 : 0,
          marginTop: detailsOpen ? 10 : 0,
        }}>
          <p><strong>Name:</strong> Abdulmohsen Alshawarib</p>
          <p><strong>Student ID:</strong> 202028860</p>
          <p><strong>Account ID:</strong> {userAccountId}</p>

          <div style={styles.fieldRow}>
            <label style={styles.label}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.fieldRow}>
            <label style={styles.label}>Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.filterRowContainer}>
            <span style={styles.filterLabel}>Living Status:</span>
            <div style={styles.filterRow}>
              {['In Dorms', 'Off Campus'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDormStatus(opt)}
                  style={{
                    ...styles.filterBtn,
                    backgroundColor: dormStatus === opt ? 'var(--primary-green)' : 'var(--white)',
                    color: dormStatus === opt ? '#fff' : 'var(--text-dark)',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {dormStatus === 'In Dorms' && (
            <div style={{ marginTop: 10 }}>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Building #:</label>
                <input type="number" value={building} onChange={(e) => setBuilding(e.target.value)} style={styles.input} />
              </div>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Room #:</label>
                <input type="number" value={room} onChange={(e) => setRoom(e.target.value)} style={styles.input} />
              </div>
            </div>
          )}

          <button style={styles.saveBtn}>Apply Changes</button>
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule
          title="Your Listings"
          desc="Manage your item listings"
          open={listingOpen}
          setOpen={setListingOpen}
          icon={ListingIcon}
        />
        <div style={{
          ...styles.animatedBox,
          maxHeight: listingOpen ? '1000px' : '0',
          opacity: listingOpen ? 1 : 0,
          marginTop: listingOpen ? 10 : 0,
        }}>
          {myItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <img
                src={item.images?.[0] || item.image}
                alt={item.name}
                style={styles.itemImage}
              />
              <div
                style={styles.itemText}
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <div style={styles.name}>{item.name}</div>
                <div style={styles.buy}>
                  {item.price ? `Buy: ${item.price}` : 'Buy: —'}
                </div>
                <div style={styles.bid}>
                  {item.bid ? `Bid: ${item.bid} | ${item.timeLeft}` : 'Bid: —'}
                </div>
              </div>
              <div style={styles.buttonBox}>
                <button style={styles.btn}><StatIcon style={styles.btnIcon} /> Stats</button>
                <button
                  style={styles.btn}
                  onClick={() => navigate('/listing', { state: { editItem: item } })}
                >
                  <EditIcon style={styles.btnIcon} /> Edit
                </button>
                <button style={styles.btn}><DeleteIcon style={styles.btnIcon} /> Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => navigate('/listing')} style={styles.addBtn}>
            <AddIcon style={styles.addIcon} />
            Add New Listing
          </button>
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
  sectionIcon: {
    width: 28,
    height: 28,
    fill: 'white',
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
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0.5rem 0',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: '90px',
  },
  input: {
    padding: '0.45rem',
    borderRadius: 8,
    border: '1px solid var(--gray-border)',
    width: '60%',
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
  },
  saveBtn: {
    marginTop: 16,
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    background: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    width: '100%',
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
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 6,
    padding: '0.75rem',
    fontSize: '0.95rem',
    background: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    marginTop: 6,
  },
  addIcon: {
    width: 18,
    height: 18,
    fill: 'currentColor',
  },
  filterRowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
    gap: '1rem',
  },
  filterLabel: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    minWidth: 100,
  },
  filterRow: {
    display: 'flex',
    gap: 8,
  },
  filterBtn: {
    padding: '0.5rem 1rem',
    borderRadius: 20,
    border: '1px solid var(--gray-border)',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    flexShrink: 0,
  },
};

export default AccountPage;

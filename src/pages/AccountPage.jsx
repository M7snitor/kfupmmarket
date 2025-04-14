import { useNavigate } from 'react-router-dom';
import logo from '../assets/LogoNameAlpha.png';
import chairImg from '../assets/items/gamingchair.jpg';
import couchImg from '../assets/items/couch.jpg';
import statIcon from '../assets/icons/stat.png';
import editIcon from '../assets/icons/edit.png';
import deleteIcon from '../assets/icons/delete.png';

function AccountPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <img src={logo} alt="KFUPM Market Logo" style={styles.logo} />

      <div style={styles.section}>
        <div style={styles.title}>Account details</div>
        <div style={styles.sub}>Your account information</div>
        <p>Name: Abdulmohsen Alshawarib</p>
        <p>Student ID: 202028860</p>
        <p>Account ID: 000001</p>
      </div>

      <div style={styles.section}>
        <div style={styles.title}>Listing</div>
        <div style={styles.sub}>Manage your listings</div>
        <div style={styles.card}>
          <img src={chairImg} alt="Gaming Chair" style={styles.itemImage} />
          <div style={styles.itemText}>
            <div style={styles.name}>Gaming Chair</div>
            <div style={styles.buy}>Buy: —</div>
            <div style={styles.bid}>Bid: 300 SAR | 5 Days</div>
          </div>
          <div style={styles.buttonBox}>
            <button style={styles.btn}><img src={statIcon} alt="Stats" style={styles.icon} /> Stats</button>
            <button style={styles.btn}><img src={editIcon} alt="Edit" style={styles.icon} /> Edit</button>
            <button style={styles.btn}><img src={deleteIcon} alt="Remove" style={styles.icon} /> Remove</button>
          </div>
        </div>
        <div
          style={{ ...styles.card, cursor: 'pointer', justifyContent: 'center' }}
          onClick={() => navigate('/newlisting')}
        >
          <strong>+ Add new listing</strong>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.title}>Watch/Bid list</div>
        <div style={styles.sub}>Manage items you bid on</div>
        <div style={styles.card}>
          <img src={couchImg} alt="Modern Sofa" style={styles.itemImage} />
          <div style={styles.itemText}>
            <div style={styles.name}>Modern Sofa</div>
            <div style={styles.buy}>Buy: 500 SAR</div>
            <div style={styles.bid}>Bid: 100 SAR | 2 Days</div>
          </div>
          <div style={styles.buttonBox}>
            <button style={styles.btn}><img src={statIcon} alt="History" style={styles.icon} /> History</button>
            <button style={styles.btn}><img src={editIcon} alt="Rebid" style={styles.icon} /> Rebid</button>
            <button style={styles.btn}><img src={deleteIcon} alt="Remove" style={styles.icon} /> Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    paddingBottom: '5rem',
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
  title: {
    fontWeight: 'bold',
    border: '1px solid #ccc',
    padding: '0.5rem',
    borderRadius: 30,
    textAlign: 'center',
  },
  sub: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1rem',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.7rem',
    border: '1px solid #ccc',
    borderRadius: 10,
    marginBottom: '0.8rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
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
    border: '1px solid #aaa',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  icon: {
    width: 16,
    height: 16,
    objectFit: 'contain',
  },
};

export default AccountPage;

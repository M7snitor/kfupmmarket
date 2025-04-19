import { useParams, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import items from '../data/items';
import { ReactComponent as ReportIcon } from '../assets/icons/report.svg';
import { ReactComponent as ChatIcon } from '../assets/icons/chatf.svg';
import { ReactComponent as WeightIcon } from '../assets/icons/weightf.svg';
import { ReactComponent as DimIcon } from '../assets/icons/dimensions.svg';
import { ReactComponent as CartIcon } from '../assets/icons/cartf.svg';
import { ReactComponent as BidIcon } from '../assets/icons/bid.svg';

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const item = items.find((itm) => itm.id === id);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    const scrollY = sessionStorage.getItem('browseScroll');
    navigate(-1);
    if (scrollY) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, parseInt(scrollY));
        }, 0);
      });
    }
  };

  if (!item) {
    return <div style={{ padding: '2rem' }}>Item not found</div>;
  }

  const imageList = item.images || [item.image];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button onClick={handleBack} style={styles.backBtn}>← Back</button>

        <img src={imageList[index]} alt={item.name} style={styles.itemImage} />
        {imageList.length > 1 && (
          <div style={styles.thumbnailRow}>
            {imageList.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setIndex(i)}
                style={{
                  ...styles.thumbnail,
                  borderColor: i === index ? 'var(--primary-green)' : 'transparent',
                }}
              />
            ))}
          </div>
        )}

        <div style={styles.infoSection}>
          <div style={styles.name}>{item.name}</div>

          {item.price && <div style={styles.green}>Price: {item.price}</div>}
          {item.bid && <div style={styles.yellow}>Current Bid: {item.bid}</div>}
          {item.timeLeft && <div style={styles.red}>Time Remaining: {item.timeLeft}</div>}
          {item.quantity && <div style={styles.gray}>Quantity: {item.quantity}</div>}

          {item.description && (
            <p style={styles.description}>{item.description}</p>
          )}

          <div style={styles.dimensionsBox}>
            <DimIcon style={styles.icon} />
            <span>{item.width || '-'}W x {item.length || '-'}L x {item.height || '-'}H cm</span>
          </div>
          <div style={styles.dimensionsBox}>
            <WeightIcon style={styles.icon} />
            <span>Weight: {item.weight || '-'} kg</span>
          </div>

          <div style={styles.actions}>
            {item.price && (
              <button style={styles.cartBtn}>
                <CartIcon style={styles.btnIcon} /> Add to Cart
              </button>
            )}
            {item.bid && (
              <button style={styles.bidBtn}>
                <BidIcon style={styles.btnIcon} /> Add to Bidlist
              </button>
            )}
          </div>

          <div style={styles.bottomButtons}>
            <button style={styles.optionBtn} onClick={() => navigate('/chat')}>
                <ChatIcon style={styles.bottomIcon} /> Contact Seller
            </button>
            <button style={styles.optionBtn}><ReportIcon style={styles.bottomIcon} /> Report Listing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    paddingBottom: '5rem',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 480,
  },
  backBtn: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'var(--white)',
    fontSize: '1rem',
    padding: '0.75rem 1rem',
    border: 'none',
    color: 'var(--primary-green)',
    fontWeight: 'bold',
    cursor: 'pointer',
    top: '3.5rem',
  },
  itemImage: {
    width: '100%',
    height: 280,
    objectFit: 'cover',
  },
  thumbnailRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    padding: '0.5rem',
  },
  thumbnail: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 8,
    border: '2px solid',
    cursor: 'pointer',
  },
  infoSection: {
    padding: '1rem',
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: 6,
  },
  green: {
    fontWeight: 600,
    color: 'var(--primary-green)',
  },
  yellow: {
    fontWeight: 600,
    color: '#d8c555',
    marginTop: 4,
  },
  red: {
    color: 'red',
    fontSize: '0.85rem',
    marginTop: 4,
  },
  gray: {
    fontWeight: 500,
    color: 'gray',
    fontSize: '0.85rem',
    marginTop: 4,
  },
  description: {
    marginTop: 10,
    fontSize: '0.85rem',
    lineHeight: 1.4,
  },
  dimensionsBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    fontSize: '0.85rem',
  },
  icon: {
    width: 18,
    height: 18,
    fill: 'var(--text-dark)',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
  },
  cartBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 10,
    padding: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bidBtn: {
    backgroundColor: '#d8c555',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 10,
    padding: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnIcon: {
    width: 16,
    height: 16,
    fill: 'white',
  },
  bottomButtons: {
    display: 'flex',
    gap: 10,
    marginTop: 20,
  },
  optionBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    padding: '0.6rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 10,
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    fontWeight: 'bold',
  },
  bottomIcon: {
    width: 16,
    height: 16,
    fill: 'var(--text-dark)'
  },
};

export default ItemDetailPage;

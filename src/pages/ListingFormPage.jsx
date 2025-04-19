import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import logo from '../assets/LogoNameAlpha.png';

const categories = ['Electronics', 'Furniture', 'Books', 'Art', 'Sports'];
const modes = ['Sale', 'Auction', 'Both'];

function ListingFormPage() {
  const location = useLocation();
  const editItem = location.state?.editItem;

  const [form, setForm] = useState({
    name: '',
    brand: '',
    description: '',
    width: '',
    length: '',
    height: '',
    weight: '',
    price: '',
    bid: '',
    duration: '',
  });

  const [selectedCats, setSelectedCats] = useState([]);
  const [sellMode, setSellMode] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editItem) {
      setForm({
        name: editItem.name || '',
        brand: editItem.brand || '',
        description: editItem.description || '',
        width: editItem.width?.toString() || '',
        length: editItem.length?.toString() || '',
        height: editItem.height?.toString() || '',
        weight: editItem.weight?.toString() || '',
        price: editItem.price?.replace(/ SAR$/, '') || '',
        bid: editItem.bid?.replace(/ SAR$/, '') || '',
        duration: editItem.timeLeft?.replace(/ Days$/, '') || '',
      });
      setSelectedCats(editItem.categories || []);
      setSellMode(editItem.type || '');
      setImagePreview(editItem.images?.[0] || null);
    }
  }, [editItem]);

  const toggleCategory = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else if (selectedCats.length < 2) {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const update = (field, val) => {
    const numericFields = ['price', 'bid', 'duration', 'width', 'length', 'height'];
    const decimalFields = ['weight'];
    const sanitized = numericFields.includes(field)
      ? val.replace(/[^0-9]/g, '')
      : decimalFields.includes(field)
      ? val.replace(/[^0-9.]/g, '')
      : val;
    setForm({ ...form, [field]: sanitized });
  };

  return (
    <div style={styles.wrapper}>
      <img src={logo} alt="KFUPM Market" style={styles.logo} />

      <div style={styles.titleBox}>
        <h3 style={styles.title}>{editItem ? 'Edit listing' : 'New listing'}</h3>
        <p style={styles.subtitle}>Adding more info helps people find your item</p>
      </div>

      <div style={styles.imageArea}>
        <div style={styles.previewBox}>
          {imagePreview ? (
            <img src={imagePreview} alt="preview" style={styles.previewImage} />
          ) : (
            <div style={styles.previewPlaceholder}>No image</div>
          )}
        </div>
        <div style={styles.imageColumn}>
          <button style={styles.imageBtn}><AddIcon style={styles.imageIcon} /></button>
          <button style={styles.imageBtn}><AddIcon style={styles.imageIcon} /></button>
          <button style={styles.imageBtn}><AddIcon style={styles.imageIcon} /></button>
        </div>
      </div>

      <input style={styles.input} placeholder="Listing name..." value={form.name} onChange={e => update('name', e.target.value)} />
      <input style={styles.input} placeholder="Brand..." value={form.brand} onChange={e => update('brand', e.target.value)} />
      <textarea style={styles.textarea} placeholder="Description..." value={form.description} onChange={e => update('description', e.target.value)} />

      <div style={styles.dimensionsGrid}>
        <input style={styles.dimensionInput} placeholder="Width (cm)" value={form.width} onChange={e => update('width', e.target.value)} />
        <input style={styles.dimensionInput} placeholder="Length (cm)" value={form.length} onChange={e => update('length', e.target.value)} />
        <input style={styles.dimensionInput} placeholder="Height (cm)" value={form.height} onChange={e => update('height', e.target.value)} />
        <input style={styles.dimensionInput} placeholder="Weight (kg)" value={form.weight} onChange={e => update('weight', e.target.value)} />
      </div>

      <div style={styles.note}>Note: dimensions are optional yet including them increase visibility</div>

      <div style={styles.categoryBox}>
        <div style={styles.note}>Select up to 2 categories:</div>
        <div style={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                ...styles.filterBtn,
                backgroundColor: selectedCats.includes(cat) ? 'var(--primary-green)' : 'var(--white)',
                color: selectedCats.includes(cat) ? 'white' : 'var(--text-dark)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.categoryBox}>
        <div style={styles.note}>Selling Method:</div>
        <div style={styles.filterRow}>
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setSellMode(mode)}
              style={{
                ...styles.filterBtn,
                backgroundColor: sellMode === mode ? 'var(--primary-green)' : 'var(--white)',
                color: sellMode === mode ? 'white' : 'var(--text-dark)',
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.sellRow}>
        {['Sale', 'Both'].includes(sellMode) && (
          <input
            style={styles.sellInput}
            placeholder="Price (SAR)"
            value={form.price}
            onChange={e => update('price', e.target.value)}
          />
        )}
        {['Auction', 'Both'].includes(sellMode) && (
          <input
            style={styles.sellInput}
            placeholder="Starting Bid (SAR)"
            value={form.bid}
            onChange={e => update('bid', e.target.value)}
          />
        )}
        {['Auction', 'Both'].includes(sellMode) && (
          <input
            style={styles.sellInput}
            placeholder="Duration (days)"
            value={form.duration}
            onChange={e => update('duration', e.target.value)}
          />
        )}
      </div>

      {['Auction', 'Both'].includes(sellMode) && (
        <p style={styles.note}>Note: Making any adjustments relists the item & removes current bids</p>
      )}

      <button style={styles.submitBtn}>
        <AddIcon style={{ fill: 'white', width: 18, height: 18, marginRight: 6 }} />
        {editItem ? 'Update Listing' : 'Post to KFUPM Market'}
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    padding: '1rem',
    paddingBottom: '5rem',
  },
  logo: {
    width: 240,
    display: 'block',
    margin: '0 auto 1rem',
  },
  titleBox: {
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-light)',
  },
  imageArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
  previewBox: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid var(--gray-border)',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  previewPlaceholder: {
    color: '#999',
    fontSize: '0.85rem',
  },
  imageColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  imageBtn: {
    width: 48,
    height: 48,
    border: '2px solid var(--text-dark)',
    borderRadius: 8,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 20,
    height: 20,
    fill: 'var(--text-dark)',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '0.7rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 10,
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
  },
  textarea: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '0.7rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 10,
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    resize: 'vertical',
  },
  dimensionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 6,
  },
  dimensionInput: {
    padding: '0.6rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 10,
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
  },
  note: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
    marginBottom: 6,
  },
  categoryBox: {
    marginBottom: 10,
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
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
  sellRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  sellInput: {
    flex: 1,
    padding: '0.6rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 10,
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
  },
  submitBtn: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ListingFormPage;

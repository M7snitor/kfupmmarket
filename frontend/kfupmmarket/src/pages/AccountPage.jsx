import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

import { ReactComponent as DropdownIcon } from '../assets/icons/dropdown.svg'
import { ReactComponent as AccountIcon } from '../assets/icons/manageaccountf.svg'
import { ReactComponent as ListingIcon } from '../assets/icons/pricetagf.svg'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import { ReactComponent as StatIcon } from '../assets/icons/stat.svg'
import { ReactComponent as EditIcon } from '../assets/icons/editf.svg'
import { ReactComponent as DeleteIcon } from '../assets/icons/deletef.svg'

export default function AccountPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [listingOpen, setListingOpen] = useState(true)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [onCampus, setOnCampus] = useState(false)
  const [building, setBuilding] = useState('')
  const [room, setRoom] = useState('')
  const [items, setItems] = useState([])
  const HeaderCapsule = ({ title, count, open, setOpen, icon: Icon }) => (
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
        {Icon && <Icon style={styles.sectionIcon} />}
      </div>
    );

  useEffect(() => {
    if (!isAuthenticated) return

    axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`)
      .then(r => {
        const u = r.data.user
        setEmail(u.email || '')
        setPhone(u.phone || '')
        setOnCampus(!!u.onCampus)
        setBuilding(u.buildingNumber || '')
        setRoom(u.roomNumber || '')
      })
      .catch(() => {})

    axios.get(`${process.env.REACT_APP_API_URL}/api/users/my-listings`)
      .then(r => setItems(r.data.listings || []))
      .catch(() => {})
  }, [isAuthenticated])

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/update-profile`,
        {
          email,
          phone,
          onCampus,
          buildingNumber: onCampus ? building : '',
          roomNumber:    onCampus ? room     : ''
        }
      )
      alert('Profile updated')
    } catch {
      alert('Update failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this listing?')) return
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/items/${id}`)
      setItems(items.filter(i => i._id !== id))
    } catch {
      alert('Failed to delete')
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={styles.wrapper}>
        <p style={{ color: 'var(--text-light)' }}>You need to sign in.</p>
        <button onClick={() => navigate('/')} style={styles.saveBtn}>
          Sign In
        </button>
      </div>
    )
  }

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
          opacity:   detailsOpen ? 1 : 0,
          marginTop: detailsOpen ? 10 : 0
        }}>
          <p style={{ color:'var(--text-light)' }}><strong>Name:</strong> {user.name}</p>
          <p style={{ color:'var(--text-light)' }}><strong>Student ID:</strong> {user.studentId}</p>
          <p style={{ color:'var(--text-light)' }}><strong>Account ID:</strong> {user.accountId}</p>

          <div style={styles.fieldRow}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldRow}>
            <label style={styles.label}>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.filterRowContainer}>
            <span style={styles.filterLabel}>Living Status:</span>
            <div style={styles.filterRow}>
              <button
                onClick={() => setOnCampus(true)}
                style={{
                  ...styles.filterBtn,
                  backgroundColor: onCampus ? 'var(--primary-green)' : 'var(--white)',
                  color:           onCampus ? 'var(--white)'       : 'var(--text-dark)'
                }}
              >In Dorms</button>
              <button
                onClick={() => { setOnCampus(false); setBuilding(''); setRoom('') }}
                style={{
                  ...styles.filterBtn,
                  backgroundColor: !onCampus ? 'var(--primary-green)' : 'var(--white)',
                  color:           !onCampus ? 'var(--white)'         : 'var(--text-dark)'
                }}
              >Off Campus</button>
            </div>
          </div>

          {onCampus && <>
            <div style={styles.fieldRow}>
              <label style={styles.label}>Building #:</label>
              <input
                type="text"
                value={building}
                onChange={e => setBuilding(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.fieldRow}>
              <label style={styles.label}>Room #:</label>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                style={styles.input}
              />
            </div>
          </>}

          <button onClick={handleUpdate} style={styles.saveBtn}>Apply Changes</button>
          <button onClick={logout} style={{ ...styles.saveBtn, backgroundColor:'var(--text-light)', marginTop:10 }}>
            Log Out
          </button>
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
          opacity:   listingOpen ? 1 : 0,
          marginTop: listingOpen ? 10 : 0
        }}>
          <p style={{ color:'var(--text-light)', marginBottom:8 }}>
            You have {items.length} item{items.length !== 1 ? 's' : ''} listed.
          </p>

          {items.map(item => (
            <div key={item._id} style={styles.card}>
              <img
                src={item.images?.[0] || ''}
                alt={item.name}
                style={styles.itemImage}
              />
              <div
                style={styles.itemText}
                onClick={() => navigate(`/item/${item._id}`)}
              >
                <div style={styles.name}>{item.name}</div>
                <div style={styles.buy}>
                  {item.price ? `Buy: ${item.price} SAR` : 'Buy: —'}
                </div>
                <div style={styles.bid}>
                  {item.auctionEndDate
                    ? `Bid ends: ${new Date(item.auctionEndDate).toLocaleDateString()}`
                    : 'Bid: —'}
                </div>
              </div>
              <div style={styles.buttonBox}>
                <button style={styles.btn} onClick={() => navigate('/listing', { state: { editItem: item } })}>
                  <StatIcon style={styles.btnIcon}/> Stats
                </button>
                <button style={styles.btn} onClick={() => navigate('/listing', { state: { editItem: item } })}>
                  <EditIcon style={styles.btnIcon}/> Edit
                </button>
                <button style={styles.btn} onClick={() => handleDelete(item._id)}>
                  <DeleteIcon style={styles.btnIcon}/> Remove
                </button>
              </div>
            </div>
          ))}

          <button onClick={() => navigate('/listing')} style={styles.addBtn}>
            <AddIcon style={styles.addIcon}/> Add New Listing
          </button>
        </div>
      </div>
    </div>
  )
}

function HeaderCapsule({ title, desc, open, setOpen, icon: Icon }) {
  return (
    <div
      style={styles.headerCapsule}
      onClick={() => setOpen(!open)}
    >
      <div style={styles.leftSection}>
        <DropdownIcon style={styles.dropdownIcon}/>
        <div>
          <div style={styles.headerText}>{title}</div>
          <div style={styles.subText}>{desc}</div>
        </div>
      </div>
      <Icon style={styles.sectionIcon}/>
    </div>
  )
}

const styles = {
  wrapper:            { backgroundColor:'var(--white)', minHeight:'100vh', padding:'1rem', color:'var(--text-dark)' },
  section:            { marginBottom:'2rem' },
  headerCapsule:      { display:'flex', justifyContent:'space-between', alignItems:'center', borderRadius:30, padding:'0.75rem 1rem', cursor:'pointer', backgroundColor:'var(--primary-green)', color:'var(--white)' },
  leftSection:        { display:'flex', alignItems:'center', gap:10 },
  dropdownIcon:       { width:24, height:24, filter:'brightness(0) invert(1)', transition:'transform .3s', transform: 'rotate(0deg)' }, 
  sectionIcon:        { width:28, height:28, fill:'var(--white)' },
  headerText:         { fontSize:'1rem', fontWeight:'bold', color:'var(--white)' },
  subText:            { fontSize:'0.75rem', opacity:0.9, color:'var(--white)' },
  animatedBox:        { overflow:'hidden', transition:'all .4s' },
  fieldRow:           { display:'flex', alignItems:'center', justifyContent:'space-between', margin:'0.5rem 0' },
  label:              { fontWeight:'bold', marginRight:12, minWidth:90, color:'var(--text-light)' },
  input:              { padding:'.45rem', borderRadius:8, border:'1px solid var(--gray-border)', width:'60%', backgroundColor:'var(--white)', color:'var(--text-dark)' },
  filterRowContainer: { display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'1rem', gap:'1rem' },
  filterLabel:        { fontWeight:'bold', fontSize:'0.9rem', minWidth:100, color:'var(--text-light)' },
  filterRow:          { display:'flex', gap:8 },
  filterBtn:          { padding:'.5rem 1rem', borderRadius:20, border:'1px solid var(--gray-border)', fontSize:'.8rem', fontWeight:'bold', cursor:'pointer' },
  saveBtn:            { marginTop:16, padding:'.6rem 1.2rem', fontSize:'1rem', background:'var(--primary-green)', color:'var(--white)', border:'none', borderRadius:10, cursor:'pointer', width:'100%' },
  card:               { display:'flex', alignItems:'center', padding:'.7rem', border:'1px solid var(--gray-border)', borderRadius:10, marginBottom:'.8rem', boxShadow:'0 1px 4px var(--card-shadow)', backgroundColor:'var(--white)' },
  itemImage:          { width:60, height:60, objectFit:'cover', borderRadius:8, marginRight:'.75rem' },
  itemText:           { flex:1, cursor:'pointer' },
  name:               { fontWeight:600, marginBottom:4, color:'var(--text-dark)' },
  buy:                { color:'var(--primary-green)', fontSize:'.8rem' },
  bid:                { color:'#d8c555', fontSize:'.8rem' },
  buttonBox:          { display:'flex', flexDirection:'column', gap:'.3rem' },
  btn:                { padding:'.3rem .5rem', fontSize:'.75rem', border:'1px solid var(--gray-border)', borderRadius:6, backgroundColor:'var(--white)', cursor:'pointer', color:'var(--text-dark)', display:'flex', alignItems:'center', gap:6 },
  btnIcon:            { width:16, height:16, fill:'currentColor' },
  addBtn:             { display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'.75rem', fontSize:'.95rem', background:'var(--primary-green)', color:'var(--white)', border:'none', borderRadius:10, cursor:'pointer', marginTop:6 },
  addIcon:            { width:18, height:18, fill:'currentColor' }
}
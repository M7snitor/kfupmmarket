// src/pages/CartPage.jsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

import { ReactComponent as DeleteIcon }   from '../assets/icons/deletef.svg'
import { ReactComponent as EyeIcon }      from '../assets/icons/eyef.svg'
import { ReactComponent as CartIcon }     from '../assets/icons/cartf.svg'
import { ReactComponent as BidIcon }      from '../assets/icons/bid.svg'
import { ReactComponent as StatsIcon }    from '../assets/icons/stat.svg'
import { ReactComponent as CheckIcon }    from '../assets/icons/check.svg'
import { ReactComponent as DropdownIcon } from '../assets/icons/dropdown.svg'

export default function CartPage() {
  const { token }    = useAuth()
  const navigate     = useNavigate()
  const API          = process.env.REACT_APP_API_URL
  const headers      = { headers: { Authorization: `Bearer ${token}` } }

  const [cartOpen,   setCartOpen]   = useState(true)
  const [watchOpen,  setWatchOpen]  = useState(true)
  const [bidOpen,    setBidOpen]    = useState(true)

  const [cart,       setCart]       = useState([])
  const [watchlist,  setWatchlist]  = useState([])
  const [bidlist,    setBidlist]    = useState([])

  useEffect(() => {
    axios.get(`${API}/api/users/cart`, headers).then(r => setCart(r.data.cart))
    axios.get(`${API}/api/users/watchlist`, headers).then(r => setWatchlist(r.data.watchlist))
    axios.get(`${API}/api/users/bidlist`, headers).then(r => setBidlist(r.data.bidlist))
  }, [])

  const removeFrom = async (list, id) => {
    await axios.delete(`${API}/api/users/${list}/remove/${id}`, headers)
    if (list === 'cart')      setCart(c => c.filter(i => i._id !== id))
    if (list === 'watchlist') setWatchlist(w => w.filter(i => i._id !== id))
    if (list === 'bidlist')   setBidlist(b => b.filter(i => i._id !== id))
  }

  const moveTo = async (from, to, item) => {
    await axios.post(`${API}/api/users/${from}/move-to-${to}/${item._id}`, {}, headers)
    removeFrom(from, item._id)
    if (to === 'cart')      setCart(c => [...c, item])
    if (to === 'watchlist') setWatchlist(w => [...w, item])
  }

  const total = cart.reduce(
    (sum, i) => sum + i.price,
    0
  )

  const buyAll = async () => {
    await Promise.all(cart.map(i =>
      axios.put(`${API}/api/items/${i._id}/decrement`, {}, headers)
    ))
    await Promise.all(cart.map(i =>
      axios.delete(`${API}/api/users/cart/remove/${i._id}`, headers)
    ))
    const res = await axios.get(`${API}/api/users/cart`, headers)
    setCart(res.data.cart)
    alert(`Purchased for ${total} SAR`)
  }

  const HeaderCapsule = ({ title, count, open, setOpen, icon: Icon }) => (
    <div style={styles.headerCapsule} onClick={() => setOpen(!open)}>
      <div style={styles.leftSection}>
        <DropdownIcon style={{
          ...styles.dropdownIcon,
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)'
        }}/>
        <div>
          <div style={styles.headerText}>{title}</div>
          <div style={styles.subText}>{count} item(s)</div>
        </div>
      </div>
      <Icon style={styles.sectionIcon}/>
    </div>
  )

  const ItemCard = ({ item, type }) => {
    let daysLeft = null
    if (type === 'bid' && item.auctionEndDate) {
      const diff = new Date(item.auctionEndDate) - Date.now()
      daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24))
      if (daysLeft < 0) daysLeft = 0
    }

    return (
      <div style={styles.card}>
        <img
          src={item.images?.[0] || ''}
          alt={item.name}
          style={styles.itemImage}
          onClick={() => navigate(`/item/${item._id}`)}
        />
        <div style={styles.itemText} onClick={() => navigate(`/item/${item._id}`)}>
          <div style={styles.name}>{item.name}</div>
          {type !== 'bid' && <div style={styles.buy}>Buy: {item.price} SAR</div>}
          {type === 'bid' && daysLeft !== null && (
            <div style={styles.bidTime}>
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </div>
          )}
        </div>
        <div style={styles.buttonBox}>
          {type === 'cart' && (
            <>
              <button style={styles.btn} onClick={() => moveTo('cart','watchlist',item)}>
                <EyeIcon style={styles.btnIcon}/> Move to Watchlist
              </button>
              <button style={styles.btn} onClick={() => removeFrom('cart',item._id)}>
                <DeleteIcon style={styles.btnIcon}/> Remove
              </button>
            </>
          )}
          {type === 'watchlist' && (
            <>
              <button style={styles.btn} onClick={() => moveTo('watchlist','cart',item)}>
                <CartIcon style={styles.btnIcon}/> Move to Cart
              </button>
              <button style={styles.btn} onClick={() => removeFrom('watchlist',item._id)}>
                <DeleteIcon style={styles.btnIcon}/> Remove
              </button>
            </>
          )}
          {type === 'bid' && (
            <>
              <button style={styles.btn}>
                <StatsIcon style={styles.btnIcon}/> Bid
              </button>
              <button style={styles.btn} onClick={() => removeFrom('bidlist',item._id)}>
                <DeleteIcon style={styles.btnIcon}/> Remove
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.section}>
        <HeaderCapsule title="Cart"      count={cart.length}      open={cartOpen}  setOpen={setCartOpen}   icon={CartIcon}/>
        <div style={{
          ...styles.animatedBox,
          maxHeight: cartOpen ? '1000px' : '0',
          opacity:    cartOpen ? 1        : 0,
          marginTop:  cartOpen ? 10      : 0
        }}>
          {cart.map(item => <ItemCard key={item._id} item={item} type="cart"/>)}
          {cart.length > 0 && (
            <div style={styles.footer}>
              <div style={styles.total}>Total: {total} SAR</div>
              <button style={styles.buyBtn} onClick={buyAll}>
                <CheckIcon style={styles.btnIconWhite}/> Buy All
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule title="Watchlist" count={watchlist.length} open={watchOpen} setOpen={setWatchOpen} icon={EyeIcon}/>
        <div style={{
          ...styles.animatedBox,
          maxHeight: watchOpen ? '1000px' : '0',
          opacity:    watchOpen ? 1       : 0,
          marginTop:  watchOpen ? 10     : 0
        }}>
          {watchlist.map(item => <ItemCard key={item._id} item={item} type="watchlist"/>)}
        </div>
      </div>

      <div style={styles.section}>
        <HeaderCapsule title="Bidlist" count={bidlist.length} open={bidOpen} setOpen={setBidOpen} icon={BidIcon}/>
        <div style={{
          ...styles.animatedBox,
          maxHeight: bidOpen ? '1000px' : '0',
          opacity:    bidOpen ? 1       : 0,
          marginTop:  bidOpen ? 10     : 0
        }}>
          {bidlist.map(item => <ItemCard key={item._id} item={item} type="bid"/>)}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper:    { backgroundColor:'var(--white)',minHeight:'100vh',padding:'1rem',color:'var(--text-dark)' },
  section:    { marginBottom:'2rem' },
  headerCapsule: { display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:30,padding:'0.75rem 1rem',backgroundColor:'var(--primary-green)',cursor:'pointer' },
  leftSection:{ display:'flex',alignItems:'center',gap:10 },
  dropdownIcon:{ width:24,height:24,filter:'brightness(0) invert(1)',transition:'transform .3s' },
  sectionIcon:{ width:24,height:24,fill:'white' },
  headerText: { fontSize:'1rem',fontWeight:'bold',color:'white' },
  subText:    { fontSize:'.75rem',color:'rgba(255,255,255,0.9)' },
  animatedBox:{ overflow:'hidden',transition:'all .4s ease' },
  card:       { display:'flex',alignItems:'center',padding:'.7rem',border:'1px solid var(--gray-border)',borderRadius:10,marginBottom:'.8rem',boxShadow:'0 1px 4px var(--card-shadow)',background:'var(--white)' },
  itemImage:  { width:60,height:60,objectFit:'cover',borderRadius:8,marginRight:'.75rem',cursor:'pointer' },
  itemText:   { flex:1,cursor:'pointer' },
  name:       { fontWeight:600,marginBottom:4,color:'var(--text-dark)' },
  buy:        { color:'var(--primary-green)',fontSize:'.8rem' },
  bidTime:    { color:'#d8c555',fontSize:'.75rem',marginTop:2 },
  buttonBox:  { display:'flex',flexDirection:'column',gap:8 },
  btn:        { display:'flex',alignItems:'center',gap:6,padding:'.3rem .5rem',fontSize:'.75rem',border:'1px solid var(--gray-border)',borderRadius:6,background:'var(--white)',cursor:'pointer',color:'var(--text-dark)' },
  btnIcon:    { width:16,height:16,fill:'currentColor' },
  btnIconWhite:{ width:16,height:16,fill:'white' },
  footer:     { display:'flex',justifyContent:'space-between',alignItems:'center',padding:'.5rem .8rem',borderTop:'1px solid var(--gray-border)' },
  total:      { fontWeight:'bold',fontSize:'1rem',color:'var(--text-dark)' },
  buyBtn:     { display:'flex',alignItems:'center',gap:6,padding:'.5rem 1rem',backgroundColor:'var(--primary-green)',color:'white',border:'none',borderRadius:8,cursor:'pointer' }
}

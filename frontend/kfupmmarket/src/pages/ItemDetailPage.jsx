// src/pages/ItemDetailPage.jsx

import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { ReactComponent as ReportIcon } from '../assets/icons/report.svg'
import { ReactComponent as ChatIcon }   from '../assets/icons/chatf.svg'
import { ReactComponent as WeightIcon } from '../assets/icons/weightf.svg'
import { ReactComponent as DimIcon }    from '../assets/icons/dimensions.svg'
import { ReactComponent as CartIcon }   from '../assets/icons/cartf.svg'
import { ReactComponent as BidIcon }    from '../assets/icons/bid.svg'

export default function ItemDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()

  const [item, setItem] = useState(null)
  const [currentBid, setCurrentBid] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL
    axios.get(`${API}/api/items/all`)
      .then(res => {
        const found = res.data.items.find(i => i._id === id)
        if (!found) {
          setItem(undefined)
          return
        }
        setItem(found)
        const bids = found.bids || []
        setCurrentBid(
          bids.length
            ? Math.max(...bids.map(b => b.amount))
            : found.startingBid || 0
        )
        if (found.auctionEndDate) {
          const diff = new Date(found.auctionEndDate) - Date.now()
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
          setTimeLeft(days > 0 ? days : 0)
        }
      })
      .catch(() => setItem(undefined))
  }, [id])

  if (item === null) return null
  if (item === undefined) return <div style={{ padding:'2rem' }}>Item not found</div>

  const images = item.images || []
  const qtyText = item.quantity > 1
    ? `${item.quantity} left`
    : item.quantity === 1
      ? '1 left'
      : 'Sold out'

  const handleAddToCart = async () => {
    try {
      const API = process.env.REACT_APP_API_URL
      await axios.post(
        `${API}/api/users/cart/add/${item._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Added to cart')
    } catch {
      alert('Failed to add to cart')
    }
  }

  const handleAddToBidlist = async () => {
    try {
      const API = process.env.REACT_APP_API_URL
      await axios.post(
        `${API}/api/users/bidlist/add/${item._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Added to bid list')
    } catch {
      alert('Failed to add to bid list')
    }
  }

  const handleContact = () => {
    navigate(`/chat/${item.accountId}`)
  }

  const handleReport = () => {
    alert('Listing reported')
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>

        <img src={images[imgIndex]} alt={item.name} style={styles.mainImage} />
        {images.length > 1 && (
          <div style={styles.thumbRow}>
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                onClick={() => setImgIndex(i)}
                style={{
                  ...styles.thumb,
                  borderColor: i === imgIndex
                    ? 'var(--primary-green)'
                    : 'transparent'
                }}
              />
            ))}
          </div>
        )}

        <div style={styles.info}>
          <h2 style={styles.title}>{item.name}</h2>

          {(item.type === 'Sale' || item.type === 'Both') && (
            <div style={styles.price}>Price: {item.price} SAR</div>
          )}
          {(item.type === 'Auction' || item.type === 'Both') && (
            <>
              <div style={styles.currentBid}>Current Bid: {currentBid} SAR</div>
              <div style={styles.time}>
                Time Remaining: {timeLeft} {timeLeft === 1 ? 'Day' : 'Days'}
              </div>
            </>
          )}
          {item.type === 'Sale' && (
            <div style={styles.qty}>Quantity: {qtyText}</div>
          )}

          <p style={styles.desc}>{item.description}</p>

          <div style={styles.specRow}>
            <DimIcon style={styles.icon}/>
            <span>{item.width || '-'}W x {item.length || '-'}L x {item.height || '-'}H cm</span>
          </div>
          <div style={styles.specRow}>
            <WeightIcon style={styles.icon}/>
            <span>Weight: {item.weight || '-'} kg</span>
          </div>

          <div style={styles.actions}>
            {(item.type === 'Sale' || item.type === 'Both') && (
              <button onClick={handleAddToCart} style={styles.cartBtn}>
                <CartIcon style={styles.btnIcon}/> Add to Cart
              </button>
            )}
            {(item.type === 'Auction' || item.type === 'Both') && (
              <button onClick={handleAddToBidlist} style={styles.bidBtn}>
                <BidIcon style={styles.btnIcon}/> Add to Bidlist
              </button>
            )}
          </div>

          <div style={styles.footerBtns}>
            <button onClick={handleContact} style={styles.optBtn}>
              <ChatIcon style={styles.optIcon}/> Contact Seller
            </button>
            <button onClick={handleReport} style={styles.optBtn}>
              <ReportIcon style={styles.optIcon}/> Report Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    minHeight: '100vh',
    paddingBottom: '5rem',
    display: 'flex',
    justifyContent: 'center'
  },
  container: { width: '100%', maxWidth: 480 },
  backBtn: {
    position: 'sticky', top: 0, zIndex: 10,
    background: 'var(--white)',
    padding: '0.75rem 1rem',
    border: 'none',
    color: 'var(--primary-green)',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  mainImage: { width: '100%', height: 280, objectFit: 'cover' },
  thumbRow: { display: 'flex', justifyContent: 'center', gap: 10, padding: '0.5rem' },
  thumb: {
    width: 60, height: 60,
    objectFit: 'cover',
    borderRadius: 8,
    border: '2px solid',
    cursor: 'pointer'
  },
  info: { padding: '1rem' },
  title: { margin: 0, fontSize: '1.25rem', fontWeight: 600 },
  price:    { marginTop: 6, color: 'var(--primary-green)', fontWeight: 600 },
  currentBid: { marginTop: 6, color: '#d8c555', fontWeight: 600 },
  time:     { marginTop: 4, color: 'red', fontSize: '.85rem' },
  qty:      { marginTop: 4, color: 'gray', fontSize: '.85rem' },
  desc:     { marginTop: 10, lineHeight: 1.4 },
  specRow:  { display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: '.85rem' },
  icon:     { width: 18, height: 18, fill: 'var(--text-dark)' },
  actions:  { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 },
  cartBtn: {
    background: 'var(--primary-green)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    cursor: 'pointer'
  },
  bidBtn: {
    background: '#d8c555',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    cursor: 'pointer'
  },
  btnIcon: { width: 16, height: 16, fill: '#fff' },
  footerBtns: { display: 'flex', gap: 10, marginTop: 20 },
  optBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    padding: '0.6rem',
    border: '1px solid var(--gray-border)',
    borderRadius: 8,
    background: 'var(--white)',
    color: 'var(--text-dark)',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  optIcon: { width: 16, height: 16, fill: 'var(--text-dark)' }
}

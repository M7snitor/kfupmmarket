// backend/routes/user.js

const express = require('express')
const router  = express.Router()
const auth    = require('../middlewares/authMiddleware')
const {
  getMyListings,
  getCart, addToCart, removeFromCart, moveToWatchlist,
  getWatchlist, addToWatchlist, removeFromWatchlist, moveToCart,
  getBidlist, addToBidlist, removeFromBidlist,
  updateProfile
} = require('../controllers/userController')

// Get Profile Info
router.get('/profile', auth, async (req, res) => {
  const User = require('../models/User')
  const user = await User.findById(req.userId)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({ user })
})

// Update Profile Info
router.put('/update-profile', auth, updateProfile)

// My Listings
router.get('/my-listings', auth, getMyListings)

// Cart Routes
router.get('/cart', auth, getCart)
router.post('/cart/add/:itemId', auth, addToCart)
router.delete('/cart/remove/:itemId', auth, removeFromCart)
router.post('/cart/move-to-watchlist/:itemId', auth, moveToWatchlist)

// Watchlist Routes
router.get('/watchlist', auth, getWatchlist)
router.post('/watchlist/add/:itemId', auth, addToWatchlist)
router.delete('/watchlist/remove/:itemId', auth, removeFromWatchlist)
router.post('/watchlist/move-to-cart/:itemId', auth, moveToCart)

// Bidlist Routes
router.get('/bidlist', auth, getBidlist)
router.post('/bidlist/add/:itemId', auth, addToBidlist)
router.delete('/bidlist/remove/:itemId', auth, removeFromBidlist)

module.exports = router

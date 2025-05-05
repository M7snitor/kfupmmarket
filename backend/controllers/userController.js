// backend/controllers/userController.js

const User = require('../models/User')
const Item = require('../models/Item')

// Retrieve listings created by the authenticated user
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Item
      .find({ accountId: req.user.accountId })
      .sort({ createdAt: -1 })
    res.json({ listings })
  } catch (err) {
    console.error('getMyListings error:', err)
    res.status(500).json({ message: 'Failed to fetch listings', error: err.message })
  }
}

// Retrieve the contents of the user's cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart')
    res.json({ cart: user.cart })
  } catch (err) {
    console.error('getCart error:', err)
    res.status(500).json({ message: 'Error getting cart', error: err.message })
  }
}

// Add an item to cart and remove it from watchlist and bidlist if present
exports.addToCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { cart: req.params.itemId },
      $pull:    { watchlist: req.params.itemId, bidlist: req.params.itemId }
    })
    res.json({ message: 'Item added to cart' })
  } catch (err) {
    console.error('addToCart error:', err)
    res.status(500).json({ message: 'Error adding to cart', error: err.message })
  }
}

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { cart: req.params.itemId }
    })
    res.json({ message: 'Item removed from cart' })
  } catch (err) {
    console.error('removeFromCart error:', err)
    res.status(500).json({ message: 'Error removing from cart', error: err.message })
  }
}

// Move an item from cart to watchlist
exports.moveToWatchlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull:     { cart: req.params.itemId, bidlist: req.params.itemId },
      $addToSet: { watchlist: req.params.itemId }
    })
    res.json({ message: 'Item moved to watchlist' })
  } catch (err) {
    console.error('moveToWatchlist error:', err)
    res.status(500).json({ message: 'Error moving item to watchlist', error: err.message })
  }
}

// Retrieve the contents of the user's watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('watchlist')
    res.json({ watchlist: user.watchlist })
  } catch (err) {
    console.error('getWatchlist error:', err)
    res.status(500).json({ message: 'Error getting watchlist', error: err.message })
  }
}

// Add an item to watchlist and remove it from cart and bidlist if present
exports.addToWatchlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { watchlist: req.params.itemId },
      $pull:    { cart: req.params.itemId, bidlist: req.params.itemId }
    })
    res.json({ message: 'Item added to watchlist' })
  } catch (err) {
    console.error('addToWatchlist error:', err)
    res.status(500).json({ message: 'Error adding to watchlist', error: err.message })
  }
}

// Remove an item from the watchlist
exports.removeFromWatchlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { watchlist: req.params.itemId }
    })
    res.json({ message: 'Item removed from watchlist' })
  } catch (err) {
    console.error('removeFromWatchlist error:', err)
    res.status(500).json({ message: 'Error removing from watchlist', error: err.message })
  }
}

// Move an item from watchlist to cart
exports.moveToCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull:     { watchlist: req.params.itemId, bidlist: req.params.itemId },
      $addToSet: { cart:      req.params.itemId }
    })
    res.json({ message: 'Item moved to cart' })
  } catch (err) {
    console.error('moveToCart error:', err)
    res.status(500).json({ message: 'Error moving item to cart', error: err.message })
  }
}

// Retrieve the contents of the user's bidlist
exports.getBidlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('bidlist')
    res.json({ bidlist: user.bidlist })
  } catch (err) {
    console.error('getBidlist error:', err)
    res.status(500).json({ message: 'Error getting bidlist', error: err.message })
  }
}

// Add an item to bidlist and remove it from cart and watchlist if present
exports.addToBidlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { bidlist: req.params.itemId },
      $pull:    { cart: req.params.itemId, watchlist: req.params.itemId }
    })
    res.json({ message: 'Item added to bidlist' })
  } catch (err) {
    console.error('addToBidlist error:', err)
    res.status(500).json({ message: 'Error adding to bidlist', error: err.message })
  }
}

// Remove an item from the bidlist
exports.removeFromBidlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { bidlist: req.params.itemId }
    })
    res.json({ message: 'Item removed from bidlist' })
  } catch (err) {
    console.error('removeFromBidlist error:', err)
    res.status(500).json({ message: 'Error removing from bidlist', error: err.message })
  }
}

// Update basic profile fields
exports.updateProfile = async (req, res) => {
  const { email, phone, onCampus, buildingNumber, roomNumber } = req.body
  try {
    await User.findByIdAndUpdate(req.userId, {
      email,
      phone,
      onCampus,
      buildingNumber: onCampus ? buildingNumber : '',
      roomNumber:     onCampus ? roomNumber     : ''
    })
    res.json({ message: 'Profile updated' })
  } catch (err) {
    console.error('updateProfile error:', err)
    res.status(500).json({ message: 'Error updating profile', error: err.message })
  }
}


// backend/controllers/itemController.js

const Item = require('../models/Item')
const User = require('../models/User')

// GET /api/items/all
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 })
    res.json({ items })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/items/post-item
exports.postItem = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      categories,
      price,
      quantity,
      startingBid,
      duration,
      width,
      length,
      height,
      weight
    } = req.body

    if (!req.files || req.files.length < 1) {
      return res.status(400).json({ message: 'At least one image is required' })
    }

    const images = req.files.map(f => `/uploads/${f.filename}`)
    const cats = typeof categories === 'string'
      ? categories.split(',').map(c => c.trim()).filter(Boolean)
      : categories

    const qty   = Number(quantity)    || 1
    const bid   = Number(startingBid) || 0
    const days  = Number(duration)    || 7
    const auctionEnd = ['Auction','Both'].includes(type)
      ? new Date(Date.now() + days * 24*60*60*1000)
      : undefined

    const item = new Item({
      name,
      description,
      type,
      categories: cats,
      price: Number(price) || 0,
      quantity: qty,
      startingBid: bid,
      auctionEndDate: auctionEnd,
      width:  Number(width)  || undefined,
      length: Number(length) || undefined,
      height: Number(height) || undefined,
      weight: Number(weight) || undefined,
      images,
      accountId: req.user.accountId
    })

    await item.save()
    await User.findByIdAndUpdate(req.userId, { $push: { myListings: item._id } })
    res.status(201).json({ item })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/items/:itemId/bid
exports.placeBid = async (req, res) => {
  try {
    const { itemId } = req.params
    const { amount } = req.body
    const item = await Item.findById(itemId)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (!['Auction','Both'].includes(item.type)) {
      return res.status(400).json({ message: 'Bidding only on auction items' })
    }
    item.bids.push({ userId: req.userId, amount: Number(amount) || 0 })
    await item.save()
    res.json({ bids: item.bids })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/items/:itemId
exports.updateItem = async (req, res) => {
  try {
    const { itemId } = req.params
    const {
      name,
      description,
      type,
      categories,
      price,
      quantity,
      startingBid,
      duration,
      width,
      length,
      height,
      weight
    } = req.body

    const item = await Item.findById(itemId)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (item.accountId !== req.user.accountId) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    if (name)        item.name        = name
    if (description) item.description = description
    if (type)        item.type        = type

    if (categories) {
      item.categories = typeof categories === 'string'
        ? categories.split(',').map(c => c.trim()).filter(Boolean)
        : categories
    }

    if (price)       item.price       = Number(price)
    if (quantity)    item.quantity    = Number(quantity)
    if (startingBid) item.startingBid = Number(startingBid)

    if (['Auction','Both'].includes(item.type)) {
      const days = Number(duration) || 7
      item.auctionEndDate = new Date(Date.now() + days * 24*60*60*1000)
    } else {
      item.auctionEndDate = undefined
      item.bids = []
    }

    if (width)  item.width  = Number(width)
    if (length) item.length = Number(length)
    if (height) item.height = Number(height)
    if (weight) item.weight = Number(weight)

    if (req.files && req.files.length) {
      item.images = req.files.map(f => `/uploads/${f.filename}`)
    }

    await item.save()
    res.json({ item })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/items/:itemId
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params
    const item = await Item.findById(itemId)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (item.accountId !== req.user.accountId) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    await item.remove()
    await User.findByIdAndUpdate(req.userId, { $pull: { myListings: item._id } })
    res.json({ message: 'Listing deleted' })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/items/:itemId/decrement
exports.decrementQuantity = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    if (item.type === 'Sale' && item.quantity > 0) {
      item.quantity -= 1
      await item.save()
    }
    res.json({ item })

  } catch (err) {
    res.status(500).json({ message: 'Error updating quantity', error: err.message })
  }
}

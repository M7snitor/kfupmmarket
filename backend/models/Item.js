// backend/models/Item.js

const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Sale', 'Auction', 'Both'],
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: function() {
      return this.type === 'Sale' || this.type === 'Both'
    },
    default: 0
  },
  quantity: {
    type: Number,
    default: 1
  },
  startingBid: {
    type: Number,
    default: 0
  },
  auctionEndDate: {
    type: Date
  },
  width: {
    type: Number
  },
  length: {
    type: Number
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: arr => arr.length > 0,
      message: 'At least one image is required'
    }
  },
  accountId: {
    type: String,
    required: true
  },
  bids: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)

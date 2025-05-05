const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accountId: {
    type: String, // Optional, used for external references or display
    unique: true
  },
  isStudent: {
    type: Boolean,
    default: true
  },
  onCampus: {
    type: Boolean,
    default: false
  },
  buildingNumber: String,
  roomNumber: String,
  club: {
    name: String,
    role: {
      type: String,
      enum: ['admin', 'member']
    }
  },
  myListings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  bidlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

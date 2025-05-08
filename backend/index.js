const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// === CORS Fix ===
app.use(cors({
  origin: 'https://kfupmmarket-frhv-hl251n84g-m7snitors-projects.vercel.app',
  credentials: true
}));

// Middleware
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items'));
app.use('/api/messages', require('./routes/message'));

// Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port', process.env.PORT || 5000);
    });
  })
  .catch(err => console.error(err));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'https://kfupmmarket-frhv.vercel.app',
    'https://kfupmmarket-frhv-hl251n84g-m7snitors-projects.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items'));
app.use('/api/messages', require('./routes/message'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

module.exports = serverless(app);

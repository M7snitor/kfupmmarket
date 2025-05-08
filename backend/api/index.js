// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const serverless = require('serverless-http');
// require('dotenv').config();

// const app = express();

// // CORS config
// const corsOptions = {
//   origin: [
//     'https://kfupmmarket-frhv.vercel.app',
//     'https://kfupmmarket-frhv-m7snitors-projects.vercel.app',
//     'https://kfupmmarket-frhv-git-master-m7snitors-projects.vercel.app',
//     'https://kfupmmarket-frhv-k12n7kkwi-m7snitors-projects.vercel.app'
//   ],
//   credentials: true
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/user'));
// app.use('/api/items', require('./routes/items'));
// app.use('/api/messages', require('./routes/message'));

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// module.exports.handler = serverless(app);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();


app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('../routes/auth'));
app.use('/api/users', require('../routes/user'));
app.use('/api/items', require('../routes/items'));
app.use('/api/messages', require('../routes/message'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

module.exports.handler = serverless(app);

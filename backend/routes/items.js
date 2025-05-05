// backend/routes/item.js

const express = require('express')
const router  = express.Router()
const path    = require('path')
const multer  = require('multer')
const auth    = require('../middlewares/authMiddleware')
const {
  postItem,
  getAllItems,
  placeBid,
  updateItem,
  deleteItem,
  decrementQuantity      // new controller to handle stock decrement
} = require('../controllers/itemController')

// Multer configuration to store up to 3 images under /uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})
const upload = multer({ storage })

// health-check endpoint
router.get('/test', (req, res) => res.send('Item route works!'))

// single-image upload helper
router.post('/upload-image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.json({ imagePath: `/uploads/${req.file.filename}` })
})

// fetch all listings
router.get('/all', getAllItems)

// create a new listing (up to 3 images)
router.post(
  '/post-item',
  auth,
  upload.array('images', 3),
  postItem
)

// place a bid on an auction item
router.post('/:itemId/bid', auth, placeBid)

// update an existing listing (also up to 3 new images)
router.put(
  '/:itemId',
  auth,
  upload.array('images', 3),
  updateItem
)

// delete one of your listings
router.delete('/:itemId', auth, deleteItem)

// decrement stock by 1 (for "Buy all" actions)
router.put('/:itemId/decrement', auth, decrementQuantity)

module.exports = router

const express = require('express')
const router  = express.Router()
const auth    = require('../middlewares/authMiddleware')
const multer  = require('multer')
const path    = require('path')
const {
  sendMessage,
  getMessages,
  getConversations
} = require('../controllers/messageController')

// store chat images (if you decide to use them later)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/messages/')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

router.post('/',        auth, sendMessage)
router.post('/send',    auth, sendMessage)
router.post('/upload',  auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.json({ imagePath: `/uploads/messages/${req.file.filename}` })
})

router.get('/conversations', auth, getConversations)
router.get('/:withUserId',    auth, getMessages)

module.exports = router

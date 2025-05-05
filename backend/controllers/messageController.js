const mongoose = require('mongoose')
const Message  = require('../models/Message')
const User     = require('../models/User')

exports.sendMessage = async (req, res) => {
  const { to, content } = req.body
  let recipientId

  if (mongoose.Types.ObjectId.isValid(to)) {
    recipientId = to
  } else {
    const other = await User.findOne({ accountId: to })
    if (!other) return res.status(404).json({ message: 'Recipient not found' })
    recipientId = other._id
  }

  if (!content && !req.file) {
    return res.status(400).json({ message: 'Message must include text or image' })
  }

  try {
    const msg = new Message({
      from:  req.userId,
      to:    recipientId,
      content,
      image: req.file ? `/uploads/messages/${req.file.filename}` : undefined
    })
    await msg.save()
    res.status(201).json({ data: msg })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMessages = async (req, res) => {
  const { withUserId } = req.params
  let otherId

  if (mongoose.Types.ObjectId.isValid(withUserId)) {
    otherId = withUserId
  } else {
    const other = await User.findOne({ accountId: withUserId })
    if (!other) return res.status(404).json({ message: 'User not found' })
    otherId = other._id
  }

  try {
    const messages = await Message.find({
      $or: [
        { from: req.userId, to: otherId },
        { from: otherId,    to: req.userId }
      ]
    }).sort({ timestamp: 1 })
    res.json({ messages })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getConversations = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.userId)
    const convos = await Message.aggregate([
      { $match: { $or: [ { from: userId }, { to: userId } ] } },
      { $project: {
          other:    { $cond: [ { $eq: ['$from', userId] }, '$to', '$from' ] },
          content:  1,
          timestamp:1
        }
      },
      { $sort: { timestamp: -1 } },
      { $group: {
          _id:         '$other',
          lastMessage: { $first: '$content' },
          timestamp:   { $first: '$timestamp' }
        }
      },
      { $lookup: {
          from:         'users',
          localField:   '_id',
          foreignField: '_id',
          as:           'user'
        }
      },
      { $unwind: '$user' },
      { $project: {
          _id:         0,
          user: {
            _id:       '$user._id',
            name:      '$user.name',
            accountId: '$user.accountId'
          },
          lastMessage:1,
          timestamp:  1
        }
      }
    ])
    res.json({ conversations: convos })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

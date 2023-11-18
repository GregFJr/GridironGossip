const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
  chatRoomId: mongoose.Schema.Types.ObjectId,
  // If we want to tie messages to a game:
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
});

module.exports = mongoose.model('Message', messageSchema);
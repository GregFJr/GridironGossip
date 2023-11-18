const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  teams: {
    type: [String],
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  // We can include other fileds if needed
});

module.exports = mongoose.model('Game', gameSchema);
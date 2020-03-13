const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  id: {
    unique: true,
    type: Number,
    required: true,
  },
  owner: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  tags: Array,
});

module.exports = mongoose.model('Post', postSchema);

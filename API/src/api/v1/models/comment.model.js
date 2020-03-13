const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const commentSchema = new Schema({
  id: {
    unique: true,
    type: Number,
    required: true,
  },
  owner: {
    type: Number,
    required: true,
  },
  post: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Comment', commentSchema);
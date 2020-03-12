const { Schema } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const commentSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
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
    type: Date,
    required: true,
    default: Date.now(),
  },
});

//Export the model
module.exports = mongoose.model('Comment', commentSchema);
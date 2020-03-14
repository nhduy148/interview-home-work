const { saltRounds } = require('../../../config/vars');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  id: {
    unique: true,
    type: Number,
    required: true,
  },
  username: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  created_at: {
    type: Number,
    default: Date.now()
  },
});

// hash password when add a new User
userSchema.pre("save", async function save(next) {
  try {
    if( !this.isModified('password') )  return next();
    
    const hash = bcrypt.hashSync(this.password, saltRounds);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
})

// hash password when update User Information
userSchema.pre("findOneAndUpdate", async function(next) {
  if( !this._update.password )  return next();
  try {    
    const hash = bcrypt.hashSync(this._update.password, saltRounds);
    this._update.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
})

userSchema.method({
  format() {
    const formatted = {};
    const fields = ['id', 'username', 'name', 'date_of_birth', 'createdAt'];

    fields.forEach((field) => {
      formatted[field] = this[field];
    });

    return formatted;
  },
  async comparePassword(password) {    
    return await bcrypt.compare(password, this.password);
  },
})

//Export the model
module.exports = mongoose.model('User', userSchema);

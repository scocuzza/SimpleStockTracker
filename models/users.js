const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  watchlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Watchlist',
    }
]
})
const User = mongoose.model('User', userSchema)
module.exports = User
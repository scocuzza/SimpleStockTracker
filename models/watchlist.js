const mongoose = require('mongoose')

const watchListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
      }
  ]
},
    { timestamps: true }    
)



const WatchList = mongoose.model('Watchlist', watchListSchema)

module.exports = WatchList
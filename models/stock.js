const mongoose = require('mongoose')

const Schema = mongoose.Schema
const stockSchema = Schema({
  symbol: {type: String},
  description: {type: String},
  lastPrice: {type: String},
  netChange: {type: String},
  yearHigh: {type: String},
  yearLow: {type: String},
})
const Stock = mongoose.model('Stock', stockSchema)
module.exports = Stock
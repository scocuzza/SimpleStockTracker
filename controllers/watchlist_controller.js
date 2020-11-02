
const router = require('express').Router();
const axios = require('axios');
const WatchList = require('../models/watchlist');
const Stock = require("../models/stock")
const helper = require('../helper_functions')

//INDEX
router.get('/', async (req, res) => {
    let watchlist = await WatchList.find({})
    res.render('./watchlist/index.ejs', {watchlists: watchlist})
})

//NEW
router.get('/new', async (req, res) => {
    res.render('./watchlist/new.ejs')
})

//CREATE watchlist
router.post('/', async (req, res)=>{
    await WatchList.create(req.body)
    res.redirect('/watchlists')
})

//CREATE add stock to watchlist
router.post('/:id/stocks', async (req, res)=> {
    let stockData = await helper.getStockData(req.body.symbol)
    let newStock = await helper.createStock(stockData, req.body.symbol)
    Stock.create(newStock)
    let currentWatchlist = await WatchList.findById(req.params.id)
    currentWatchlist.stocks.push(newStock)
    console.log(currentWatchlist);
    currentWatchlist.save(function (err, watchlist) {
        if (err) {
          console.log(err);
        } else {
        }
    })
    res.redirect('/watchlists/'+req.params.id)
})

//DELETE
router.delete('/:id', async (req, res)=> {
    await WatchList.findByIdAndDelete(req.params.id)
    res.redirect('/watchlists')
})

//SHOW
router.get('/:id', async (req, res)=>{
    let watchlist = await WatchList.findById(req.params.id).populate('stocks')
    console.log(watchlist);
    res.render('./watchlist/show.ejs', {watchlist})
})

module.exports = router;
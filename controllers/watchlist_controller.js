
const router = require('express').Router();
const axios = require('axios');
const WatchList = require('../models/watchlist');
const Stocks = require("../models/stock")

//INDEX
router.get('/', async (req, res) => {
    let watchlist = await WatchList.find({})
    console.log(watchlist);
    res.render('./watchlist/index.ejs', {watchlists: watchlist})
})

//NEW
router.get('/new', async (req, res) => {
    res.render('./watchlist/new.ejs')
})
//SHOW
router.get('/:id', async (req, res)=>{
    let watchlist = await WatchList.findById(req.params.id).populate('stocks')
    console.log(watchlist);
    res.render('./watchlist/show.ejs', {watchlist})
})

//CREATE watchlist
router.post('/', async (req, res)=>{
    console.log(req.body);
    await WatchList.create(req.body)
    res.redirect('/watchlists')
})

//DELETE
router.delete('/:id', async (req, res)=> {
    await WatchList.findByIdAndDelete(req.params.id)
    res.redirect('/watchlists')
})

module.exports = router;
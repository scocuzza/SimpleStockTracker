
const router = require('express').Router();
const axios = require('axios');
const WatchList = require('../models/watchlist');
const Stock = require("../models/stock")
const User = require("../models/users")
const helper = require('../helper_functions')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next();
    } else {
      res.redirect('/sessions/new');
    }
  };

//GET ROUTES
//INDEX
router.get('/', isAuthenticated, async (req, res) => {
    let user = await User.findById(req.session.currentUser._id).populate('watchlists')
    res.render('./watchlist/index.ejs', {
        watchlists: user.watchlists,
        currentUser: req.session.currentUser 
    })
})
//NEW
router.get('/new', isAuthenticated, async (req, res) => {
    res.render('./watchlist/new.ejs', { currentUser: req.session.currentUser })
})
//SHOW
router.get('/:id', isAuthenticated, async (req, res)=>{
    let watchlist = await WatchList.findById(req.params.id).populate('stocks')
    setInterval( async()=>{
        let watchlist = await WatchList.findById(req.params.id).populate('stocks')
        if (watchlist.stocks != null) {
            stocks = watchlist.stocks
            global.io.emit('testEvent2', {stocks})
        }
    },5000)
    res.render('./watchlist/show.ejs', {watchlist, currentUser: req.session.currentUser })
})
//Edit
router.get('/:watchlistid/stocks/:stockid/edit', isAuthenticated, async (req, res)=>{
    let watchlistid = req.params.watchlistid
    let stockid = req.params.stockid
    let watchlist = await WatchList.findById(watchlistid)
    let stock = await Stock.findById(stockid)
    res.render('./watchlist/edit.ejs', {
        watchlist,
        currentUser: req.session.currentUser,
        stock
     })
})
//Edit
router.get('/:watchlistid/edit', isAuthenticated, async (req, res)=>{
    let watchlist = await WatchList.findById(req.params.watchlistid)
    res.render('./watchlist/watchlist_edit.ejs', {
        watchlist,
        currentUser: req.session.currentUser
     })
})

//POST Routes
//CREATE watchlist
router.post('/', isAuthenticated, async (req, res)=>{
    let watchlist = await WatchList.create(req.body)
    let user = await User.findById(req.session.currentUser._id)
    await user.watchlists.push(watchlist)
    await user.save(function (err, watchlist) {
        if (err) {
            console.log(err);
        } else {
        }
    })
    res.redirect('/watchlists')
})
//CREATE add stock to watchlist
router.post('/stocks/:id',isAuthenticated, async (req, res)=> {
    let currentWatchlist = await WatchList.findById(req.params.id)
    let stockFound =  await Stock.findOne({symbol: req.body.symbol.toUpperCase()})
    let isStockFound =  await Stock.findOne({symbol: req.body.symbol.toUpperCase()}).countDocuments() > 0
    if(!isStockFound) {
        let stockData = await helper.getStockData(req.body.symbol)
        let newStock = await helper.createStock(stockData, req.body.symbol)
        Stock.create(newStock)
        currentWatchlist.stocks.push(newStock)
    } else {
        if((currentWatchlist.stocks).includes(stockFound._id) === false) {
            currentWatchlist.stocks.push(stockFound)
        }
    }
    currentWatchlist.save(function (err, watchlist) {
        if (err) {
            console.log(err);
        } else {
        }
    })
    res.redirect('/watchlists/'+req.params.id)
})
//DELETE ROUTES
//DELETE
router.delete('/:watchlistid/stocks/:stockid', isAuthenticated, async (req, res)=> {
    let stockID = req.params.stockid 
    let watchlist = await WatchList.findById(req.params.watchlistid)
    watchlist.stocks.remove(stockID)
    watchlist.save(function (err, watchlist) {
        if (err) {
            console.log(err);
        } else {
        }
    })
    res.redirect('/watchlists/'+req.params.watchlistid)
})
//DELETE
router.delete('/:id', isAuthenticated, async (req, res)=> {
    await WatchList.findByIdAndDelete(req.params.id)
    res.redirect('/watchlists/')
})

//UPDATE ROUTES
//PUT
router.put('/:watchlistid/stocks/:stockid/edit', isAuthenticated, async (req, res)=>{
    let symbolEntered = req.body.symbol.toUpperCase()
    let existingStock = await Stock.findById(req.params.stockid)
    let isNewStockFound = await Stock.findOne({symbol: symbolEntered}).countDocuments() > 0
    let watchlist = await WatchList.findById(req.params.watchlistid)
    watchlist.stocks.remove(existingStock._id)
    
    if (isNewStockFound) {
        let stockFound = await Stock.findOne({symbol: symbolEntered})
        watchlist.stocks.push(stockFound._id)
    } else {
        let newStockData = await helper.getStockData(symbolEntered)
        let newStock = await helper.createStock(newStockData, symbolEntered)
        Stock.create(newStock)
        watchlist.stocks.push(newStock)
    }
    watchlist.save(function (err, watchlist) {
        if (err) {
            console.log(err);
        } else {
        }
    })
    res.redirect('/watchlists/'+req.params.watchlistid)
})

router.put('/:watchlistid/edit', isAuthenticated, async (req, res)=>{
    let watchlist = await WatchList.findById(req.params.watchlistid)
    let name = req.body.name
    watchlist.name = name
    await watchlist.save(function (err, watchlist) {
        if (err) {
            console.log(err);
        } else {
        }
    })
    res.redirect('/watchlists/'+req.params.watchlistid)
})

module.exports = router;
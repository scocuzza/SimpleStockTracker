
const router = require('express').Router();
const axios = require('axios');
const Stock = require('../models/stock');
const helper = require('../helper_functions.js')

//INDEX
router.get('/', async (req, res) => {
    let stocks = await Stock.find({});
    res.render('./stocks/index.ejs', {
        stocks,
        currentUser: req.session.currentUser 
    });
})

//NEW
router.get('/new', async (req, res) => {
    res.render('./stocks/new.ejs',  { currentUser: req.session.currentUser });
  });

//SHOW
router.get('/:id', async (req, res)=>{
    await Stock.findById(req.params.id, (error, stockFound)=>{
        res.render('./stocks/show.ejs', {
            stock: stockFound,
            currentUser: req.session.currentUser 
        })
    })
})

//CREATE 
router.post('/', async (req,res)=>{
    let newData = await helper.getStockData(req.body.symbol)
    let newStock = await helper.createStock(newData, req.body.symbol)
    newStock.save(function (err, stock) {
        if (err) {
          console.log(err);
        }
      });
    res.redirect('/stocks')
})

//DELETE
router.delete('/:id', async (req, res)=>{
    await Stock.findByIdAndRemove(req.params.id, (error, stockFound)=> {
        res.redirect('/stocks')
    })
})

//EDIT
router.get('/:id/edit', async (req,res)=> {
    await Stock.findById(req.params.id, (error, stockFound)=>{
        res.render('./stocks/edit.ejs', {
            stock: stockFound,
            currentUser: req.session.currentUser 
        })
    })
})

//UPDATE
router.put('/:id', async (req,res)=> {
    let newSymbol = req.body.symbol
    let newData = await helper.getStockData(newSymbol)
    let newStock = await helper.createStock(newData, newSymbol)
    await Stock.findByIdAndUpdate(req.params.id, 
        {
            assetType: newStock.assetType,
            assetMainType: newStock.assetMainType,
            cusip: newStock.cusip,
            symbol: newStock.symbol,
            description: newStock.description,
            bidPrice: newStock.bidPrice,
            bidSize: newStock.bidSize,
            bidId: newStock.bidId,
            askPrice: newStock.askPrice,
            askSize: newStock.askSize,
            askId: newStock.askId,
            lastPrice: newStock.lastPrice,
            lastSize: newStock.lastSize,
            lastId: newStock.lastId,
            openPrice: newStock.openPrice,
            highPrice: newStock.highPrice,
            lowPrice: newStock.lowPrice,
            bidTick: newStock.bidTick,
            closePrice: newStock.closePrice,
            netChange: newStock.netChange,
            totalVolume: newStock.totalVolume,
            quoteTimeInLong: newStock.quoteTimeInLong,
            tradeTimeInLong: newStock.tradeTimeInLong,
            mark: newStock.mark,
            exchange: newStock.exchange,
            exchangeName: newStock.exchangeName,
            marginable: newStock.marginable,
            shortable: newStock.shortable,
            volatility: newStock.volatility,
            digits: newStock.digits,
            yearHigh: newStock['52WkHigh'],
            yearLow: newStock['52WkLow'],
            nAV: newStock.nAV,
            peRatio: newStock.peRatio,
            divAmount: newStock.divAmount,
            divYield: newStock.divYield,
            divDate: newStock.divDate,
            securityStatus: newStock.securityStatus,
            regularMarketLastPrice: newStock.regularMarketLastPrice,
            regularMarketLastSize: newStock.regularMarketLastSize,
            regularMarketNetChange: newStock.regularMarketNetChange,
            regularMarketTradeTimeInLong: newStock.regularMarketTradeTimeInLong,
            netPercentChangeInDouble: newStock.netPercentChangeInDouble,
            markChangeInDouble: newStock.markChangeInDouble,
            markPercentChangeInDouble: newStock.markPercentChangeInDouble,
            regularMarketPercentChangeInDouble: newStock.regularMarketPercentChangeInDouble,
            delayed: newStock.delayed
        }, (error)=>{
        res.redirect('/stocks')
    }  )
})
module.exports = router;
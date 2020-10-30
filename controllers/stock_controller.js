
const router = require('express').Router();
const axios = require('axios')
const Stock = require('../models/stock');

router.get('/', async (req, res) => {
  let stocks = await Stock.find({});
  res.render('index.ejs', {
      stocks
    });
});

router.get('/new', async (req, res) => {
    res.render('new.ejs');
  });

router.get('/:id', async (req, res)=>{
    await Stock.findById(req.params.id, (error, stockFound)=>{
        res.render('show.ejs', {
            stock: stockFound
        })
    })
})
router.post('/', async (req,res)=>{
    let newData = await getStockData(req.body.symbol)
    let newStock = await createStock(newData, req.body.symbol)
    newStock.save(function (err, stock) {
        if (err) {
          console.log(err);
        }
      });
    res.redirect('/stocks')
})

router.delete('/:id', async (req, res)=>{
    await Stock.findByIdAndRemove(req.params.id, (error, stockFound)=> {
        res.redirect('/stocks')
    })
})

router.get('/:id/edit', async (req,res)=> {
    await Stock.findById(req.params.id, (error, stockFound)=>{
        res.render('edit.ejs', {stock: stockFound})
    })
})
router.put('/:id', async (req,res)=> {
    let newSymbol = req.body.symbol
    let newData = await getStockData(newSymbol)
    let newStock = await createStock(newData, newSymbol)
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

async function getStockData(inputSymbol) {
    let config = {
        method: 'GET',
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
            symbol: inputSymbol
        },
        headers: { }
      };
    await axios(config)
    .then(function (response) {
        data = response.data
    })
    .catch(function (error) {
        console.log(error);
    })
    return data
}
async function createStock(data, element) {
    element.toUpperCase()
    return new Stock({
        assetType: data[element].assetType,
        assetMainType: data[element].assetMainType,
        cusip: data[element].cusip,
        symbol: data[element].symbol,
        description: data[element].description,
        bidPrice: data[element].bidPrice,
        bidSize: data[element].bidSize,
        bidId: data[element].bidId,
        askPrice: data[element].askPrice,
        askSize: data[element].askSize,
        askId: data[element].askId,
        lastPrice: data[element].lastPrice,
        lastSize: data[element].lastSize,
        lastId: data[element].lastId,
        openPrice: data[element].openPrice,
        highPrice: data[element].highPrice,
        lowPrice: data[element].lowPrice,
        bidTick: data[element].bidTick,
        closePrice: data[element].closePrice,
        netChange: data[element].netChange,
        totalVolume: data[element].totalVolume,
        quoteTimeInLong: data[element].quoteTimeInLong,
        tradeTimeInLong: data[element].tradeTimeInLong,
        mark: data[element].mark,
        exchange: data[element].exchange,
        exchangeName: data[element].exchangeName,
        marginable: data[element].marginable,
        shortable: data[element].shortable,
        volatility: data[element].volatility,
        digits: data[element].digits,
        yearHigh: data[element]['52WkHigh'],
        yearLow: data[element]['52WkLow'],
        nAV: data[element].nAV,
        peRatio: data[element].peRatio,
        divAmount: data[element].divAmount,
        divYield: data[element].divYield,
        divDate: data[element].divDate,
        securityStatus: data[element].securityStatus,
        regularMarketLastPrice: data[element].regularMarketLastPrice,
        regularMarketLastSize: data[element].regularMarketLastSize,
        regularMarketNetChange: data[element].regularMarketNetChange,
        regularMarketTradeTimeInLong: data[element].regularMarketTradeTimeInLong,
        netPercentChangeInDouble: data[element].netPercentChangeInDouble,
        markChangeInDouble: data[element].markChangeInDouble,
        markPercentChangeInDouble: data[element].markPercentChangeInDouble,
        regularMarketPercentChangeInDouble: data[element].regularMarketPercentChangeInDouble,
        delayed: data[element].delayed
      });
}
module.exports = router;
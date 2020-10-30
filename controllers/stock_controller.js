
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
    let stockData = await getStockData(req.body.symbol)
    await insertStockData(req.body.symbol, stockData)
    res.redirect('/stocks')
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
async function insertStockData(element, data) {
        element = element.toUpperCase();
        const stock = new Stock({
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
          stock.save(function (err, stock) {
            if (err) {
              console.log(err);
            }
          });
}

module.exports = router;
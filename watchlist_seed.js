const mongoose = require('mongoose');
const axios = require('axios')
const Stock = require('./models/stock');
const WatchList = require('./models/watchlist');
const mongoURI = 'mongodb://localhost/simple-stock-tracker-app';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);
(async function () {
  // CREATE Stock
  const myWatchList = new WatchList({
      name: 'Steve\'s Watchlist',
      stocks: []
  })
  const bobWatchList = new WatchList({
      name: 'Bob\'s Watchlist',
      stocks: []
  })
  let stockArray = ['AAPL']
  let stockData = await getStockData(stockArray)
  let stockSchemaData = await createStock(stockData, stockArray[0])
  Stock.create(stockSchemaData)
  bobWatchList.stocks.push(stockSchemaData)
  myWatchList.stocks.push(stockSchemaData)
  bobWatchList.save(function (err, watchlist) {
        if (err) {
          console.log(err);
        } else {
        }
    })
  myWatchList.save(function (err, watchlist) {
        if (err) {
          console.log(err);
        } else {
        }
    })
    console.log(bobWatchList);
    console.log(myWatchList);
})();

async function getStockData(symbols) {
    let config = {
        method: 'GET',
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
            symbol: symbols.join(',')
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

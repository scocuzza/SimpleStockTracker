const axios = require('axios')
const quoteUrl = 'https://api.tdameritrade.com/v1/marketdata/quotes'
const apikey = 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT'
const mongoose = require('mongoose');
const Stock = require('./models/stock');
const mongoURI = 'mongodb://localhost/simple-stock-tracker-app';
const symbols = ['TSLA','AAPL','GOOGL','MSFT']



// getdata()
// async function getdata() {
//     let stockData = await getStockData(symbols)
//     console.log(stockData);
// }
setInterval(function(){ 
        refreshData();
    }, 3000);

async function refreshData() {
    let stockArray = await getCurrentSymbols();
    let newStockData = await getStockData(stockArray)
    await updateStockData(stockArray, newStockData)
}

async function getCurrentSymbols() {
    let stockArray = []
    await Stock.find({}, (err, data) => {
        data.forEach(element=> {
            stockArray.push(element.symbol)
        })
    })
    return stockArray
}

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
async function updateStockData(stockArray, newStock) {
    stockArray.forEach( stock=> {
        Stock.updateOne({symbol: stock}, 
            {
            assetType: newStock[stock].assetType,
            assetMainType: newStock[stock].assetMainType,
            cusip: newStock[stock].cusip,
            symbol: newStock[stock].symbol,
            description: newStock[stock].description,
            bidPrice: newStock[stock].bidPrice,
            bidSize: newStock[stock].bidSize,
            bidId: newStock[stock].bidId,
            askPrice: newStock[stock].askPrice,
            askSize: newStock[stock].askSize,
            askId: newStock[stock].askId,
            lastPrice: newStock[stock].lastPrice,
            lastSize: newStock[stock].lastSize,
            lastId: newStock[stock].lastId,
            openPrice: newStock[stock].openPrice,
            highPrice: newStock[stock].highPrice,
            lowPrice: newStock[stock].lowPrice,
            bidTick: newStock[stock].bidTick,
            closePrice: newStock[stock].closePrice,
            netChange: newStock[stock].netChange,
            totalVolume: newStock[stock].totalVolume,
            quoteTimeInLong: newStock[stock].quoteTimeInLong,
            tradeTimeInLong: newStock[stock].tradeTimeInLong,
            mark: newStock[stock].mark,
            exchange: newStock[stock].exchange,
            exchangeName: newStock[stock].exchangeName,
            marginable: newStock[stock].marginable,
            shortable: newStock[stock].shortable,
            volatility: newStock[stock].volatility,
            digits: newStock[stock].digits,
            yearHigh: newStock[stock]['52WkHigh'],
            yearLow: newStock[stock]['52WkLow'],
            nAV: newStock[stock].nAV,
            peRatio: newStock[stock].peRatio,
            divAmount: newStock[stock].divAmount,
            divYield: newStock[stock].divYield,
            divDate: newStock[stock].divDate,
            securityStatus: newStock[stock].securityStatus,
            regularMarketLastPrice: newStock[stock].regularMarketLastPrice,
            regularMarketLastSize: newStock[stock].regularMarketLastSize,
            regularMarketNetChange: newStock[stock].regularMarketNetChange,
            regularMarketTradeTimeInLong: newStock[stock].regularMarketTradeTimeInLong,
            netPercentChangeInDouble: newStock[stock].netPercentChangeInDouble,
            markChangeInDouble: newStock[stock].markChangeInDouble,
            markPercentChangeInDouble: newStock[stock].markPercentChangeInDouble,
            regularMarketPercentChangeInDouble: newStock[stock].regularMarketPercentChangeInDouble,
            delayed: newStock[stock].delayed
        }, (err) => {
            console.log('Update Complete');
        })
        })
}
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

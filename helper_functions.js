
require('dotenv').config()
const Stock = require('./models/stock')
const axios = require('axios')
const apikey = process.env.APIKEY
const url = process.env.URL

async function refreshData() {
    let stockArray = await getCurrentSymbols();
    let stockData = await getStockData(stockArray.join(','))
    if(JSON.stringify(stockData) != '{}') {
        await updateStockData(stockArray, stockData)
    }

}
 async function getCurrentSymbols() {
    let stockArray = []
    await Stock.find({}, (err, data) => {
        data.forEach( element=> {
            stockArray.push(element.symbol)
        })
    })
    return stockArray
}
async function getStockData(symbols) {
    console.log('..................');
    console.log('API Call is Executing');
    const response = await axios({
        url: url,
        params: {
            apikey: apikey,
            symbol: symbols
        }
    }).catch( e => {console.log((e));})
    console.log('API Call is Complete');
    return response.data
}
async function updateStockData(stockArray, newStock) {
    console.log('DB Update is Executing');
    await stockArray.forEach( async stock => {
        await Stock.updateOne({symbol: stock}, 
            {
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
            //console.log('Update Complete ' + stock);
        })
        })
        console.log('DB Update is Complete ');
}
async function createStock(data, element) {
    element = element.toUpperCase()
    return new Stock({
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

module.exports = { refreshData, getStockData, createStock }
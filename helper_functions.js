
const Stock = require('./models/stock')
const axios = require('axios')

// async function refresh() {
//     refreshData();
// }
async function refresh() {
    let stockList = await getStockList()
    console.log(stockList);
    getStockData(stockList)
}
async function getStockList() {
    let stockList = []
    await Stock.find({}, (err, data)=>{
        data.forEach(stock=>{
            stockList.push(stock.symbol)
        })
    })
    return stockList
}
function getStockData(symbols) {
    console.log('Starting API call');
    let stockList = symbols
    symbols = stockList.join(',')
    let config = {
        method: 'GET',
        url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
        params: {
            apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
            symbol: symbols
        },
        headers: { }
      };
    let response = axios(config)
    .then( function (response) {
        let data = response.data
        console.log('API call complete');
        stockList.forEach( async stock => {
            Stock.updateOne({symbol: stock}, 
                {
                assetType: data[stock].assetType,
                assetMainType: data[stock].assetMainType,
                cusip: data[stock].cusip,
                symbol: data[stock].symbol,
                description: data[stock].description,
                bidPrice: data[stock].bidPrice,
                bidSize: data[stock].bidSize,
                bidId: data[stock].bidId,
                askPrice: data[stock].askPrice,
                askSize: data[stock].askSize,
                askId: data[stock].askId,
                lastPrice: data[stock].lastPrice,
                lastSize: data[stock].lastSize,
                lastId: data[stock].lastId,
                openPrice: data[stock].openPrice,
                highPrice: data[stock].highPrice,
                lowPrice: data[stock].lowPrice,
                bidTick: data[stock].bidTick,
                closePrice: data[stock].closePrice,
                netChange: data[stock].netChange,
                totalVolume: data[stock].totalVolume,
                quoteTimeInLong: data[stock].quoteTimeInLong,
                tradeTimeInLong: data[stock].tradeTimeInLong,
                mark: data[stock].mark,
                exchange: data[stock].exchange,
                exchangeName: data[stock].exchangeName,
                marginable: data[stock].marginable,
                shortable: data[stock].shortable,
                volatility: data[stock].volatility,
                digits: data[stock].digits,
                yearHigh: data[stock]['52WkHigh'],
                yearLow: data[stock]['52WkLow'],
                nAV: data[stock].nAV,
                peRatio: data[stock].peRatio,
                divAmount: data[stock].divAmount,
                divYield: data[stock].divYield,
                divDate: data[stock].divDate,
                securityStatus: data[stock].securityStatus,
                regularMarketLastPrice: data[stock].regularMarketLastPrice,
                regularMarketLastSize: data[stock].regularMarketLastSize,
                regularMarketNetChange: data[stock].regularMarketNetChange,
                regularMarketTradeTimeInLong: data[stock].regularMarketTradeTimeInLong,
                netPercentChangeInDouble: data[stock].netPercentChangeInDouble,
                markChangeInDouble: data[stock].markChangeInDouble,
                markPercentChangeInDouble: data[stock].markPercentChangeInDouble,
                regularMarketPercentChangeInDouble: data[stock].regularMarketPercentChangeInDouble,
                delayed: data[stock].delayed
            }, (err) => {
                //console.log('Update Complete ' + stock);
            })
            })
    })
    .catch( function (error) {
        console.log(error);
    })
    return response.data
}
async function createStock(data, element) {
    element = element.toUpperCase()
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

module.exports = { refresh, getStockData, createStock }
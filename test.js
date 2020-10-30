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

// async function getStockData(symbols) {
//     let config = {
//         method: 'GET',
//         url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
//         params: {
//             apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
//             symbol: symbols.join(',')
//         },
//         headers: { }
//       };
//     await axios(config)
//     .then(function (response) {
//         data = response.data
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     return data
// }


Stock.find({}, (err, data) => {
    let symbolsArray = []
    data.forEach(element=> {
        symbolsArray.push(element.symbol)
        console.log(element._id);
    })
    console.log(symbolsArray);
})



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

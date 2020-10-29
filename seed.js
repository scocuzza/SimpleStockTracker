const axios = require('axios')
const quoteUrl = 'https://api.tdameritrade.com/v1/marketdata/quotes'
const apikey = 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT'
const mongoose = require('mongoose');
const Stock = require('./models/stock');
let responseObject = {}
const mongoURI = 'mongodb://localhost/simple-stock-tracker-app';
const symbols = ['TSLA','AAPL','GOOGL','MSFT']

let config = {
    method: 'GET',
    url: 'https://api.tdameritrade.com/v1/marketdata/quotes',
    params: {
        apikey: 'TMIF9RATR89WC6J6BDOSA1PYQS7KKUBT',
        symbol: symbols.join(',')
    },
    headers: { }
  };
getAndSeedData(config)

async function getAndSeedData(config) {
    const response = axios(config)
    .then(function (response) {
        //console.log(response.data);
        seedDatabase(response.data)
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally((response)=> {
        return response
    });
}

function seedDatabase(data) {
    symbols.forEach( element => {
        const stock = new Stock({
            symbol: data[element].symbol,
            description: data[element].description,
            lastPrice: data[element].lastPrice,
            netChange: data[element].netChange,
            yearHigh: data[element].yearHigh,
            yearLow: data[element].yearLow
          });
          stock.save(function (err, stock) {
            if (err) {
              console.log(err);
            } else {
              console.log('stock ', stock);
            }
          });
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

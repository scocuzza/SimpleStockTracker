
//___________________
//Dependencies
//___________________
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express()
const db = mongoose.connection;
let http = require('http').Server(app);
let io = require('socket.io')(http);

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'simple-stock-tracker-app';
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(expressLayouts);
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// Controllers
app.set('view engine', 'ejs');
const stockController = require('./controllers/stock_controller.js')
app.use('/stocks', stockController)

//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });
//___________________
//Listener
//___________________

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

io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Send a message after a timeout of 4seconds
    setTimeout(function() {
       console.log('HELLO');
    }, 4000);
 
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(PORT, () => console.log( 'Listening on port:', PORT));

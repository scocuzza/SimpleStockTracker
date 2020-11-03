
//___________________
//Dependencies
//___________________
const express = require('express');
const axios = require('axios')
const expressLayouts = require('express-ejs-layouts')
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express()
const db = mongoose.connection;
let http = require('http').Server(app);
let io = require('socket.io')(http);
const Stock = require('./models/stock.js');
let helper = require('./helper_functions')

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
const stockController = require('./controllers/stock_controller.js');
app.use('/stocks', stockController)

const watchlistController = require('./controllers/watchlist_controller.js')
app.use('/watchlists', watchlistController)

//___________________
// Routes
//___________________

//___________________
//Listener
//___________________

//On the server refresh the stock items in the DB
//functions located in tools.js
setInterval( async()=>{
    await helper.refresh();
}, 5000)

// Socket Connection
// Upon user connection emit a testEvent on an interval which retrieves latest values from DB
io.on('connection', function(socket) {
    console.log('A user connected');

    setInterval( async()=>{
        let stocks = await Stock.find({})
        socket.emit('testEvent', {stocks})
    },5000)

    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(PORT, () => console.log( 'Listening on port:', PORT));

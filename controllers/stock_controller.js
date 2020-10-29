
const router = require('express').Router();
const Stock = require('../models/stock');

router.get('/', async (req, res) => {
  let stocks = await Stock.find({});
  res.render('index.ejs', {
      stocks: stocks
    });
});


module.exports = router;

const router = require('express').Router();
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
    Stock.findById(req.params.id, (error, stockFound)=>{
        res.render('show.ejs', {
            stock: stockFound
        })
    })
})

module.exports = router;
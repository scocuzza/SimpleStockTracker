const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});


router.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('oops the db had a problem');
    } else if (!foundUser) {
      res.send('<a  href="/sessions/new">Invalid User </a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/watchlists');
      } else {
        res.send('<a href="/sessions/new"> Incorrect Password </a>');
      }
    }
  });
});

router.delete('/', (req, res) => {
  console.log(req.session);
  req.session.destroy(() => {
    console.log(req.session);
    res.redirect('/stocks');
  });
});

module.exports = router;
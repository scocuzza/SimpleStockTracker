# Simple Stock Tracker
## Hosted App
Heroku Link\
https://simple-stock-tracker-app.herokuapp.com/stocks
## Highlighted Features
- View/Add/Edit/Delete Stocks from the homepage\
Log in to:
- View/Add/Edit/Delete a personalized stock watchlist\
Prices update automatically !\
Sort to see top gainers and losers of the day !
## Technology Stack
Javascript \
    Libraries: \
    "axios": "^0.21.0",
    "bcrypt": "^5.0.0",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.5",
    "express": "^4.17.1",
    "express-ejs-layouts": "^2.5.0",
    "express-session": "^1.17.1",
    "method-override": "^3.0.0",
    "mongoose": "^5.10.11",
    "socket.io": "^2.3.0" \
CSS \
    - Bootstrap \
HTML \
MongoDB \
Heroku
## Models
Users: Create | Read \
Stocks: Create | Read | Update | Delete \
Watchlists: Create | Read | Update | Delete \
Relationship \
User -> Many Watchlists -> Many Stocks
## User Stories
- As a User, I would like to view all stocks that have been added on the homepage
- As a User, I would need to first log In in order to create a watchlist
- As a User, I would like to be able to create a watchlist/s specific to my user
- As a User, I would like to be able to edit my Watchlist name
- As a User, I would like to be able to add stocks to my watchlist/s
- As a User, I would like to be able to click on a stock to view additional details
- As a User, I would like to be able to update a stock in my watchlist
- As a User, I would like to be able to remove stocks from my watchlist
- As a User, I would like to be able to delete my watchlist
- As a User, I would like to be able to persist my watchlist after logging out
- As a User, I would like to see stock prices kept up to date without refreshing the page
## Wireframe
WireFrame
(https://docs.google.com/drawings/d/1CVQ_SaS2Rboyzgl6m3V_NxA9GcX2dsIF3JcBa80rZ1I/edit?usp=sharing)
# Simple Stock Tracker
## Hosted App
Heroku Link\
https://simple-stock-tracker-app.herokuapp.com/stocks
## Highlighted Features
Perform full CRUD operations on Stocks from the homepage\
Sign up! And Perform full CRUD operations on a personalized stock watchlist\
Exciting features :fire::fire: 
- Prices update automatically :open_mouth:
- Sort alphabetically and numerically to see top gainers and losers of the day ! :thumbsup::thumbsdown: 
## Technology Stack
Javascript \
    Libraries: \
    ```
    "axios": "^0.21.0",
    "bcrypt": "^5.0.0",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.5",
    "express": "^4.17.1",
    "express-ejs-layouts": "^2.5.0",
    "express-session": "^1.17.1",
    "method-override": "^3.0.0",
    "mongoose": "^5.10.11",
    "socket.io": "^2.3.0"
    ``` \
CSS \
    - Bootstrap \
HTML \
MongoDB \
Heroku \
TD Ameritrade Developer API
- https://developer.tdameritrade.com/apis
## Models
Users: Create | Read \
Sessions: Create | Read 

Stocks:
| name   | path             | http verb | purpose                |
|--------|------------------|-----------|------------------------|
| index  | /stocks          | GET       | Show list of stocks    |
| new    | /stocks/new      | GET       | Show new stock form    |
| show   | /stocks/:id      | GET       | Show info on one stock |
| edit   | /stocks/:id/edit | GET       | Show stock edit form   |
| create | /stocks          | POST      | Create new stock       |
| update | /stocks/:id      | PUT       | Edit and Update stock  |
| delete | /stocks/:id      | DELETE    | Delete a Stock         |

Watchlists:
| name   | path                 | http verb | purpose                      |
|--------|----------------------|-----------|------------------------------|
| index  | /watchlists          | GET       | Show your list of watchlists |
| new    | /watchlists/new      | GET       | Show new watchlist form      |
| show   | /watchlists/:id      | GET       | Show stocks in one watchlist |
| edit   | /watchlists/:id/edit | GET       | Show watchlist edit form     |
| create | /watchlists/         | POST      | Create new watchlist         |
| update | /watchlists/:id      | PUT       | Edit and Update watchlist    |
| delete | /watchlists/:id      | DELETE    | Delete a Watchlist           |

Relationships \
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
## Future Features
- Set Price Targets for Stocks
- Send email or notification when Price Target is hit!
- Set Number of Shares to get a Portfolio total value and asset allocation stats
- Price History Charts
## Completed Challenges
- Update stock prices without refreshing on all stock tables
- Sort columns on all stock tables
- Allow users to create personal watchlists and perform full CRUD operations

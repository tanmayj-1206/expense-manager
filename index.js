const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
require('dotenv').config

const app = express()
const port = process.env.PORT || 3000;

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));

app.use(expressLayouts);
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use(require('cookie-parser')());
app.use(require('express-session')(
  { 
    name: 'expense-manager',
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      maxAge: (1000 * 60 * 60 * 24)
    },
    store: MongoStore.create(
      {
        mongoUrl: 'mongodb://localhost:27017/express-management',
        autoRemove: 'disabled'
      }
    )
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/home_route'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
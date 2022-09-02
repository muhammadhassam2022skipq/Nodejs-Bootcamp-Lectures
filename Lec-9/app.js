const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/account-routes');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { tempStore } = require('./helpers/temp-storage');
const csrf = require('csurf');
const csrfProtection = csrf();
const app = express();

const store = new MongoDBStore({
    uri: 'mongodb://cmdlhrltx03:27017/store-sessions',
    collection: 'sessions'
  });

//app.use(csrfProtection);

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

const publicDirPath = path.join(__dirname, 'public');

app.use(express.static(publicDirPath));

// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken();
//     next();
//   });

// Register Routes 
app.use('/accounts', accountRoutes);

app.use('/home', (req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    if(isAuthenticated) {
        res.render('index', {
            pageTitle: 'Home Page',
            isAuthenticated: true
        })
    } else {
        res.render('404', {
            pageTitle: 'Page not found',
            isAuthenticated: false
        })
    }
});

// Set 404 View here
app.use((req, res) => {
    const isAuthenticated = req.session.isAuthenticated ? req.session.isAuthenticated : false;
    res.render('404', {
        pageTitle: 'Page not found',
        isAuthenticated: isAuthenticated
    })
});

mongoose.connect('mongodb://cmdlhrltx03:27017/newStore', () => {
    app.listen(3000, () => {
        console.log('Started listening at port 3000');
    });
});
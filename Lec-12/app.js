const fs = require('fs');
const https = require('https');
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
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

const privateKey = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');

const store = new MongoDBStore({
    uri: 'mongodb://cmdlhrltx03:27017/store-sessions',
    collection: 'sessions'
  });

//app.use(csrfProtection);
// const shouldCompress = (req, res) => {
//     if (req.headers['x-no-compression']) {
//       // don't compress responses with this request header
//       return false
//     }
   
//     // fallback to standard filter function
//     return compression.filter(req, res)
//   }
//app.use(compression({filter: shouldCompress}));
app.use(morgan('combined'));
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(helmet());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
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
            isAuthenticated: true,
            userId: req.session.userId
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

mongoose.connect(`mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, () => {
    https.createServer(
        {key: privateKey, cert: certificate, passphrase: 'CureMD123'}
        , app).listen(process.env.APP_PORT, () => {
        console.log(`Started listening at port ${process.env.APP_PORT}`);
    });
    app.listen(3000, () => {
        console.log(`Started listening at port 3000`);
    });
});
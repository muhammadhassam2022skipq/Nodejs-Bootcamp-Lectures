const express = require('express');

const fs = require('fs');

const path = require('path');

const adminRoutes = require('./routes/admin-routes');
const shoppingRoutes = require('./routes/shopping-routes');
const publicRoutes = require('./routes/public-routes');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(publicRoutes);
app.use('/admin', adminRoutes);
app.use('/shopping', shoppingRoutes);

app.use('/home', (req, res, next) => {
    res.render('home', {
        pageTitle: "My Store - Home Page"
    });
});

app.use('/', (req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
    next();
})

app.listen(5000, () => {
    console.log('Started listening at port 5000');
});
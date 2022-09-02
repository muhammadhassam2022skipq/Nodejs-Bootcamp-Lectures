const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mainRoutes = require('./routes/main-routes');
const shoppingRoutes = require('./routes/shopping-routes');
const mongoose = require('mongoose');
const Category = require('./models/category');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', (req, res, next) => {
    res.setHeader('Set-Cookie', 'isAuthenticated=true');
    res.redirect('/');
})

app.use((req, res, next) => {
    const authenticationCookie = req.headers['cookie'];
    if(authenticationCookie) {
        const isAuthenticate = authenticationCookie.split('=')[1];
        if(isAuthenticate == 'true') {
            next();
        } else {
            res.render('not-found',{
                pageTitle: 'Page not found!'
            });
        }
    } else {
        res.setHeader('Set-Cookie', 'isAuthenticated=false');
        res.render('not-found',{
            pageTitle: 'Page not found!'
        });
    }
})

app.use('/shopping', shoppingRoutes);
app.use(mainRoutes);
app.use((req, res, next) => {
    res.render('not-found', {
        pageTitle: 'Page not found!'
    });
});

mongoose.connect('mongodb://localhost:27017/myStore', () => {
    /*
    const cosmeticCategory = new Category({
        title: 'Cosmetics',
        description: 'Cosmetics'
    });
    cosmeticCategory.save();
    const pulsesCategory = new Category({
        title: 'Pulses',
        description: 'Pulses'
    });
    pulsesCategory.save();
    const electronicsCategory = new Category({
        title: 'Electronics',
        description: 'Electronics'
    });
    electronicsCategory.save();
    */
    app.listen(3000, () => {
        console.log('Started listening at port 3000.');
    });
});
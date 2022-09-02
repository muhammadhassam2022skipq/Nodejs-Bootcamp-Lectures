const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/account-routes');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

app.use(express.json());

app.use('/account', accountRoutes);

// app.use((req, res, next) => {
//     res.status(404).json({message: 'resource not found'});
//     res.end();
// });

mongoose.connect('mongodb://cmdlhrltx03:27017/newStore', () => {
    app.listen(3000, () => {
        console.log('Started listening at port 3000');
    });
});
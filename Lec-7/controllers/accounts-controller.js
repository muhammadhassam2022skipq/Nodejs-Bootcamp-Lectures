const customerModel = require('../models/customer');
const mongoose = require('mongoose');

exports.getSignupForm = (req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render('signup', {
        pageTitle: 'Create our account',
        isAuthenticated: isAuthenticated
    });
}

exports.postSignupForm = (req, res) => {
    const model = new customerModel({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });

    model.save().then(addedCustomer => {
        res.redirect('/home');
    });
}

exports.getSigninForm = (req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render('signin', {
        pageTitle: 'Login to your account',
        isAuthenticated: isAuthenticated
    });
}

exports.postSigninForm = (req, res) => {
    customerModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then(customer => {
        if(customer) {
            req.session.isLoggedIn = true,
            req.session.user = customer

            res.redirect('/home');

        } else {
            res.redirect('/account/signin');
        }
    })
}
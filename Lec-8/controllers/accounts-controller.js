const customerModel = require('../models/customer');
const mongoose = require('mongoose');
const {tempStore} = require('../helpers/temp-storage');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const {validationResult} = require('express-validator/check');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getSignupForm = (req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render('signup', {
        pageTitle: 'Create our account',
        isAuthenticated: isAuthenticated,
        validationErrors: []
    });
}

exports.postSignupForm = (req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const model = new customerModel({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
    
        model.save().then(addedCustomer => {
            transporter.sendMail({
                to: req.body.email,
                from: 'ceo@alainsoftech.com',
                subject: 'Welcome to MERN bootcamp in CureMD',
                html: `<h1>Welcome ${req.body.firstName} ${req.body.lastName} to MERN bootcamp in CureMD</h1>`
            }, err => {
                console.log('Error while sending email', err);
            }),
            res.redirect('/home');
        });
    } else {
        res.render('signup', {
            path:'/signup',
            pageTitle: 'My New Store',
            validationErrors: errors.array(),
            isAuthenticated: isAuthenticated
        })
    }
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
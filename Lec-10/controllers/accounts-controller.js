const customerModel = require('../models/customer');
const mongoose = require('mongoose');
const {tempStore} = require('../helpers/temp-storage');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const {validationResult} = require('express-validator/check');
const path = require('path');
const fs = require('fs');

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
    let avatarFileName = null;
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    // if(req.isValidRequest === false) {
    //         res.render('signup', {
    //             path:'/signup',
    //             pageTitle: 'My New Store',
    //             //validationErrors: errors.array(),
    //             validationErrors: [{msg: req.validationError}],
    //             isAuthenticated: isAuthenticated
    //         });
    //         return;
    //     }
    if(req.file) {
        avatarFileName = req.uploadedAvatarName;
    }
    console.log('selected file', req.body.avatar);
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const model = new customerModel({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            avatar: avatarFileName
        });
    
        model.save().then(addedCustomer => {
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
            req.session.userId = customer._id;

            res.redirect('/home');

        } else {
            res.redirect('/account/signin');
        }
    })
}

exports.getAvatar = (req, res) => {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    if(isAuthenticated) {
        const userId = req.params.userId;
        customerModel.findOne({_id: userId}).then(customer => {
            if(customer.avatar
                && customer.avatar !== '') {
                    const avatarPath = path.join(__dirname, '../', 'avatars', customer.avatar);   
                    const avatarImage = fs.readFileSync(avatarPath);
                    res.send(avatarImage)
                } else {
                    res.status(204);
                }
        });
    } else {
        res.status(403);
    }
}
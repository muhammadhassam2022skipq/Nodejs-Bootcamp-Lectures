const customerModel = require('../models/customer');
const mongoose = require('mongoose');
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

//GET: customer by Id
exports.getCustomerById = async (req, res, next) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     res.status(400).json(errors);
    // }
    const customerId = req.params.id;
    if(!mongoose.isValidObjectId(customerId)) {
        return res.status(400).json({message: 'Invalid object id'});
    }
    let customerDoc;
    try {
        customerDoc = await customerModel.findOne({_id: customerId});
    } catch(err) {
        return res.status(500).json(err);
    }
    if(customerDoc) {
        return res.status(200).json(customerDoc);
    } else {
        return res.status(204).json({message: 'No customer found'});
    }
}

//POST: add customer
exports.addCustomer = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const {firstName, lastName, email, password} = req.body;
    const receivedCustomer = new customerModel({
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
    let addedCustomer;
    try {
        addedCustomer = await receivedCustomer.save();
    } catch(err) {
        return res.status(500).json(err);
    }
    if(addedCustomer) {
        return res.status(201).json(addedCustomer);
    } else {
        return res.status(204).json({message: 'Unable to add customer'});
    }
}
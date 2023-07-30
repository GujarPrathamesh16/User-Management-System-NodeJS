const Customer = require('../models/Customer');
const mongoose = require('mongoose');



// GET/Homepage

exports.homepage = async(req,res) =>{

    const messages = await req.flash('info');

    const locals = {
        title : 'NodeJS',
        description : 'This is a NodeJs User Management System'
    }    

    try {
        const customers = await Customer.find({}).limit(22);  //the {} parameter finds ALL customer and the limit of no of customers is 22.
        res.render('index', { locals, messages, customers});  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals var as a input which is then deconstructed by the ejs in main.ejs

    } catch (error) {
        console.log(error);
    }
    
}


// GET/ New Customer

exports.addCustomer = async(req,res) =>{
    const locals = {
        title : 'Add New Customer',
        description : 'Adding new customer NodeJs User Management System'
    }
    
    res.render('customer/add', locals);  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals var as a input which is then deconstructed by the ejs in main.ejs
    
}

// POST/ Create New Customer

exports.postCustomer = async(req,res) =>{

    console.log(req.body);

    const newCustomer = new Customer({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        details : req.body.details,
        tel : req.body.tel,
        email : req.body.email
    });

    try {
        await Customer.create(newCustomer)
        await req.flash('info', 'New customer has been added.')
        res.redirect('/');  
        
    } catch (error) {
        console.log(error);
    }
    
}
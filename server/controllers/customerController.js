const Customer = require('../models/Customer');
const mongoose = require('mongoose');

// // GET/Homepage

// exports.homepage = async(req,res) =>{

//     const messages = await req.flash('info');

//     const locals = {
//         title : 'NodeJS',
//         description : 'This is a NodeJs User Management System'
//     }    

//     try {
//         const customers = await Customer.find({}).limit(22);  //the {} parameter finds ALL customer and the limit of no of customers is 22.
//         res.render('index', { locals, messages, customers});  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals var as a input which is then deconstructed by the ejs in main.ejs

//     } catch (error) {
//         console.log(error);
//     }
    
// }



// GET Homepage (updated)
exports.homepage = async(req,res) =>{

    const messages = await req.flash('info');

    const locals = {
        title : 'NodeJS',
        description : 'This is a NodeJs User Management System'
    }    

    let perPage = 12;
    let page = req.query.page || 1  //gets .query parameter from req and if not recieved then sets the value to 1 ( || 1 )

    try {
        const customers = await Customer.aggregate([{$sort : {updatedAt : -1}}])  
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Customer.count();

        res.render('index', { 
            locals, 
            messages, 
            customers,
            current : page,
            pages : Math.ceil(count/perPage),
        });  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals and other var as a input which is then deconstructed by the ejs in main.ejs

    } catch (error) {
        console.log(error);
    }
};

//GET method About

exports.about = async(req,res) =>{
    const locals = {
        title : 'About',
        description : 'This is about page for NodeJs User Management System'
    }    

    try {
        
        res.render('about', locals);  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals var as a input which is then deconstructed by the ejs in main.ejs

    } catch (error) {
        console.log(error);
    }
    
}



// GET Customer Data

exports.view = async (req,res) =>{
    try {
        const customer = await Customer.findOne({_id : req.params.id})
        const locals ={
            title : "View Customer Data",
            description : "viewing customer in User Management System"
        };
        res.render('customer/view',{
            locals,
            customer,
        })
    } catch (error) {
        console.log(error);
    }
}


// GET Edit Customer
exports.edit = async (req,res) =>{
    try {
        const customer = await Customer.findOne({_id : req.params.id})
        const locals ={
            title : "Edit Customer Data",
            description : "editing customer in User Management System"
        };
        res.render('customer/edit',{
            locals,
            customer,
        })
    } catch (error) {
        console.log(error);
    }
}


// PUT/UPDATE Edit Customer
exports.editPost = async (req,res) =>{
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            tel : req.body.tel,
            details : req.body.details,
            updatedAt : Date.now()
        });
        // await res.redirect(`/edit/${req.params.id}`);
        await res.redirect('/');

        console.log("redirected");

    } catch (error) {
        console.log(error);
    }
}

// Delete Customer
exports.deleteCustomer = async (req,res) =>{
    try {
        await Customer.deleteOne({ _id : req.params.id });

        // await req.flash('info', 'Customer has been deleted.')
        res.redirect("/");

        console.log("redirected");

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
        await req.flash('info', 'New customer has been added.');
        
        res.redirect('/');  
        
    } catch (error) {
        console.log(error);
    }
    
}






// GET method / Search Customer
exports.searchCustomers = async (req,res) =>{
    const locals = {
        title : 'Search Customer',
        description : 'Searching customer in NodeJs User Management System'
    }

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g,"");  //to replace any special char with ""
    
        const customers = await Customer.find({
            $or:[
                {firstName : {$regex : new RegExp(searchNoSpecialChar, "i")}},
                {lastName : {$regex : new RegExp(searchNoSpecialChar, "i")}},
            ]
        });
        res.render('search',{
            customers,
            locals
        })

        console.log("redirected");

    } catch (error) {
        console.log(error);
    }
}

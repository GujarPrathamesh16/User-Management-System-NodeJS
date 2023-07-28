// GET/Homepage

exports.homepage = async(req,res) =>{
    const locals = {
        title : 'NodeJS',
        description : 'This is a NodeJs User Management System'
    }
         
    res.render('index', locals);  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals var as a input which is then deconstructed by the ejs in main.ejs
    
}


// GET/ New Customer

exports.addCustomer = async(req,res) =>{
    const locals = {
        title : 'Add New Customer',
        description : 'Adding new customer NodeJs User Management System'
    }
    
    res.render('customer/add', locals);  //renders our index.ejs paje no need to mention .ejs it is smart enough and passes locals var as a input which is then deconstructed by the ejs in main.ejs
    
}
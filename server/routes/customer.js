const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


// Customer Routes
router.get('/', customerController.homepage);
router.get('/about', customerController.about);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);

router.get('/view/:id', customerController.view);

router.get('/edit/:id', customerController.edit);  //renders or gets info for editing the customer.
router.put('/edit/:id', customerController.editPost);  //put method to actually update the edited info.
router.delete('/edit/:id', customerController.deleteCustomer);  //delete method


router.post('/search', customerController.searchCustomers);


module.exports = router
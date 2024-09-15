const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController'); 
const validateAdminRequest = require('../middleware/validateAdminRequest'); 


router.post('/request', validateAdminRequest, adminController.createAdminRequest);  
router.get('/response', adminController.fetchAdminRequests);
router.patch('/accept', adminController.acceptUser);
router.patch('/reject', adminController.rejectUser);

module.exports = router;

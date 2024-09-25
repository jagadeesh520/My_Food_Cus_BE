const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const { 
  getVendorByEmail,
  registerVendor, 
  getVendorsByItemTitle, 
  getAllUniqueItems 
} = require('../controller/vendorController');



// Vendor registration route with multiple file uploads
router.post('/vendor-registration', 
  multer.fields([
    { name: 'add_proof_att', maxCount: 1 },
    { name: 'items[0][image]', maxCount: 1 },
    { name: 'items[1][image]', maxCount: 1 },
    { name: 'items[2][image]', maxCount: 1 },
  ]), 
  registerVendor
);

// Route to get vendors by item title
router.get('/vendors-by-item-title/:title', getVendorsByItemTitle);

// API to get a list of all unique items (without duplicates)
router.get('/get-all-items', getAllUniqueItems);
router.get('/vendor-details-by-email/:email', getVendorByEmail);
module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const { 
  getVendorByEmail,
  registerVendor, 
  getVendorsByItemTitle, 
  getAllUniqueItems 
} = require('../controller/vendorController');

<<<<<<< HEAD


// Vendor registration route with multiple file uploads
=======
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
router.post('/vendor-registration', 
  multer.fields([
    { name: 'add_proof_att', maxCount: 1 },
    { name: 'items[0][image]', maxCount: 1 },
    { name: 'items[1][image]', maxCount: 1 },
    { name: 'items[2][image]', maxCount: 1 },
  ]), 
  registerVendor
);

<<<<<<< HEAD
// Route to get vendors by item title
router.get('/vendors-by-item-title/:title', getVendorsByItemTitle);

// API to get a list of all unique items (without duplicates)
=======

router.get('/vendors-by-item-title/:title', getVendorsByItemTitle);


>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
router.get('/get-all-items', getAllUniqueItems);
router.get('/vendor-details-by-email/:email', getVendorByEmail);
module.exports = router;

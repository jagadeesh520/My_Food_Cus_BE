const Vendor = require('../models/vendor-registration');
const path = require('path');

<<<<<<< HEAD
// Vendor registration function
const registerVendor = async (req, res) => {
  try {
    // Check if vendor already exists based on email or contact number
=======
const registerVendor = async (req, res) => {
  try {
   
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
    const existingVendor = await Vendor.findOne({
      $or: [{ 'personalData.email': req.body.email }, { 'personalData.contact_no': req.body.contact_no }],
    });

    if (existingVendor) {
      return res.status(400).send('Vendor with the same email or contact number already exists!');
    }

<<<<<<< HEAD
    // Capture personal data from request body
=======
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
    const personalData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      contact_no: req.body.contact_no,
      alt_contact_no: req.body.alt_contact_no,
    };

<<<<<<< HEAD
    // Capture address data from request body
=======
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
    const addressData = {
      house_no: req.body.house_no,
      street_name: req.body.street_name,
      landmark: req.body.landmark,
      pincode: req.body.pincode,
      state: req.body.state,
      country: req.body.country,
      current_Add_Location: req.body.current_Add_Location,
      add_Proof_Name: req.body.add_Proof_Name,
      add_proof_att: req.files['add_proof_att'] ? req.files['add_proof_att'][0].filename : null,
    };

<<<<<<< HEAD
    // Handle uploaded items data with image filenames
=======
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
    const itemsData = [];
    if (req.body.items) {
      itemsData.push(
        ...Object.keys(req.body.items).map((key, index) => ({
          title: req.body.items[key].title,
          cost: req.body.items[key].cost,
          image: req.files[`items[${index}][image]`] ? req.files[`items[${index}][image]`][0].filename : null,
        }))
      );
    }

<<<<<<< HEAD
    // Combine all vendor data
=======
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
    const vendorData = {
      personalData,
      addressData,
      items: itemsData,
    };

<<<<<<< HEAD
    // Save vendor data to the database
=======
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
    const vendor = new Vendor(vendorData);
    await vendor.save();
    res.status(201).send('Vendor data successfully saved!');
  } catch (error) {
    console.error('Error saving vendor data:', error);
    res.status(500).send(`Error saving vendor data: ${error.message}`);
  }
};

const getVendorByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const vendor = await Vendor.findOne({ "personalData.email": email });
    
    if (!vendor) {
      return res.status(404).send('Vendor not found.');
    }

    res.status(200).json(vendor);
  } catch (error) {
    console.error('Error fetching vendor details:', error);
    res.status(500).send('Error fetching vendor details.');
  }
};

const getVendorsByItemTitle = async (req, res) => {
  const itemTitle = req.params.title.toLowerCase();

  try {
    const vendors = await Vendor.find({
      items: { $elemMatch: { title: { $regex: new RegExp(`^${itemTitle}$`, 'i') } } },
    });

    if (vendors.length === 0) {
      return res.status(404).send('No vendors found with the specified item title.');
    }

    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching vendors by item title:', error);
    res.status(500).send('Error fetching vendors.');
  }
};

<<<<<<< HEAD
// Function to get all unique items (without duplicates)
const getAllUniqueItems = async (req, res) => {
  try {
    // Find all vendors and extract unique item titles with their respective images
    const vendors = await Vendor.find();

    const uniqueItems = [];
    const itemSet = new Set(); // To track unique item titles

    vendors.forEach(vendor => {
      vendor.items.forEach(item => {
        const titleLower = item.title.toLowerCase(); // Normalize titles to avoid case-sensitive duplicates
=======
const getAllUniqueItems = async (req, res) => {
  try {
   
    const vendors = await Vendor.find();

    const uniqueItems = [];
    const itemSet = new Set(); 

    vendors.forEach(vendor => {
      vendor.items.forEach(item => {
        const titleLower = item.title.toLowerCase(); 
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
        if (!itemSet.has(titleLower)) {
          uniqueItems.push({
            title: item.title,
            image: item.image ? `${req.protocol}://${req.get('host')}/uploads/${item.image}` : null,
            cost: item.cost,
          });
<<<<<<< HEAD
          itemSet.add(titleLower); // Mark this item as seen
=======
          itemSet.add(titleLower); 
>>>>>>> 25ba9e07af5f71ce79c898d0af5518d05a6d5b8f
        }
      });
    });

    if (uniqueItems.length === 0) {
      return res.status(404).send('No items found.');
    }

    res.status(200).json(uniqueItems);
  } catch (error) {
    console.error('Error fetching unique items:', error);
    res.status(500).send('Error fetching unique items.');
  }
};

module.exports = {
  getVendorByEmail,
  registerVendor,
  getVendorsByItemTitle,
  getAllUniqueItems,
};

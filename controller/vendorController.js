const Vendor = require('../models/vendor-registration');
const path = require('path');

const registerVendor = async (req, res) => {
  try {
  
    const existingVendor = await Vendor.findOne({
      $or: [{ 'personalData.email': req.body.email }, { 'personalData.contact_no': req.body.contact_no }],
    });

    if (existingVendor) {
      return res.status(400).send('Vendor with the same email or contact number already exists!');
    }

    const personalData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      contact_no: req.body.contact_no,
      alt_contact_no: req.body.alt_contact_no,
    };

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

    const vendorData = {
      personalData,
      addressData,
      items: itemsData,
    };

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

const getAllUniqueItems = async (req, res) => {
  try {
    
    const vendors = await Vendor.find();

    const uniqueItems = [];
    const itemSet = new Set(); 
    vendors.forEach(vendor => {
      vendor.items.forEach(item => {
        const titleLower = item.title.toLowerCase(); 

        if (!itemSet.has(titleLower)) {
          uniqueItems.push({
            title: item.title,
            image: item.image ? `${req.protocol}://${req.get('host')}/uploads/${item.image}` : null,
            cost: item.cost,
          });

          itemSet.add(titleLower); 

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

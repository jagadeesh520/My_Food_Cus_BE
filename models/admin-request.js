
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  personalInfo: {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },  
    phoneNumber: { type: String, unique: true, required: true }  
  },
  address: {
    houseNo: String,
    streetName: String,
    landmark: String,
    state: String,
    pincode: String,
    country: String
  },
  status: { type: Boolean, default: false }  
});

module.exports = mongoose.model('Admin', userSchema, 'admins');

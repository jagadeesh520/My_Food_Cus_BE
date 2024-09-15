const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  personalData: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    contact_no: { type: String, required: true },
    alt_contact_no: { type: String },
  },
  addressData: {
   
    house_no: { type: String, required: true },
    street_name: { type: String, required: true },
    landmark: { type: String, default: '' },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    current_Add_Location: { type: String, required: true },
    add_Proof_Name: { type: String, required: true },
    add_proof_att: { type: String }, 
  },
  items: [
    {
      title: { type: String, required: true },
      cost: { type: Number, required: true },
      image: { type: String }, 
    },
  ],
});


vendorSchema.pre('save', function (next) {
  if (!this.addressData.house_no && !this.addressData.current_Add_Location) {
    return next(new Error('Either House No or Current Address Location must be provided.'));
  }
  next();
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;

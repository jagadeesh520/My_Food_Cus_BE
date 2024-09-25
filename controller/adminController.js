const User = require('../models/admin-request');


const createAdminRequest = async (req, res) => {
  const { personalInfo, address, status } = req.body;

  const newUser = new User({
    personalInfo: {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      phoneNumber: personalInfo.phoneNumber,
    },
    address: {
      houseNo: address.houseNo,
      streetName: address.streetName,
      landmark: address.landmark,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    },
    status: status,
  });

  try {
    await newUser.save();
    res.status(201).send('User data successfully saved!');
  } catch (error) {
    res.status(500).send(`Error saving user data: ${error.message}`);
  }
};

const fetchAdminRequests = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`Error fetching user data: ${error.message}`);
  }
};


const acceptUser = async (req, res) => {
  const { email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { 'personalInfo.email': email },
      { status: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(`Error updating user status: ${error.message}`);
  }
};

const rejectUser = async (req, res) => {
  const { email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { 'personalInfo.email': email },
      { status: false },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(`Error updating user status: ${error.message}`);
  }
};

module.exports = {
  createAdminRequest,
  fetchAdminRequests,
  acceptUser,
  rejectUser,
};

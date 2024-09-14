
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./admin-request'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb+srv://gangadhargdvs0:ganga123dhar@myfoodcusbe.ji809.mongodb.net/My_Food_Cus_BE', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

  app.post('/admin-request', async (req, res) => {
    const { personalInfo, address, status } = req.body;
  
    const newUser = new User({
      personalInfo: {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        phoneNumber: personalInfo.phoneNumber
      },
      address: {
        houseNo: address.houseNo,
        streetName: address.streetName,
        landmark: address.landmark,
        state: address.state,
        pincode: address.pincode,
        country: address.country
      },
      status: status
    });
  
    try {
      await newUser.save();
      res.status(201).send('User data successfully saved!');
    } catch (error) {
      res.status(500).send(`Error saving user data: ${error.message}`);
    }
  });
  

app.get('/admin-response', async (req, res) => {
  try {
    const users = await User.find();  
    res.status(200).json(users);  
  } catch (error) {
    res.status(500).send(`Error fetching user data: ${error.message}`);
  }
});

app.patch('/accept-user', async (req, res) => {
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
});

app.patch('/reject-user', async (req, res) => {
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
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

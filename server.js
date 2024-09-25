const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 
const vendorRoutes = require('./routes/vendorRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use('/api/vendors', vendorRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

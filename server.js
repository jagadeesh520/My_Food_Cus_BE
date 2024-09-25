const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 
const vendorRoutes = require('./routes/vendorRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Connect to MongoDB
connectDB();

// Static folder to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files (images)

// API Routes
app.use('/api/vendors', vendorRoutes); // Vendor routes
app.use('/api/admin', adminRoutes); // Admin routes

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

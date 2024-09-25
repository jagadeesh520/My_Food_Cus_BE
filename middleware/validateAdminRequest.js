const validateAdminRequest = (req, res, next) => {
    const { personalInfo, address } = req.body;
  
 
    if (!personalInfo || !address) {
      return res.status(400).send('Missing required personal or address information');
    }
  
    const { firstName, lastName, email, phoneNumber } = personalInfo;
    const { houseNo, streetName, pincode, country } = address;
  
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).send('Missing required personal details');
    }
  
    if (!houseNo || !streetName || !pincode || !country) {
      return res.status(400).send('Missing required address details');
    }
  
  
    next();
  };
  
  module.exports = validateAdminRequest;
  
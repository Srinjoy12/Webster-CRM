// Placeholder for customer controllers
// Example:
// const customerService = require('../services/customerService');
// exports.createCustomer = async (req, res, next) => { ... }; 

const customerService = require('../services/customerService');

exports.createCustomer = async (req, res, next) => {
  try {
    // More validation could be done here using a library like Joi or express-validator
    const customerData = req.body;
    if (!customerData || Object.keys(customerData).length === 0) {
        return res.status(400).json({ message: 'Customer data is required.' });
    }
    // Email validation is handled in the service layer, but can also be checked here.

    await customerService.createCustomer(customerData);
    res.status(202).json({ message: 'Customer creation request accepted for processing.' });
  } catch (error) {
    // Pass errors to a global error handler (to be implemented)
    // For now, sending a specific status based on error message
    if (error.message === 'Email is required' || error.message === 'Email already exists.') {
        return res.status(400).json({ message: error.message });
    }
    console.error('Error in createCustomer controller:', error);
    res.status(500).json({ message: 'Internal server error' }); 
    // next(error); // Use this once global error handler is in place
  }
}; 
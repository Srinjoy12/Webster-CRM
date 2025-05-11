const orderService = require('../services/orderService');

exports.createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    if (!orderData || Object.keys(orderData).length === 0) {
      return res.status(400).json({ message: 'Order data is required.' });
    }

    // More detailed validation (e.g., types, formats) can be added here or using a library

    await orderService.createOrder(orderData);
    res.status(202).json({ message: 'Order creation request accepted for processing.' });
  } catch (error) {
    // Log the full error for server-side debugging
    console.error('Error in createOrder controller:', error.message);

    // Send specific error messages to the client
    if (error.message === 'Customer ID and Order Amount are required.') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Customer with the provided ID does not exist.') {
      return res.status(404).json({ message: error.message }); // 404 for not found customer
    }
    // Generic error for other cases
    res.status(500).json({ message: 'Internal server error while creating order.' });
    // In a more mature setup, you might use next(error) to pass to a global error handler
  }
}; 
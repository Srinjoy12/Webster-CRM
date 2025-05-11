// Placeholder for customer services
// Example:
// const { pool } = require('../config/database');
// exports.create = async (customerData) => { ... }; 

const { connectRabbitMQ, publishMessage, CUSTOMER_EXCHANGE, CUSTOMER_CREATED_ROUTING_KEY } = require('../config/rabbitmq');

exports.createCustomer = async (customerData) => {
  // Basic validation: Ensure email is present
  if (!customerData.email) {
    throw new Error('Email is required');
  }
  // Connect to RabbitMQ (ensure connection is established)
  await connectRabbitMQ();
  // Publish message to RabbitMQ
  await publishMessage(CUSTOMER_EXCHANGE, CUSTOMER_CREATED_ROUTING_KEY, customerData);
  // Return immediately (no DB write here)
  return { status: 'queued', data: customerData };
}; 
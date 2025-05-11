const { connectRabbitMQ, publishMessage, ORDER_EXCHANGE, ORDER_CREATED_ROUTING_KEY } = require('../config/rabbitmq');

exports.createOrder = async (orderData) => {
  if (!orderData.customerId || orderData.orderAmount === undefined) {
    throw new Error('Customer ID and Order Amount are required.');
  }
  await connectRabbitMQ();
  await publishMessage(ORDER_EXCHANGE, ORDER_CREATED_ROUTING_KEY, orderData);
  return { status: 'queued', data: orderData };
}; 
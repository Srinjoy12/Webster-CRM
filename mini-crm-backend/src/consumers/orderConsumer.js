require('dotenv').config();
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
const { connectRabbitMQ, ORDER_EXCHANGE, ORDER_CREATED_QUEUE, ORDER_CREATED_ROUTING_KEY } = require('../config/rabbitmq');
const { pool } = require('../config/database');

async function startOrderConsumer() {
  const { channel } = await connectRabbitMQ();

  // Assert queue and bind to exchange/routing key
  await channel.assertQueue(ORDER_CREATED_QUEUE, { durable: true });
  await channel.bindQueue(ORDER_CREATED_QUEUE, ORDER_EXCHANGE, ORDER_CREATED_ROUTING_KEY);
  console.log(`Order consumer is waiting for messages in queue: ${ORDER_CREATED_QUEUE}`);

  channel.consume(ORDER_CREATED_QUEUE, async (msg) => {
    if (msg !== null) {
      try {
        const orderData = JSON.parse(msg.content.toString());
        const { customerId, orderAmount, orderDate, status } = orderData;
        if (!customerId || orderAmount === undefined) {
          throw new Error('Customer ID and Order Amount are required.');
        }
        // Check if customer exists
        const [customers] = await pool.query('SELECT id FROM Customers WHERE id = ?', [customerId]);
        if (customers.length === 0) {
          console.warn(`Customer with ID ${customerId} does not exist. Skipping order insert.`);
          channel.ack(msg);
          return;
        }
        // Insert order
        const [result] = await pool.query(
          'INSERT INTO Orders (customerId, orderAmount, orderDate, status) VALUES (?, ?, ?, ?)',
          [customerId, orderAmount, orderDate || new Date(), status || 'pending']
        );
        console.log(`Inserted order with id ${result.insertId} for customer ${customerId} from queue.`);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing order message:', error);
        // Optionally: channel.nack(msg, false, false); // Send to dead-letter queue
        channel.ack(msg); // For now, just acknowledge to avoid infinite retry
      }
    }
  }, { noAck: false });
}

startOrderConsumer().catch((err) => {
  console.error('Failed to start order consumer:', err);
  process.exit(1);
}); 
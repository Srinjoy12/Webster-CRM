require('dotenv').config();
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
const { connectRabbitMQ, CUSTOMER_EXCHANGE, CUSTOMER_CREATED_QUEUE, CUSTOMER_CREATED_ROUTING_KEY } = require('../config/rabbitmq');
const { pool } = require('../config/database');

async function startCustomerConsumer() {
  const { channel } = await connectRabbitMQ();

  // Assert queue and bind to exchange/routing key
  await channel.assertQueue(CUSTOMER_CREATED_QUEUE, { durable: true });
  await channel.bindQueue(CUSTOMER_CREATED_QUEUE, CUSTOMER_EXCHANGE, CUSTOMER_CREATED_ROUTING_KEY);
  console.log(`Customer consumer is waiting for messages in queue: ${CUSTOMER_CREATED_QUEUE}`);

  channel.consume(CUSTOMER_CREATED_QUEUE, async (msg) => {
    if (msg !== null) {
      try {
        const customerData = JSON.parse(msg.content.toString());
        // Insert into MySQL
        const { firstName, lastName, email, phone, address } = customerData;
        if (!email) {
          throw new Error('Email is required');
        }
        // Check for duplicate email
        const [existing] = await pool.query('SELECT id FROM Customers WHERE email = ?', [email]);
        if (existing.length > 0) {
          console.warn(`Duplicate email detected: ${email}. Skipping insert.`);
          channel.ack(msg); // Acknowledge to remove from queue
          return;
        }
        const [result] = await pool.query(
          'INSERT INTO Customers (firstName, lastName, email, phone, address) VALUES (?, ?, ?, ?, ?)',
          [firstName, lastName, email, phone, address]
        );
        console.log(`Inserted customer with id ${result.insertId} from queue.`);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing customer message:', error);
        // Optionally: channel.nack(msg, false, false); // Send to dead-letter queue
        channel.ack(msg); // For now, just acknowledge to avoid infinite retry
      }
    }
  }, { noAck: false });
}

startCustomerConsumer().catch((err) => {
  console.error('Failed to start customer consumer:', err);
  process.exit(1);
}); 
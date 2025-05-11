const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672/';
let connection = null;
let channel = null;

// Exchanges, Queues, and Routing Keys - define them centrally
const CUSTOMER_EXCHANGE = 'customer_events';
const ORDER_EXCHANGE = 'order_events';

// More specific queues for processing
const CUSTOMER_CREATED_QUEUE = 'customer_created_queue';
const ORDER_CREATED_QUEUE = 'order_created_queue';

// Routing keys
const CUSTOMER_CREATED_ROUTING_KEY = 'customer.created';
const ORDER_CREATED_ROUTING_KEY = 'order.created';

async function connectRabbitMQ() {
  if (connection && channel) {
    return { connection, channel, CUSTOMER_EXCHANGE, ORDER_EXCHANGE, CUSTOMER_CREATED_QUEUE, ORDER_CREATED_QUEUE, CUSTOMER_CREATED_ROUTING_KEY, ORDER_CREATED_ROUTING_KEY };
  }
  try {
    console.log('Connecting to RabbitMQ...');
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Successfully connected to RabbitMQ and channel created.');

    // Assert exchanges - durable, direct exchanges are good for this type of event
    await channel.assertExchange(CUSTOMER_EXCHANGE, 'direct', { durable: true });
    await channel.assertExchange(ORDER_EXCHANGE, 'direct', { durable: true });
    console.log(`Exchanges '${CUSTOMER_EXCHANGE}' and '${ORDER_EXCHANGE}' asserted.`);

    // Consumers will assert queues and bind them.

    connection.on('error', (err) => {
      console.error('[AMQP] connection error', err.message);
      // Handle reconnection logic if needed, or let the app crash and restart via process manager
      connection = null;
      channel = null;
      // Consider exiting the process or implementing a retry mechanism
      // setTimeout(connectRabbitMQ, 5000); // Naive retry
    });
    connection.on('close', () => {
      console.warn('[AMQP] connection closed');
      connection = null;
      channel = null;
      // setTimeout(connectRabbitMQ, 5000); // Naive retry
    });

    return { connection, channel, CUSTOMER_EXCHANGE, ORDER_EXCHANGE, CUSTOMER_CREATED_QUEUE, ORDER_CREATED_QUEUE, CUSTOMER_CREATED_ROUTING_KEY, ORDER_CREATED_ROUTING_KEY };
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    // Rethrow or handle so the application doesn't start in a broken state
    // process.exit(1); // Or implement a retry mechanism
    throw error; // Propagate error to allow server.js to handle startup failure
  }
}

async function publishMessage(exchangeName, routingKey, message) {
  if (!channel) {
    console.error('RabbitMQ channel not available. Message not published.');
    throw new Error('RabbitMQ channel not available.');
    // return; // Or throw an error, depending on desired behavior
  }
  try {
    // Ensure message is a buffer (RabbitMQ expects a buffer)
    const bufferedMessage = Buffer.from(JSON.stringify(message));
    channel.publish(exchangeName, routingKey, bufferedMessage, { persistent: true });
    console.log(`Message published to exchange '${exchangeName}' with routing key '${routingKey}':`, message);
  } catch (error) {
    console.error('Failed to publish message to RabbitMQ:', error);
    // Handle publish errors (e.g., if channel closed unexpectedly)
    // May need to re-establish connection/channel or implement retry
    throw error;
  }
}

async function closeRabbitMQConnection() {
    if (channel) {
        try {
            await channel.close();
            console.log('RabbitMQ channel closed.');
        } catch (error) {
            console.error('Error closing RabbitMQ channel:', error);
        }
        channel = null;
    }
    if (connection) {
        try {
            await connection.close();
            console.log('RabbitMQ connection closed.');
        } catch (error) {
            console.error('Error closing RabbitMQ connection:', error);
        }
        connection = null;
    }
}

module.exports = {
  connectRabbitMQ,
  publishMessage,
  closeRabbitMQConnection,
  RABBITMQ_URL,
  CUSTOMER_EXCHANGE,
  ORDER_EXCHANGE,
  CUSTOMER_CREATED_QUEUE,
  ORDER_CREATED_QUEUE,
  CUSTOMER_CREATED_ROUTING_KEY,
  ORDER_CREATED_ROUTING_KEY
}; 
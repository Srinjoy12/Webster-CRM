const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { testConnection: testDBConnection } = require('./config/database');
const { connectRabbitMQ, closeRabbitMQConnection } = require('./config/rabbitmq'); // Import RabbitMQ functions
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await testDBConnection(); // Test DB connection
    await connectRabbitMQ(); // Connect to RabbitMQ

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        console.log('HTTP server closed.');
        await closeRabbitMQConnection();
        // Add DB connection closing if necessary, though pool usually handles it
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT')); // Catches Ctrl+C

  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer(); 
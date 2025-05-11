const dotenv = require('dotenv');
dotenv.config(); // Load environment variables first

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const session = require('express-session');
const passport = require('passport');
require('./auth/google'); // Google OAuth strategy

const app = express();

// CORS middleware should be added after app is created
app.use(cors({
  origin: 'http://localhost:3001', // or '*' for all origins (not for production)
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Add session and passport middleware
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signup' }),
  (req, res) => {
    // Successful auth, redirect to /campaigns
    res.redirect('/campaigns');
  }
);

// Placeholder for basic route
app.get('/', (req, res) => {
  res.send('Mini CRM API is running!');
});

// Customer Routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', customerRoutes);

// Order Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Audience Routes
const audienceRoutes = require('./routes/audienceRoutes');
app.use('/api/audience', audienceRoutes);

// Campaign Routes
const campaignRoutes = require('./routes/campaignRoutes');
app.use('/api/campaigns', campaignRoutes);

// Vendor Routes
const vendorRoutes = require('./routes/vendorRoutes');
app.use('/api/vendor', vendorRoutes);

// Receipt Routes
const receiptRoutes = require('./routes/receiptRoutes');
app.use('/api/receipts', receiptRoutes);

// AI Routes
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// TODO: Add global error handling middleware

module.exports = app; 
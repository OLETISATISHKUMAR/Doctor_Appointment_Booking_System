const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');
const { errorHandler } = require('./src/middleware/errorHandler');

// const doctorRoutes = require('./src/routes/doctorRoutes');
// const patientRoutes = require('./src/routes/patientRoutes');
// const hospitalRoutes = require('./src/routes/hospitalRoutes');
// const appointmentRoutes = require('./src/routes/appointmentRoutes');
// const paymentRoutes = require('./src/routes/paymentRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const superAdminRoutes = require("./src/routes/superAdminRoutes")

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allows all domains; for production, restrict this to your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Middleware
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/hospitals', hospitalRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/payments', paymentRoutes);



module.exports = app;

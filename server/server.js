const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import database connection
const connectDB = require('./src/config/db');

// Connect to the database
connectDB();

const PORT = process.env.PORT || 8080;

// Start server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

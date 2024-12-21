const winston = require('winston');

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ],
});

// Function to log info messages
logger.info = (message) => {
  logger.log('info', message);
};

// Function to log error messages
logger.error = (message) => {
  logger.log('error', message);
};

module.exports = logger;

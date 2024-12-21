const logger = require("../utils/logger");

exports.loggerMiddleware = (req, res, next) => {
  const logMessage = `${req.method} ${req.originalUrl} - ${new Date().toISOString()}`;
  logger.info(logMessage); // Log the request details
  next();
};

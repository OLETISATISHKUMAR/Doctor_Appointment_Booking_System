module.exports = {
    success: (res, statusCode, data) => {
      return res.status(statusCode).json({
        success: true,
        message: 'Request was successful',
        data: data
      });
    },
  
    error: (res, statusCode, message) => {
      return res.status(statusCode).json({
        success: false,
        message: message || 'An error occurred'
      });
    }
  };
  
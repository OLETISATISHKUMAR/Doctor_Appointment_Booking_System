const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'smtp',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;

const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Set email user (sender's email)
    pass: process.env.EMAIL_PASS, // Set email password (can be an app-specific password)
  },
});

// Function to send an email
exports.sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html, // You can send HTML emails if needed
  };

  return transporter.sendMail(mailOptions);
};

const Joi = require('joi');

// Payment creation validation
const paymentValidation = (data) => {
  const schema = Joi.object({
    appointmentId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    status: Joi.string().valid('pending', 'completed', 'failed').required(),
    paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'cash', 'upi').required(),
  });

  return schema.validate(data);
};

// Payment status update validation
const statusValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'completed', 'failed').required(),
  });

  return schema.validate(data);
};

module.exports = { paymentValidation, statusValidation };

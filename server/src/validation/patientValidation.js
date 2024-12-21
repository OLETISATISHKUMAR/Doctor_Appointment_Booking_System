const Joi = require('joi');

const patientValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(1).max(120).required(),
    address: Joi.string().min(5).max(255).required(),
    contactNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .message('Contact number must be a 10-digit number')
      .required(),
  });
  return schema.validate(data);
};

module.exports = { patientValidation };

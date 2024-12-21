const Joi = require('joi');

const hospitalValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    consultationFees: Joi.number().min(0).required(),
    policies: Joi.string().min(10).max(1000).optional(),
  });
  return schema.validate(data);
};

module.exports = { hospitalValidation };

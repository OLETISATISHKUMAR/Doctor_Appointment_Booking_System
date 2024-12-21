const Joi = require('joi');

// Validation for creating/updating appointments
const appointmentValidation = (data) => {
  const schema = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    hospitalId: Joi.string().required(),
    date: Joi.date().iso().required(),
    timeSlot: Joi.string().required(),
    hospitalAddress: Joi.string().min(5).max(255).required(),
    doctorQualification: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(data);
};

// Validation for updating appointment status
const statusValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').required(),
  });

  return schema.validate(data);
};

module.exports = { appointmentValidation, statusValidation };

const Joi = require('joi');

const doctorCreateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    specialization: Joi.string().min(3).max(255).required(),
    qualification: Joi.string().min(3).max(255).required(),
    hospital: Joi.string().required(), // assuming it's an ObjectId, but you can validate further if necessary
    fees: Joi.number().required(),
    availability: Joi.array().items(
      Joi.object({
        day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
        shift: Joi.string().valid('morning', 'evening').required(),
        timeSlots: Joi.array().items(Joi.string().pattern(/^\d{2}:\d{2}$/)).required(),
      })
    ).required(),
  });
  return schema.validate(data);
};

const doctorUpdateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    email: Joi.string().email(),
    specialization: Joi.string().min(3).max(255),
    qualification: Joi.string().min(3).max(255),
    hospital: Joi.string(),
    fees: Joi.number(),
    availability: Joi.array().items(
      Joi.object({
        day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        shift: Joi.string().valid('morning', 'evening'),
        timeSlots: Joi.array().items(Joi.string().pattern(/^\d{2}:\d{2}$/)),
      })
    ),
  });
  return schema.validate(data);
};

module.exports = { doctorCreateValidation, doctorUpdateValidation };

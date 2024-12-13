const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const responseHandler = require('../utils/responseHandler');

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user doctor hospital');
    console.log('Success: Retrieved all appointments');
    responseHandler.success(res, 200, appointments);
  } catch (error) {
    console.log('Error: Error fetching appointments', error);
    responseHandler.error(res, 500, 'Error fetching appointments');
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('user doctor hospital');
    if (!appointment) {
      console.log('Error: Appointment not found');
      return responseHandler.error(res, 404, 'Appointment not found');
    }
    console.log('Success: Retrieved appointment by ID');
    responseHandler.success(res, 200, appointment);
  } catch (error) {
    console.log('Error: Error fetching appointment', error);
    responseHandler.error(res, 500, 'Error fetching appointment');
  }
};

// Validate time slot availability
const validateTimeSlot = async (doctorId, timeSlot, appointmentDate) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    console.log('Error: Doctor not found');
    throw new Error('Doctor not found');
  }

  const slotRange = appointmentDate.getHours() < 12 ? 'morning' : 'evening';
  const availableSlots = doctor.availableTimeSlots.find(
    slot => slot.range === slotRange
  );

  if (!availableSlots || !availableSlots.slots.includes(timeSlot)) {
    console.log(`Error: Time slot ${timeSlot} is not available`);
    throw new Error('Selected time slot is not available');
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { user, doctor, hospital, appointmentDate, timeSlot, timeSlotRange } = req.body;

    // Validate time slot availability
    await validateTimeSlot(doctor, timeSlot, appointmentDate);

    const newAppointment = new Appointment({ user, doctor, hospital, appointmentDate, timeSlot, timeSlotRange });
    await newAppointment.save();
    console.log('Success: Appointment created');
    responseHandler.success(res, 201, newAppointment);
  } catch (error) {
    console.log('Error: Error creating appointment', error.message || error);
    responseHandler.error(res, 500, 'Error creating appointment');
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { timeSlot, timeSlotRange } = req.body;

    // Validate time slot availability
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      console.log('Error: Appointment not found');
      return responseHandler.error(res, 404, 'Appointment not found');
    }

    await validateTimeSlot(appointment.doctor, timeSlot, appointment.appointmentDate);

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    console.log('Success: Appointment updated');
    responseHandler.success(res, 200, updatedAppointment);
  } catch (error) {
    console.log('Error: Error updating appointment', error.message || error);
    responseHandler.error(res, 500, 'Error updating appointment');
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      console.log('Error: Appointment not found');
      return responseHandler.error(res, 404, 'Appointment not found');
    }
    console.log('Success: Appointment deleted');
    responseHandler.success(res, 200, 'Appointment deleted');
  } catch (error) {
    console.log('Error: Error deleting appointment', error);
    responseHandler.error(res, 500, 'Error deleting appointment');
  }
};

const mongoose = require('mongoose');

// Helper function to generate time slots with 15-minute intervals
function generateTimeSlots(startTime, endTime) {
  const slots = [];
  let currentTime = new Date(startTime);
  const endTimeDate = new Date(endTime);

  while (currentTime <= endTimeDate) {
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    
    // Format time in 12-hour format (AM/PM)
    let time = `${hours % 12 || 12}:${minutes === 0 ? '00' : minutes} ${hours < 12 ? 'AM' : 'PM'}`;
    slots.push(time);

    // Increment by 15 minutes
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }

  return slots;
}

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  availableTimeSlots: [{
    range: {
      type: String,
      enum: ['morning', 'evening'],
      required: true
    },
    slots: [{
      type: String,
      required: true
    }]
  }]
});

// Example default available time slots for a doctor with 15-minute intervals
doctorSchema.pre('save', function (next) {
  if (this.isNew) {
    this.availableTimeSlots = [
      {
        range: 'morning',
        slots: generateTimeSlots('09:00 AM', '12:00 PM')
      },
      {
        range: 'evening',
        slots: generateTimeSlots('03:00 PM', '08:00 PM')
      }
    ];
  }
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);

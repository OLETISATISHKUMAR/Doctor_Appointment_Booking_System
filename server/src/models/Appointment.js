const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Hospital is required"],
    },
    date: {
      type: Date,
      required: [true, "Appointment date is required"],
      validate: {
        validator: (value) => value >= new Date(),
        message: "Appointment date cannot be in the past",
      },
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      match: [/^\d{2}:\d{2}$/, "Time slot must be in the format HH:MM"],
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "No Show"],
      default: "Scheduled",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentDetails: {
      transactionId: { type: String, trim: true },
      amount: {
        type: Number,
        min: [0, "Amount must be positive"],
        required: function () {
          return this.paymentStatus === "Paid" || this.paymentStatus === "Failed";
        },
      },
      paymentDate: { type: Date },
      method: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI", "Cash"],
      },
      paymentReference: { type: String, trim: true }, // Optional reference for payment gateway
    },
    doctorQualification: {
      type: String,
      required: [true, "Doctor's qualification is required"],
    },
    notes: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who created the appointment (Admin/Doctor)
  },
  { timestamps: true }
);

// Pre-save hook to validate date and time
appointmentSchema.pre("save", function (next) {
  if (this.date < new Date()) {
    const error = new Error("Appointment date cannot be in the past.");
    return next(error);
  }
  next();
});

// Virtual field for the full appointment details
appointmentSchema.virtual("fullDetails").get(function () {
  return `Appointment with Dr. ${this.doctor.name} for patient ${this.patient.name} at ${this.hospital.name} on ${this.date} at ${this.timeSlot}`;
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

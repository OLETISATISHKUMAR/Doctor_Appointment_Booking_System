const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor's name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Exclude password from queries by default
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: [true, "Associated hospital is required"],
    },
    availability: [
      {
        day: {
          type: String,
          required: [true, "Day is required"],
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ], // Restrict to valid days of the week
        },
        shift: {
          type: String,
          enum: ["morning", "evening"],
          required: [true, "Shift is required"],
        },
        timeSlots: {
          type: [String],
          required: [true, "Time slots are required"],
          validate: {
            validator: (slots) => slots.length > 0,
            message: "At least one time slot must be provided",
          },
        },
      },
    ],
    fees: {
      type: Number,
      required: [true, "Consultation fees are required"],
      min: [0, "Fees must be a positive value"],
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook for hashing passwords
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Virtual property for full availability description
doctorSchema.virtual("fullAvailability").get(function () {
  return this.availability.map(
    (slot) => `${slot.day} (${slot.shift}): ${slot.timeSlots.join(", ")}`
  );
});

// Pre-remove hook to handle cascading deletions
doctorSchema.pre("remove", async function (next) {
  await this.model("Appointment").deleteMany({ doctor: this._id });
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

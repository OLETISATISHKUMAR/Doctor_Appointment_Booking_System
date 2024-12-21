const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const hospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },
    address: {
      street: { type: String, required: [true, "Street address is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      zipCode: {
        type: String,
        match: [/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"],
        required: [true, "Zip code is required"],
      },
    },
    contactDetails: {
      phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Please enter a valid phone number"],
      },
      email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      },
      website: { type: String, trim: true },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Ensure password is not returned in queries by default
    },
    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch", // Optional for multi-branch hospitals
      },
    ],
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    consultationFees: {
      type: Number,
      required: [true, "Consultation fees are required"],
      min: [0, "Consultation fees must be a positive number"],
    },
    policies: [
      {
        type: String,
        trim: true,
      },
    ],
    openingHours: [
      {
        day: { type: String, required: [true, "Day is required"] },
        open: { type: String, required: [true, "Opening time is required"] },
        close: { type: String, required: [true, "Closing time is required"] },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook for hashing passwords
hospitalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Pre-remove hook to handle cascading deletions (e.g., removing doctors from the hospital)
hospitalSchema.pre("remove", async function (next) {
  await this.model("Doctor").deleteMany({ hospital: this._id });
  next();
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;

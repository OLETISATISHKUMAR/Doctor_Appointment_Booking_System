const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Exclude password from queries by default
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    address: {
      street: { type: String, required: [true, "Street address is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      zipCode: { type: String, required: [true, "Zip code is required"] },
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

// Middleware to hash password before saving
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});

// Virtual field for full address
patientSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} - ${this.address.zipCode}`;
});

// Method to validate password
patientSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare password
};

// Pre-remove hook to handle cascading deletions of appointments when a patient is deleted
patientSchema.pre("remove", async function (next) {
  await this.model("Appointment").deleteMany({ patient: this._id });
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

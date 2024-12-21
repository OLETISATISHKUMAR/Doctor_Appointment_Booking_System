const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    // Check if Admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    // Create default Admin data
    const adminData = {
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin123", // Set default password
      role: "admin", // Admin role
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    // Save the Admin to the database
    const admin = new User(adminData);
    await admin.save();

    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error seeding Admin:", error.message);
  }
};

// Call the seeding function
seedAdmin().then(() => mongoose.disconnect());

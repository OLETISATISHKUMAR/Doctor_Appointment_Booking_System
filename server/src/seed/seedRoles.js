const mongoose = require('mongoose');
const Role = require('../models/Role');
const dotenv = require('dotenv');
dotenv.config();

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const roles = ['SuperAdmin', 'Admin', 'Hospital', 'Doctor', 'Patient'];

    for (const roleName of roles) {
      const roleExists = await Role.findOne({ name: roleName });
      if (!roleExists) {
        const role = new Role({ name: roleName });
        await role.save();
        console.log(`Role '${roleName}' seeded successfully!`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding roles:', error.message);
    process.exit(1);
  }
};

seedRoles();

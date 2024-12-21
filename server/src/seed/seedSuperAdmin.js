const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const superAdminExists = await User.findOne({ role: 'SuperAdmin' });
    if (!superAdminExists) {
      const superAdmin = new User({
        name: 'Super Admin',
        email: 'superadmin@healthub.com',
        password: 'superadmin@healthhub',
        role: 'SuperAdmin',
      });
      await superAdmin.save();
      console.log('Super Admin seeded successfully!');
    } else {
      console.log('Super Admin already exists!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding Super Admin:', error.message);
    process.exit(1);
  }
};

seedSuperAdmin();



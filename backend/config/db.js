const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

module.exports = ConnectDB;
const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB is connected....${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
  }
};
module.exports = connectDB;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}node-tfi-db`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToMongoDB;
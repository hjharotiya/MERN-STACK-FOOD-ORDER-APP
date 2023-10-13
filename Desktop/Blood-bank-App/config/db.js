const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`DB error ${error}`.bgRed.white);
  }
};

module.exports = ConnectDB;

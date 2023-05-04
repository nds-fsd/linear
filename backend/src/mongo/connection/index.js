

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbUrl = process.env.URL_DATABASE;
let mongodb;
console.log(dbUrl)

exports.connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
<<<<<<< HEAD
    await mongoose.connect(dbUrl);

=======
    mongoose.connect(dbUrl);
>>>>>>> Sprint-2
    const mongo = mongoose.connection;
    mongo.on("error", (error) => console.error(error));
  } catch (e) {
    console.log(e);
  }
};

exports.disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
  } catch (err) {
    console.log(err);
  }
};

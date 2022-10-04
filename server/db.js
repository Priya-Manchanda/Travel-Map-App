const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017";
const mongoConnect = () => {
  mongoose.connect(URL, () => {
    console.log("Mongodb connected");
  });
};
module.exports = mongoConnect;

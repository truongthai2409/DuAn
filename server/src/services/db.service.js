const mongoose = require("mongoose");
const { URI } = require("../config/index");

class DatabaseService {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log("Failed to connect to database", err);
      });
  }
}

const db = new DatabaseService();
module.exports = { db };

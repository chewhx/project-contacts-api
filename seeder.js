// === !WARNING ===
// This file contains scripts that will (1) inject fresh data and (2) destory current data
// Use with caution strictly as a development tool only
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const connectDB = require("./config/connectDB");
const Contact = require("./models/Contact");
const { Mongoose } = require("mongoose");

// Connect to db
connectDB();

// Read data from local file
const contacts = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "data", "_contacts.json"), "utf-8")
);

// Insert many into db
const injectData = async () => {
  try {
    await Contact.create(contacts);
    console.log("Data injected...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete many from db
const destroyData = async () => {
  try {
    await Contact.deleteMany();
    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "inject") {
  injectData();
}
if (process.argv[2] === "destroy") {
  destroyData();
}

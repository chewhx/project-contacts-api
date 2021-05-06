require("dotenv").config();
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middlewares/errors");

const app = express();

// Connect MongoDB
connectDB();

// Body parser
app.use(express.json());

// Dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Import routes
const contactRoutes = require("./routes/api-v1-contacts");

// Mout routes
app.use("/api/v1/contacts", contactRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} on port ${PORT}!`.yellow.bold
  );
});

require("dotenv").config();
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

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

// Set security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable cors
app.use(cors());

// Import routes
const contactRoutes = require("./routes/api-v1-contacts");

// Mount routes
app.use("/api/v1/contacts", contactRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} on port ${PORT}!`.yellow.bold
  );
});

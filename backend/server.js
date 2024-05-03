const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware.js");
const cors = require("cors");

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

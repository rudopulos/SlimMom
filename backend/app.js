const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./db/db");
// const contactsRouter = require("./routes/api/contactsRoutes");
const authRoutes = require("./routes/api/authRoutes");
const emailRoute = require("./routes/api/emailRoute");
const calcRoutes = require("./routes/api/calcRoutes");
const diaryRoutes = require("./routes/api/diaryRoutes");

connectDB();

const app = express();

app.use(express.json());
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());

app.use("/api/calculate-calories", calcRoutes);
app.use("/users", authRoutes);
app.use("/api", emailRoute);
app.use("/api/addFood", diaryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/api.routes");

const app = express();


app.use(cors({
  origin: process.env.CORS_URL || "http://localhost:5173", 
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRoutes);

module.exports = app;

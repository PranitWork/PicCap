const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/api.routes");

const app = express();


app.use(cors({
  origin: "https://pic-cap.vercel.app", 
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRoutes);

module.exports = app;

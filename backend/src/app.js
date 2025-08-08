const express = require("express");
const apiRoutes = require("./routes/api.routes");
const cookieParser = require('cookie-parser')
const cors = require("cors")


const app = express();

app.use(cors({
      credentials: true,
}))

app.use(cookieParser())

app.use(express.json());
app.use("/api", apiRoutes);


module.exports = app;
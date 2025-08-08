const app = require("./src/app");
require("dotenv").config();

const dbconnect = require("./src/db/db");



dbconnect();

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port 3000");
})
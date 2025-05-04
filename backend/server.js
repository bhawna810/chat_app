const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config({ path: '../.env' });
const app = express();

app.use(cors()); 
app.use(express.json()); 

// ✅ Handle Preflight Requests
app.options('*', cors()); 

app.get("/", (req, res) => {
    res.send("API is running...");
  }); 

app.use('/api/user', userRoutes);

console.log('process.env.MongoDB_Url', process.env.MongoDB_Url);

connectDB();

app.listen(5001 , console.log("  app is lisiting at port 5000 "));

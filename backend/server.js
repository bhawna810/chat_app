const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db');


dotenv.config({ path: '../.env' });
const app = express();

app.use('/api/user', userRoutes)

console.log('process.env.MongoDB_Url', process.env.MongoDB_Url)

connectDB();

app.listen(5001 , console.log("  app is lisiting at port 5000 "))

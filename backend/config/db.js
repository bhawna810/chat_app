const mongoose = require('mongoose');

const connectDB = async () => {

    const connectionString = process.env.MongoDB_Url;
    console.log(' connectionString ', connectionString);
    await mongoose.connect(connectionString, { 
         useNewUrlParser: true, 
         useUnifiedTopology: true 
    })
    .then(() => console.log('Connected to MongoDB')) 
    .catch(err => console.error('Error connecting to MongoDB:', err));
 
}

module.exports = connectDB;


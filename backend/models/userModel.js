const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const saltRounds = 10; 

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
            trim : true,
        },
        name : {
            type : String,
            required : true,
        },
        image : {
            type: String
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
     // check if password is present and is modified.
  try {
    if (this.password && this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, saltRounds);

      console.log(" Hashed Password ", this.password )
    }
    next();
  } catch (err) {
    next(err);
  }
})


module.exports = mongoose.model('User', userSchema);


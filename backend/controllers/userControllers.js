const User = require("../models/userModel");
const BlacklistedToken = require("../models/blacklistedToken");
const generateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs');
// const upload = require('../middleware/multer');
const cloudinary = require('../config/cloudinary');

const userValidate = async(req , res ) => {

    const { email , password} = req.query ;

    // console.log(" email inside the validate function is " , email );
    // console.log(" password inside the validate function is ", password);
    
    if( !email || !password){
        // console.log(" inside empty value of either email or password ")
        return  res.status(400).json({
           val : " inside empty value of either email or password"
         });
     }

    let userPresent = await User.findOne({email : email}); 

    console.log("userPresent inside userValidate function ", userPresent);

    if(userPresent){

         const userAllowed = await bcrypt.compare(password, userPresent.password);
         if(userAllowed){
            return res.status(200).json({
                 user :  userPresent,
                 token : generateToken(email , password, userPresent.id),
            })
                
         }
         else{
            return res.status(200).send("invalid emailId or Password ");
         }
    }else{
         return res.status(200).send(" User does not found ");
    }
}

const userRegister = async(req, res) => {

    // console.log(" hello ");
    const {  email , password, name, image, isAdmin } = req.body;

    console.log(" email " , email);
    console.log(" password " , password);
    console.log(" name ", name);


    if( !email || !password){
    //    console.log(" inside empty value of either email or password ")
       return  res.status(400).json({
          val : " inside empty value of either email or password"
        });
    }

    let userPresent = await User.findOne({email : email});

    // console.log(" userPresent " , userPresent);

    if(userPresent){
        // console.log(" inside userpresent true ", userPresent)
        return res.status(400).send();
    }
    else{
        
        try{

            // console.log(" inside try block ")

            let newUser = await new User({
                // name : name,
                email : email, 
                password : password,
                name : name,
                image: image,
                isAdmin : isAdmin
            })
            .save()
            
            if(newUser){

                res.status(201).json({
                    name: name,
                    email: email,
                    image: image,
                    id: newUser.id,
                    token : generateToken(email , password, newUser.id)
                });
            }
            
        }
        catch{
            // console.log(" getting some err ")
            return res.status(400).send();
        }
    }

}

const uploadandSaveImage = async (req, res) => {

    console.log("inside uploadandSaveImage ")
    console.log("req.file: ", req.file);
    console.log("req.body: ", req.body);

  try {
    // Start Cloudinary upload stream

    console.log("inside try")

    if (!req.file || !req.body.email) {
      return res.status(400).json({ error: 'Image or email missing' });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'chat_app_users' },
      async (error, result) => {
        if (error){
          console.log(error);
          return res.status(500).json({ error });
        } 

        // Update MongoDB with Cloudinary image URL
        const user = await User.findOneAndUpdate(
          { email: req.body.email }, // or req.user.email if you're using auth
          { image: result.secure_url },
          { new: true }
        );

        // res.json({ message: 'Image uploaded', user });
        res.json({ message: 'Image uploaded' , result : result});
      }
    );

    // Pipe the file buffer into the Cloudinary upload stream
    stream.end(req.file.buffer);

  } catch (err) {
    console.log("inside catch" , err);
    res.status(500).json({ error: 'Something went wrong' });
  }

}

const removeImage = async (req, res) => {

    const { email , image} = req.body ;

    console.log("inside removeImage", email , image);

    if( !email){
        return  res.status(400).json({
           val : " inside empty value of either email or image"
         });
    }

    try{

        const userPresent = await User.findOneAndUpdate(
          { email: email }, // or req.user.email if you're using auth
          { image: image },
          { new: true }
        )
        return res.status(200).json({user : userPresent})
    }
    catch(err){
      console.log("inside catch" , err);
      res.status(500).json({ error: 'Something went wrong' });
    }
}

const logout = async (req, res) => {

    console.log("inside logout function")

    const token = req.headers['authorization'].split(' ')[1];
    console.log('token', token);

    const now = new Date();
    // const expriesAt = new Date(now.getTime() + 60 * 60 * 1000);
     const expriesAt = new Date(now.getTime() + 5 * 60 * 1000);

    console.log("now", now);
    console.log("expriesAt", expriesAt);

    try{

        let newToken = await new BlacklistedToken({
            token : token,
            expiresAt : expriesAt
        })
        .save()

        console.log("newToken",newToken);

        res.status(200).send('Logout SuccessFully');
    }
    catch(error){
        console.log('error', error);
        res.status(401).send('get some error', error);
     }                
      
}


const searchUser = async (req, res) => {

  console.log(": hello ---------------");
  
   try {
    const users = await User.find({}).select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

}
module.exports =  {userRegister ,userValidate , uploadandSaveImage , removeImage , logout , searchUser}

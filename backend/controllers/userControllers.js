const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs');

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

    if(userPresent){

         const userAllowed = await bcrypt.compare(password, userPresent.password);
         if(userAllowed){
            return res.status(200).json({
                email : email ,
                token : generateToken(email , password)
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
    const {  email , password, name } = req.body;

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
                name : name
            })
            .save()

            
            if(newUser){
                // console.log(" inside return newuser vallue ")
            //    return res.status(201)
                res.status(201).json({
                //   _id: user._id,
                  name: name,
                  email: email,
                  token : generateToken(email , password)
                });
            }
            
        }
        catch{
            // console.log(" getting some err ")
            return res.status(400).send();
        }
    }

}

module.exports =  {userRegister ,userValidate }
import React, { useState }  from 'react'
import { Box } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Field}  from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";
import { IoMdEye , IoIosEyeOff } from "react-icons/io";


const Login = () => {

  const [ boolhidePassword , setboolHidePassword] = useState(false);

  function setHidePasswordValfunctCall(){

    console.log(" hello i am inside the function ");

    const inputEle = document.getElementById('password');
    
    if(boolhidePassword){
        inputEle.type = "text";
        setboolHidePassword(!boolhidePassword)
    }else{
       inputEle.type = "password";
       setboolHidePassword(!boolhidePassword)
    }
  }

  return (
    <div>
       
       <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" >
         TALK-A-TIVE
       </Box>
     
        <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" >
            <p>Email Address</p>
            <Input placeholder="Enter your email" borderColor="border.disabled"/>
             <p>Password</p>
             <Input placeholder="Password" type="password"  id="password"/>
              {
                boolhidePassword ?  <IoMdEye onClick={setHidePasswordValfunctCall} /> : <IoIosEyeOff onClick={setHidePasswordValfunctCall} />
              }
              
             <Button colorScheme="teal">Login</Button>
             <Button colorScheme="red" >Login as a guest User</Button>
       </Box>


    </div>
  )
}

export default Login

import React , {useState, useRef} from 'react'
// import { Box } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
// import { Field}  from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";
import { IoMdEye , IoIosEyeOff } from "react-icons/io";

const Signup = () => {
  const [ boolhidePassword , setboolHidePassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  function signUpAllVAlues(){

    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    console.log(" emailVal " , emailVal);
    console.log(" passwordVal " , passwordVal);

    fetch('/api/user' , {
      method : 'POST', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailVal, password: passwordVal }),
    })
   .then(response => response.json())
   .then(data => console.log("Response:", data))
   .catch(error => console.error("Error:", error));

  }

  return (
    <div>
            <p>Email Address</p>
            <Input ref={emailRef} placeholder="Enter your email" borderColor="border.disabled"/>
             <p>Password</p>
             <Input placeholder="Password" type="password"  id="password" ref={passwordRef} />
              {
                boolhidePassword ?  <IoMdEye onClick={setHidePasswordValfunctCall} /> : <IoIosEyeOff onClick={setHidePasswordValfunctCall} />
              }
              <p>Confirm Password</p>
              <Input placeholder="Password" type="password"  id="password" />
              {
                boolhidePassword ?  <IoMdEye onClick={setHidePasswordValfunctCall} /> : <IoIosEyeOff onClick={setHidePasswordValfunctCall} />
              }
             <Button colorScheme="teal" onClick={signUpAllVAlues}>SignUp</Button>
             {/* <Button colorScheme="red" >Login as a guest User</Button> */}
    </div>
  )
}

export default Signup

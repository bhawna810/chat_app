import React, { useState, useRef }  from 'react'
// import { Box } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
// import { Field}  from "@chakra-ui/react"
import { Button } from "@chakra-ui/react";
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {ChatContext} from  "../../Context/ChatProvider"

const Login = () => {

  const [ boolhidePassword , setboolHidePassword] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {user , setUser} = ChatContext();

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

 

  function loginUser(){

    const paramsVal = new URLSearchParams({
      email: emailRef.current.value,
      password: passwordRef.current.value
  });

    fetch(`http://localhost:5001/api/user/login?${paramsVal}` ,{
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Login Response:", data);
      setUser({ email: data.user.email, password: data.user.password , name: data.user.name, image : data.user.image , token : data.token , id: data.user._id})
    })
    .catch(error => console.error("Error:", error));

    navigate("/Chatpage");

  }

  return (
    <div>
            <p>Email Address</p>
            <Input placeholder="Enter your email" borderColor="border.disabled"  ref={emailRef}/>
             <p>Password</p>
             <Input placeholder="Password" type="password"  id="password"  ref={passwordRef}/>
              {
                boolhidePassword ?  <IoMdEye onClick={setHidePasswordValfunctCall} /> : <IoIosEyeOff onClick={setHidePasswordValfunctCall} />
              }
              
             <Button colorScheme="teal" onClick={loginUser}>Login</Button>
             <Button colorScheme="red" >Login as a guest User</Button>
    </div>
  )
}

export default Login

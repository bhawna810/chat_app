import Login from '../appcomponents/Authentication/Login'
import Signup from '../appcomponents/Authentication/Signup'
import React , {useState} from 'react'
import "../css/home.css"
import backgroundImage from '../assets/background.png';  // Adjust the path according to your folder
import { Box, Button } from "@chakra-ui/react"

const Homepage = () => {

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const [isLoginBoolVal , setIsLoginBoolVal] = useState(true);


  return (
  
    <div className="HomePageMainDiv" style={divStyle}>
        <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" >
           TALK-A-TIVE
        </Box>
        <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" >
          <div>
            <Button onClick = {() => setIsLoginBoolVal(true)}>Login</Button>
            <Button onClick = {() => setIsLoginBoolVal(false)}>SignUp</Button>
          </div>
          <div>
             { isLoginBoolVal ? <Login></Login> : <Signup></Signup>}
          </div>
        </Box>
    </div>
  )
}

export default Homepage

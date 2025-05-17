import React , {useState, useRef} from 'react'
import { Box, Avatar, Input, Button } from "@chakra-ui/react"
import SideDrawer from '../appcomponents/miscellaneous/SideDrawer';
import backgroundImage from '../assets/background.png';  // Adjust the path according to your folder
import MyChats from '../appcomponents/MyChats';
import Chatbox from '../appcomponents/Chatbox';

const Chatpage = () => {

   const divStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      position :'relative'
    };

  return (
    <div style={divStyle }>
          <SideDrawer/>
          <MyChats/>
         <Chatbox/>
        
        
    </div>
  )
}

export default Chatpage

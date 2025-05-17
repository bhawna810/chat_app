import React from 'react';
import { Box } from "@chakra-ui/react";
import {ChatContext} from  "../Context/ChatProvider"

const Chatbox = () => {

  const {currentUser , setCurrentUser} = ChatContext();

  return (
    <div style={{marginTop : '2rem', position: 'absolute', width: '47%' ,right: '0rem', margin: '1rem'}}>
       <Box bg="white" w="100%" p="4" color="white" style={{height : '20rem', borderRadius : '5px'}}>
          {currentUser ? 
              <Chatboxdisplay/>
            : <p style={{color : 'black'}}>Click on the user to start chatting</p>
          }
       </Box>
    </div>
  )
}

const Chatboxdisplay = () => {

  return (
      <div style={{backgroundColor : 'grey'}}>
         hello
      </div>
  )
}


export default Chatbox

import React from 'react';
import { Box, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import {ChatContext} from  "../Context/ChatProvider"

const MyChats = () => {

  const {currentUser , setCurrentUser} = ChatContext();


  return (
    <div style={{marginTop : '2rem', position: 'absolute', width: '49%', margin: '1rem'}}>
      <Box bg="white" w="100%" p="4" color="white" style={{height : '20rem', borderRadius : '5px'}}>
        <div style={{position : 'relative'}}>
          <span style={{color: 'black'}}>My Chats</span>
          <Button style={{border: '1px solid', position : 'absolute', right : '1rem'}}>New Group Chats <FaPlus/></Button>
        </div>
        <div>
         { currentUser? 
             <div>
                <p style={{color: 'black', backgroundColor: 'blue', paddding : '1rem', margin : '1rem'}}>{currentUser.name}</p>
             </div>
             : null
         }
        </div>
      </Box>
    </div>
  )
}

export default MyChats

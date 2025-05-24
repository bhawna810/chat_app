import React , {useState, useRef, useEffect} from 'react'
import { Box } from "@chakra-ui/react";
import {ChatContext} from  "../Context/ChatProvider"
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
// import {ChatContext} from  "../Context/ChatProvider"

// connect to backend running on 5001
const socket = io("http://localhost:5001", {
  transports: ["websocket", "polling"],
});

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

  const messageInputRef = useRef(null);
  const {user , setUser} = ChatContext();
  const {currentUser , setCurrentUser} = ChatContext();

  useEffect(() => {
    socket.emit("setUp", user.id);
    console.log("user.id inside useffecte ", user.id);
  }, [user]);

 async  function sendMessage(){

    const messageRef = messageInputRef.current.value;

    console.log("messageRef", messageRef);
    console.log('currentUser', currentUser);
    console.log('currentUser id', currentUser._id);
    
    socket.emit('sendMessage', {
        senderId : user.id,
        receiverId : currentUser._id,
        message : messageRef,
    });

    const response = await fetch('http://localhost:5001/api/chat/store', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatName: `${currentUser.name}_${currentUser._id}`,
                    // chatName : 'hello',
                    isGroupChat : 'false',
                    users : [user.id, currentUser._id],
                    isGroupAdmin : user.id,
               })
           })
          
          
           const data = await response.json();
           console.log("chatModel stored:", data);

   
        if(data){
         
          console.log("messageInputRef.current.value,", messageRef);

           await fetch('http://localhost:5001/api/message/store', {
             method: 'POST',
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
               senderId: user.id,
               receiverId: currentUser._id,
               message: messageRef,
               chatId : data._id
             })
          })
           .then( res => console.log(res))
           .catch(err => console.log(err));
        }
  }

   socket.on("receive_message", async (message) => {

     console.log(" message inside receved message", message);   
    });

  return (
      <div style={{backgroundColor: 'rgba(128, 128, 128, 0.22)', height: '18rem', position : 'relative'}}>
         <input style={{backgroundColor: 'rgba(128, 128, 128, 0.22)', height: '2.5rem', position : 'absolute', 
          bottom: '0.5rem', left: '1rem', borderRadius: '5px', width: '34rem', padding: '1rem', color : 'black'}}
           placeholder='Enter message here' ref={messageInputRef}/>
          <div style={{display : 'inline', position : 'absolute', height: '3rem', width: '3rem' ,
            backgroundColor: 'rgba(128, 128, 128, 0.6)' ,borderRadius: '50%' ,bottom: '0.5rem', right: '1rem'}}>
              <IoIosSend style={{fontSize: '2rem', position : 'absolute',
                 bottom: '0.5rem', right: '0.5rem', cursor : 'pointer'}} onClick={sendMessage}/>
           </div>
      </div>
  )
}


export default Chatbox

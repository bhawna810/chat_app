import React, { createContext, useContext, useEffect, useState } from 'react'

const ChatContextfirst = createContext();

export const ChatProvider = ({children}) => {

  const [user, setUser] = useState({}); 
  const [allUser , setAllUser] = useState([]);
  const [currentUser , setCurrentUser] = useState();
  // const [profilePic , setProfilePic] = useState(false);

  return (
      <ChatContextfirst.Provider value={{ user , setUser, allUser ,  setAllUser, currentUser , setCurrentUser}}>
        {children}
      </ChatContextfirst.Provider>
  )
}

export const ChatContext = () => useContext(ChatContextfirst);

// export  ChatProvider;

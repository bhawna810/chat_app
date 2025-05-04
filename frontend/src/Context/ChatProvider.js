import React, { createContext, useContext, useEffect, useState } from 'react'

const ChatContextfirst = createContext();

export const ChatProvider = ({children}) => {

  const [user, setUser] = useState({});  
  // const [profilePic , setProfilePic] = useState(false);

  return (
    <div>
      <ChatContextfirst.Provider value={{ user , setUser }}>
        {children}
      </ChatContextfirst.Provider>
    </div>
  )
}

export const ChatContext = () => useContext(ChatContextfirst);

// export  ChatProvider;

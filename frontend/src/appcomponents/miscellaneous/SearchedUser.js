
import React from 'react';
import {ChatContext} from  "../../Context/ChatProvider"

const SearchedUser = ({name, obj}) => {

  const {currentUser , setCurrentUser} = ChatContext();

  function setGlobalCurrentUser(){
     console.log('obj', obj);
      setCurrentUser(obj);
  }

  return (
    <div onClick={setGlobalCurrentUser} >
      <p style={{color: 'black', backgroundColor: 'blue', paddding : '1rem', margin : '1rem'}}>{name}</p>
    </div>
  )
}

export default SearchedUser

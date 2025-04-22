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
    };

  // const [ image , setImage ] = useState(false);
  // const [ url , seturl] = useState('');
  // const fileInputRef = useRef(null);

  // function handleFileChange(event){

  //   const fileInputVal = event.target.files[0];
  //   if (fileInputVal) {
  //     setImage(true);
  //     const imageUrl = URL.createObjectURL(fileInputVal); // Temporary preview
  //     seturl(imageUrl);

  //     console.log(" url ", imageUrl);
  //   }
  // }

  return (
    <div style={divStyle }>
       {/* welcome to the chatpage  */}
         {/* <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" >
              Upload Image
              <div >
              <Avatar.Root style={{ height : '10rem', width : '10rem'}}>
                { 
                  image ?  <Avatar.Image  src={url} /> :  <Avatar.Fallback style={{ fontSize: '3rem'}}/>
                }
              </Avatar.Root>
              </div>
              <Button>Save</Button>
          
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{
                opacity : '0' ,  
                height: '9rem',
                width: '9.5rem',
                left: '-3.4rem',
                top: '-9.4rem' ,
                cursor: 'pointer',
                borderRadius: '50%',
              }}
              onChange={handleFileChange}
            />
         </Box> */}
         <SideDrawer/>
        <Chatbox/>
         <MyChats/>
        
    </div>
  )
}

export default Chatpage

import React , {useState , useRef} from 'react';
// import { Box } from "@chakra-ui/react";
import { FaSearch, FaBell } from "react-icons/fa";
import { Box, Avatar, Input, Button } from "@chakra-ui/react"
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const SideDrawer = () => {

    const [ boolHideModal , setBoolHideModal] = useState(true);

    function openModal(){
      setBoolHideModal(true);
    }

  return (
    <div style={{position: 'relative'}}>
      {
          boolHideModal ?  <ModalImage setBoolHideModal={setBoolHideModal}/> : null
      }
      
      <Box bg="white" w="100%" p="4" color="white">
        <FaSearch  style={{color : 'black' , display : 'inline'}}/>
        <p style={{color : 'black' , display : 'inline'}}>Search User</p>
        <p style={{color : 'black' , display : 'inline', position: 'absolute', right: '45rem'}}>Talk-A-Tive</p>
        <FaBell  style={{color : 'black' , display : 'inline' , position: 'absolute', right: '8rem'}}/>
        <Avatar.Root style={{position: 'absolute' ,right: '4rem'}} onClick={openModal} >
            <Avatar.Fallback />
        </Avatar.Root>
        <IoIosArrowDown  style={{color : 'black' , display : 'inline', position: 'absolute', right: '2.5rem'}} />
      </Box>
    </div>
  )
}


const ModalImage = ({setBoolHideModal}) => {

     const [ image , setImage ] = useState(false);
      const [ url , seturl] = useState('');
      const fileInputRef = useRef(null);
    
      function handleFileChange(event){
    
        const fileInputVal = event.target.files[0];
        if (fileInputVal) {
          setImage(true);
          const imageUrl = URL.createObjectURL(fileInputVal); // Temporary preview
          seturl(imageUrl);
    
          console.log(" url ", imageUrl);
        }
      }

      function crossModal(){
        setBoolHideModal(false);
      }

   return (
     <div style ={{ position: 'absolute' , zIndex: '100' , left: '29rem', top: '9rem'}}>
          <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" style={{height: '20rem' , width: '20rem'}} >
            <RxCross2 style={{display : 'inline' , color: 'black'}} onClick={crossModal} />
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
         </Box>
     </div>
   )
} 


export default SideDrawer

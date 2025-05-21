import React , {useState , useRef} from 'react';
// import { Box } from "@chakra-ui/react";
import { FaSearch, FaBell } from "react-icons/fa";
import { Box, Avatar, Input, Button } from "@chakra-ui/react"
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {ChatContext} from  "../../Context/ChatProvider"
import { Alert, Stack } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import SearchedUser from "./SearchedUser";

const SideDrawer = () => {

    const [ boolHideModal , setBoolHideModal] = useState(false);
    const [ seachUserbar, setSeachUserbar] = useState(false);
    const userRef = useRef(null);
    const {user , setUser,allUser, setAllUser} = ChatContext();
    const navigate = useNavigate();
    const [ filteredUsers , setFilteredUsers ] = useState([]);
   
    function openModal(){
      setBoolHideModal(true);
    }

    async function logoutFunc(){
        await fetch('http://localhost:5001/api/user/logout', {
          method : 'GET',
          headers : {
            //  "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
          }
        })
        // .then(response => response.json())
        .then(res => {
          console.log(res);
          setUser({ email: '', password: '' , name: '', image : '' , token : '', id: ''});
          navigate('/');
        })
        .catch((error) => {
          console.log('error', error);
        })
    }

    async function userSearchFunc(){
       setSeachUserbar(true);
       setFilteredUsers([]);
      console.log("user.token", user.token);

      await fetch('http://localhost:5001/api/user/searchUser',{
          method : 'GET',
          headers : {
              "Authorization": `Bearer ${user.token}`
          },
      })
      .then(res=>res.json())
      .then(data => {
        console.log(data);
        let allData = [] , boolVal;
        data?.map((ele,key) => {
          if(ele.email === user.email ){

          }
          else{
             console.log("ele", ele);
            console.log("allUser", allUser);
            allData.push(ele);
          }
        })
        allData?.map((ele)=> {
           boolVal = false;
          allUser?.map((res)=>{
            if(ele.email === res.email){
                boolVal = true;
                return;
            }
          })
          if(!boolVal){
             setAllUser(prevArray => [...prevArray, ele])
          }
        })

      })
      .catch(err => console.log(err));
    }

    function crossModelSearch(){
       setSeachUserbar(false);
       setFilteredUsers([]);
    }

    async function searchUserFunction(){
      
       const searchInputVal = userRef.current.value;

      //  setTimeout(() => {
      //   ( function(){
            let filteredUsersArray = await Promise.resolve(
                  allUser.filter(user =>
                     user.name.toLowerCase().includes(searchInputVal.toLowerCase())
                  )
            );

             console.log("filteredUsersArray inside", filteredUsersArray);

            setFilteredUsers([...filteredUsersArray])
            console.log("filteredUsers ", filteredUsers);
          //  }
        // )()
      //  },5000)

       console.log("allUser", allUser);
      //  console.log("filteredUsers outside", filteredUsers);

      //  console.log("searchInputVal", searchInputVal);
    }

    console.log("filteredUsers outside the function ", filteredUsers);
  return (
    <div style={{position: 'relative'}}>
      {
          boolHideModal ?  <ModalImage setBoolHideModal={setBoolHideModal} /> : null
      }
      {
          seachUserbar ? 
            <Box bg="white" h="100%" p="4" color="white" style={{position: 'absolute', width: '20rem', zIndex: '100', 
               boxShadow: 'rgba(0, 0, 0, 0.25) 10px 10px 20px 0px', borderRadius: '5px', height: '30rem'}}>
                 <Input placeholder='Seach Nmae' type="text" 
                 style={{color: 'black', display : 'inline', width: '14rem', marginRight: '3rem'}} 
                 onChange={searchUserFunction} ref={userRef}/>
                 <RxCross2 style={{display : 'inline' , color: 'black'}} onClick={crossModelSearch} />
                 { filteredUsers?.map((ele) => {
                     return <SearchedUser key={ele.id} name={ele.name} obj={ele}/>
                  })}
            </Box>
          : null
      }
      
      
      <Box bg="white" w="100%" p="4" color="white">
        <div onClick={userSearchFunc} style={{display : 'inline'}}>
            <FaSearch  style={{color : 'black' , display : 'inline'}} />
            <p style={{color : 'black' , display : 'inline'}} >Search User</p>
        </div>
       
        <p style={{color : 'black' , display : 'inline', position: 'absolute', right: '45rem'}}>Talk-A-Tive</p>
        <FaBell  style={{color : 'black' , display : 'inline' , position: 'absolute', right: '8rem'}}/>
        <Avatar.Root style={{position: 'absolute' ,right: '4rem', cursor : 'pointer'}} onClick={openModal} >
          { 
             user.image ?  <Avatar.Image  src={user.image} /> :  <Avatar.Fallback/>
          }
        </Avatar.Root>
        <IoIosArrowDown  style={{color : 'black' , display : 'inline', position: 'absolute', right: '2.5rem', cursor : 'pointer'}} />
      </Box>

      <Box bg="white" w="10%" p="4" color="white" 
       style={{position : 'absolute', right : '1.5rem', zIndex : '100' , boxShadow: '10px 10px 20px 0 rgba(0, 0, 0, 0.25)', borderRadius : '5px', cursor : 'pointer'}}>
        <p style={{color : 'black'}} onClick={logoutFunc}>Logout</p>
      </Box>
    </div>
  )
}


const ModalImage = ({setBoolHideModal}) => {

      const [ image , setImage ] = useState(false);
      const fileInputRef = useRef(null);
      const [ fileInput , setFileInput] = useState('');
      const {user , setUser} = ChatContext();
      const [ url , seturl] = useState(user.image);
      const [ showErrorAlert , setShowErrorAlert] = useState(false);

      // seturl(url) = user.image;
    
      function handleFileChange(event){
    
        const fileInputVal = event.target.files[0];
        if (fileInputVal) {
          setImage(true);
          setFileInput(fileInputVal);
          const imageUrl = URL.createObjectURL(fileInputVal); // Temporary preview
          seturl(imageUrl);
    
          console.log(" url ", imageUrl);
        }
      }

      function crossModal(){
        setBoolHideModal(false);
      }

      async function saveImage(){

        const formData = new FormData();
        // formData.append('email', 'bc@gmail.com');

        console.log('user value from global cntext api',user);

        // formData.append('email', user);
        formData.append('email', user.email);
        formData.append('image', fileInput);

        console.log("formData", formData);
        console.log('fileInput', fileInput);

        await fetch('http://localhost:5001/api/user/upload', {
          method : 'POST', 
          headers : {  Authorization : `Bearer ${user.token}`},
          body: formData
        })
        .then(res => res.json())
        .then(data =>{ 
          console.log("Response:", data);
          console.log("Response url :", data.result.url);
          setUser({ email: user.email, password: user.password , name: user.name, image : data.result.url , token : user.token , id: user.id})
          setShowErrorAlert(true);

          debounce(() => {
           setShowErrorAlert(false);
           setBoolHideModal(false);
          }, 1000)();

        })
        .catch(error => console.log("Upload error:", error));
        
      }

      async function removeImage(){

          if(user.image === ''){
           return
          }
          else{

            console.log("user value inside removeImage", user);

            const data = {
              email : user.email,
              image : ''
            }

            console.log("data value inside removeImage", data);

             await fetch('http://localhost:5001/api/user/removeupload', {
                method : 'POST', 
                headers: { 
                       "Content-Type": "application/json",
                       "Authorization": `Bearer ${user.token}`
                  },
                body: JSON.stringify(data)
             })
             .then(res => res.json())
             .then(data =>{ 
                console.log(data);
                setUser({ email: user.email, password: user.password , name: user.name, image : '' ,  token : user.token , id: user.id});
                seturl('');
             })
             .catch(error => console.log(error));
        }
      }

   return (
     <div style ={{ position: 'absolute' , zIndex: '100' , left: '29rem', top: '9rem'}}>

        { showErrorAlert ? 
              <div 
              style={{
                 position : 'relative',
                 right: '-36rem',
                 top: '-4rem',
              }}>
                 <Alert.Root status="success" style={{backgroundColor : 'rgb(111, 90, 182)'}}>
                   <Alert.Indicator style={{color: 'white'}}/>
                     <Alert.Title style={{color: 'white'}}>Profile Picture Uploaded</Alert.Title>
                 </Alert.Root>
              </div>
                 : null
        }



          <Box p="4" borderWidth="1px" borderColor="border.disabled" background="white" color="black" width="50%" borderRadius="md" style={{height: '20rem' , width: '20rem'}} >
            <RxCross2 style={{display : 'inline' , color: 'black'}} onClick={crossModal} />
              Upload Image
              <div >
              <Avatar.Root style={{ height : '10rem', width : '10rem'}}>
                { 
                  // image ?  <Avatar.Image  src={url} /> :  <Avatar.Fallback style={{ fontSize: '3rem'}}/>
                   (url !== '') ?  <Avatar.Image  src={url} /> :  <Avatar.Fallback style={{ fontSize: '3rem'}}/>
                }
              </Avatar.Root>
              </div>
              <Button onClick={saveImage}>Save</Button>
              <Button onClick={removeImage}>Remove</Button>

            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{
                opacity : '0' ,  
                height: '9rem',
                width: '9.5rem',
                left: '-3.4rem',
                top: '-12.4rem' ,
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

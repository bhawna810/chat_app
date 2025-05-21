import React , {useState, useRef} from 'react'
import { Input , Button, VStack , Alert } from "@chakra-ui/react";
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {ChatContext} from  "../../Context/ChatProvider"
// import Chatpage from "../../pages/Chatpage";

const Signup = () => {
  const [ boolhidePassword , setboolHidePassword] = useState(false);
  const [ boolHideFirsttPara , setboolHideFirstPara] = useState(true);
  const [ boolHideSecondPara , setboolHideSecondPara ] = useState(false);
  const [ boolHideThirdtPara , setboolHideThirdPara ] = useState(false);
  const [ boolHideNamePara , setboolHideNamePara] = useState(true);
  const [ boolEmailAtSubmit , setboolEmailAtSubmit] = useState(false);
  const [ boolPasswordAtSubmit , setboolPasswordAtSubmit] = useState(false);
  const [ showErrorAlert , setShowErrorAlert] = useState(false);
  const [ loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const matchpasswordRef = useRef(null);
  const nameRef = useRef(null);
  // const imageRef = useRef(null);

  const [ namePara , setNamePara] = useState('');
  const [ firstPara , setFirstPara ] = useState('');
  const [ secondPara , setSecondPara ] = useState('');
  const [ thirdPara , setThirdPara ] = useState('');

  const {user , setUser} = ChatContext();
  

  function setHidePasswordValfunctCall(){

    console.log(" hello i am inside the function ");

    const inputEle = document.getElementById('password');
    
    if(boolhidePassword){
        inputEle.type = "text";
        setboolHidePassword(!boolhidePassword)
    }else{
       inputEle.type = "password";
       setboolHidePassword(!boolhidePassword)
    }
  }

  function signUpAllVAlues(){

    setLoading(!loading)

    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;
    const matchpasswordVal = matchpasswordRef.current.value;
    const nameVal = nameRef.current.value;

    console.log(" emailVal " , emailVal);
    console.log(" passwordVal " , passwordVal);
    console.log(" matchpassword ", matchpasswordVal);
    console.log(" nameVal ", nameVal);

    console.log((boolEmailAtSubmit !== true) );
    console.log( (boolPasswordAtSubmit !== true));
    console.log((passwordVal !== matchpasswordVal));
    console.log( ( nameVal === ''));

    if((boolEmailAtSubmit !== true) || (boolPasswordAtSubmit !== true) || (passwordVal !== matchpasswordVal) || ( nameVal === '')){
        console.log(" form not submited ");
        setShowErrorAlert(true);
        
        debounce(() => {
          setLoading(loading)
        }, 1000)();
      
        debounce(() => {
           console.log(" hello "); 
           setShowErrorAlert(false);
           setLoading(loading)
         }, 2500)();
        
        return;
    }

    // setUser(emailVal)
    
    fetch(' http://localhost:5001/api/user' , {
      method : 'POST', 
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ email: emailVal, password: passwordVal , name: nameVal }),
       body: JSON.stringify({ email: emailVal, password: passwordVal , name: nameVal, image : '' , isAdmin : false}),
    })
   .then(response => response.json())
   .then(data => {
      console.log("Response:", data);
      setUser({ email: emailVal, password: passwordVal , name: nameVal, image : '', token :  data.token, id: data._id})
    })
   .catch(error => console.error("Error:", error));

   debounce(() => {
    console.log(" hello "); 
    setLoading(loading)
   }, 2500)();

   navigate("/Chatpage");
  
  }

  const checkEmailInput = debounce(() =>{

     const emailVal = emailRef.current.value;

     console.log(" inside keyup event funcction ");
     console.log(" email val ", emailVal);

     if(emailVal === ''){
      setboolHideFirstPara(false);
      setFirstPara('Email is mandatory');
      setboolEmailAtSubmit(false);
     }
     else if(emailVal.includes('@') === false){
      setboolHideFirstPara(false);
      setFirstPara(' Email is not correct . Please mention the @ and its address');
      setboolEmailAtSubmit(false);
     }
    else if(!emailVal.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      setboolHideFirstPara(false);
      setFirstPara(' Email is not correct . Please mention its address properly ');
      setboolEmailAtSubmit(false);
    }
    else{
      setboolHideFirstPara(false);
      setFirstPara('');
      setboolEmailAtSubmit(true);
     }
  }, 2000)

  const checkFirstPasswordfunc = debounce((val) => {

    // console.log("val", val);
    // console.log("passwordRef.current.value", passwordRef);
    // console.log("matchpasswordRef.current.value", matchpasswordRef);

    const passwordVal = (val === 'first' ? passwordRef.current.value : matchpasswordRef.current.value);

    console.log(" passwordVal " , passwordVal);

    if(passwordVal.length < 8){
      val === 'first' ?  setboolHideFirstPara(false) : setboolHideThirdPara(false) ;
      val === 'first' ?  setSecondPara('Password must be of 8 Characters') : setThirdPara('Password must be of 8 Characters')
      setboolPasswordAtSubmit(false);
    }
    else if(!/[A-Z]/.test(passwordVal) || !/[a-z]/.test(passwordVal) || !/[0-9]/.test(passwordVal) || !/[@$!%*?&]/.test(passwordVal)){
      val === 'first' ? setboolHideSecondPara(false) : setboolHideThirdPara(false);
      val === 'first' ? setSecondPara('Password must contain uppercase , lowercase , letters and special character') : setThirdPara('Password must contain uppercase , lowercase , letters and special character');
      setboolPasswordAtSubmit(false);
    }
    else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordVal)){
      val === 'first' ? setboolHideSecondPara(true) : setboolHideThirdPara(true);
      val === 'first' ? setSecondPara('') :  setThirdPara('') ;
      setboolPasswordAtSubmit(true);
    }

  }, 2000)

  function checkNameInput(){
     const nameVal = nameRef.current.value

     if(nameVal === ''){
      setNamePara(' please fill your name ');
      setboolHideNamePara(false);
     }
     else{
      setNamePara('');
      setboolHideNamePara(true);
     }
  }


  return (
    <div>
      <div  style={{position : 'absolute'}}>

      { showErrorAlert ? 
              <div 
              style={{
                 position : 'relative',
                 right: '-64rem',
                 top: '-6rem',
              }}>
                <Alert.Root status="warning"  bg="red.600" color="white" borderColor="red.800">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>Invalid Fields</Alert.Title>
                    <Alert.Description>
                      Your form has some errors. Please fix them and try again.
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root> 
              </div>
                 : null
      }
      </div>

           

             <p>Name</p>
             <Input ref={nameRef} placeholder="Full name" borderColor="border.disabled"  onKeyUp={checkNameInput}/>
             {boolHideNamePara ? '' : <p>{namePara}</p>}

             <p>Email Address</p>
             <Input ref={emailRef} placeholder="Enter your email" borderColor="border.disabled" onKeyUp={checkEmailInput}/>
             {boolHideFirsttPara ? '' : <p>{firstPara}</p>}
             <p>Password</p>
            
             <Input placeholder="Password" type="password"  id="password" ref={passwordRef}  onKeyUp={() => checkFirstPasswordfunc('first')}/>
              {
                boolhidePassword ?  <IoMdEye onClick={setHidePasswordValfunctCall} /> : <IoIosEyeOff onClick={setHidePasswordValfunctCall} />
              }
              {boolHideSecondPara ? '' : <p>{secondPara}</p>}
              <p>Confirm Password</p>
              <Input placeholder="Password" type="password"  id="password" ref={matchpasswordRef}  onKeyUp={() => checkFirstPasswordfunc('')} />
              {
                boolhidePassword ?  <IoMdEye onClick={setHidePasswordValfunctCall} /> : <IoIosEyeOff onClick={setHidePasswordValfunctCall} />
              }
              {boolHideThirdtPara ? '' : <p>{thirdPara}</p>}

              {/* <p>Upload Picture</p>
              <Input placeholder="upload" type="file"  ref={imageRef} /> */}

              <VStack  direction="row" gap="4" align="center">
                <Button loading={loading} onClick={signUpAllVAlues} loadingText="Submitting..." >
                    Click me
                </Button>
              </VStack>
    </div>
  )
}

export default Signup

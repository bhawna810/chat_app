import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './components/ui/provider';
import { BrowserRouter } from "react-router-dom";
import {ChatProvider} from './Context/ChatProvider';

// import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider>
   {/* <React.StrictMode> */}

     <BrowserRouter>
       <Provider>
         <App />
       </Provider>
     </BrowserRouter>
      
   {/* </React.StrictMode> */}
  </ChatProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


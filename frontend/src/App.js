import './App.css';
import { Button } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Login from './appcomponents/Authentication/Login';
import Signup from './appcomponents/Authentication/Signup';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Homepage />} />
         </Routes>
    </div>
  );
}

export default App;

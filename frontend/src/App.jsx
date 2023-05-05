import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import ResetPass from "./pages/resetpass/resetpass";
import NewRegister from "./pages/register/register";
import {Route, Routes, Navigate} from "react-router-dom";
import {HOME, LOGIN} from "./route-path.js";

function App() {


  
  
  return (
    <div className="app">
        <Routes>
        {/* if logged in <Route path='' element={<Navigate to=`${HOME}/*`/>} /> */}

         {/* 
          <Route index element={<ResetPass/>} />
          <Route index element={<NewRegister />} />
        */} 
        <Route path='' element={<Navigate to={LOGIN}/>} />
          <Route path="/login" element={<Login />} />
          <Route path={`${HOME}/*`} element={<Home />} />
        </Routes>
       
    </div>



  )
}

export default App

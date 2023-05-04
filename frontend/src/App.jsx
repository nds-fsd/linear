import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import ResetPass from "./pages/resetpass/resetpass";
import NewRegister from "./pages/register/register";
import {Route, Routes} from "react-router-dom";
import {HOME} from "./route-path.js";

function App() {

    return (
    <div className="app">
        <Routes>

         {/* 
          <Route index element={<ResetPass/>} />
          <Route index element={<NewRegister />} />
         */} 
          <Route index element={<Login />} />
          {/* if logged in <Route path='' element={<Navigate to=`${HOME}/*`/>} /> */}
          <Route path={`${HOME}/*`} element={<Home />} />
        </Routes>
       
    </div>



  )
}

export default App

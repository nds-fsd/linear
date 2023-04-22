import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import {Route, Routes} from "react-router-dom";
import {HOME} from "./route-path.js";

function App() {

    return (
    <div className="app">
        <Routes>
          <Route index element={<Login />} />
          <Route path={HOME + "/*"} element={<Home />} />
        </Routes>
    </div>



  )
}

export default App

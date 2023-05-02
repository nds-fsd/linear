import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import InputIssue from "./components/inputIssue/InputIssue"
import ModalIssue from "./components/inputIssue/ModalIssue"
import {Route, Routes} from "react-router-dom";
import {HOME,ADDISSUE,MODALISSUE} from "./route-path.js";

function App() {

    return (
    <div className="app">
        <Routes>
          {/* if logged in <Route path='' element={<Navigate to=`${HOME}/*`/>} /> */}
          <Route index element={<Login />} />
          <Route path={`${HOME}/*`} element={<Home />} />
          <Route path={`${ADDISSUE}/*`} element={<InputIssue />} />
          <Route path={`${MODALISSUE}/*`} element={<ModalIssue />} />
        </Routes>
       
    </div>



  )
}

export default App

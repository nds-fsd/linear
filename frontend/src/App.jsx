import { useContext, useEffect } from "react";
import { Context } from "./Context";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { HOME, LOGIN, MY_ISSUES, REGISTER } from "./route-path.js";
import { useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { userSessionContext } = context;
  const {pathname} = useLocation()

  useEffect(() => {
    if (userSessionContext && (pathname === "/" || pathname === "/login" )) {
      navigate(`${HOME}/${MY_ISSUES}`, { replace: true });
    }
  }, []);


  return (
    <div className="app">
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={`${HOME}/*`} element={<Home />} />
        <Route exact path="" element={<Navigate to={LOGIN} />} />
      </Routes>
    </div>
  );
}

export default App;

import { useContext, useEffect } from "react";
import { Context } from "./Context";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import ResetPass from "./pages/resetpass/resetpass";
import Register from "./pages/register/register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { HOME, LOGIN, MY_ISSUES, REGISTER } from "./route-path.js";
import { getUserToken } from "./utils/localStorage.utils";

function App() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { userSessionContext } = context;

  useEffect(() => {
    if (userSessionContext) {
      navigate(`${HOME}/${MY_ISSUES}`, { replace: true });
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="" element={<Navigate to={LOGIN} />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={`${HOME}/*`} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

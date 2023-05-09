import loginHeaderStyles from "./loginheader.module.css";
import logo from "../../assets/logo-no-background.svg";
import { LOGIN } from "../../route-path";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className={loginHeaderStyles.header}>
      <Link to={LOGIN}>
        <img className={loginHeaderStyles.logo} src={logo} />
      </Link>
    </div>
  );
};

export default LoginHeader;

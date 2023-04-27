import loginHeaderStyles from './loginheader.module.css'

const LoginHeader = () => {

    return (

        <div className={loginHeaderStyles.header}>
            <li className={loginHeaderStyles.logo}><a href="#">Logo</a></li>
            <p>About Us</p>
        </div>
    )
};

export default LoginHeader;
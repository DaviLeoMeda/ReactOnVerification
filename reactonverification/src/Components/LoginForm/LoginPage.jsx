import React from 'react';
import './LoginPage.css';
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginPage = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h2>Login</h2>

                <div className="input-box">
                    <FaUserAstronaut className='icon' />
                    <input type="text" placeholder='Please type your Username' required />
                </div>

                <div className="input-box">
                    <RiLockPasswordFill className='icon' />
                    <input type="password" placeholder='Please type your Password' required />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">I forgot the password</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <span>Don't you have an account?</span>
                    <a href="#">Registration</a>
                </div>

            </form>
        </div>
    )
}

export default LoginPage;
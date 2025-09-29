import React,{ useRef } from "react";
import './LoginForm.css';
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/AuthSlice";
import type { RootState, AppDispatch } from "../../redux/ReduxStore";

 interface loginFormProps {
        toggleRegister(): void;
    }
    

export const LoginForm: React.FC<loginFormProps> = ({ toggleRegister }) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const Auth = useSelector((state: RootState) => state.auth);
    const Dispatch:AppDispatch = useDispatch()

    const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (emailRef.current && passwordRef.current) {
            Dispatch(loginUser({ email: emailRef.current.value, password: passwordRef.current.value }));
        }

        
    }

    return ( 
        <form className="login-form">
            <h2>Please Login</h2>
            {Auth.error ? <p className="login-form-error">Username or Password incorrect</p>: <></>}
            <div className="login-form-input-group">
                <h6>Email</h6>
                <input type="email" name="email" placeholder="Enter your email" className="login-form-input" ref={emailRef} />
            </div>
            <div className="login-form-input-group">
                <h6>Password</h6>
                <input type="password" name="password" placeholder="Enter your password" className="login-form-input" ref={passwordRef} />
            </div>
            <button className="login-form-submit" onClick={handleLoginUser}>Login</button>
            <p>
                Don't have an account? 
                <span className="login-form-register" onClick={toggleRegister}> Create one</span>
            </p>

        </form>
    )
}
import { useSelector, useDispatch } from 'react-redux';
import './RegisterForm.css'
import React, { useEffect, useRef } from 'react'
import type { AppDispatch, RootState } from '../../redux/ReduxStore';
import { registerUser, resetRegisterSuccess } from '../../redux/slices/AuthSlice';



interface RegisterFormProps {
    toggleLogin(): void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {

    const authState = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const firstRef = useRef<HTMLInputElement>(null);
    const lastRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleRegisterUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (firstRef.current && lastRef.current && emailRef.current && passwordRef.current) {
            dispatch(
                registerUser({
                    type: 'PARTON',
                    firstName: firstRef.current.value,
                    lastName: lastRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            );
              
            

     }};

    useEffect(() => {
      return () => {
       dispatch(resetRegisterSuccess());
      }
    
      
    }, []);
    

    return (
        <form className='register-form'>
            <h2>Enter your information</h2>
            {authState.error ? <p className='error-message'>{authState.error}</p> : <></>}

            <div className='register-form-name-group'>
                 <div className='register-form-name-input-group'>
                    <label>First Name</label>
                    <input type="text" className='register-form-input-name' placeholder='first' name='first' required ref={firstRef}  />

                </div>

                 <div className='register-form-name-input-group'>
                    <label>Last Name</label>
                    <input type="text" className='register-form-input-name' placeholder='last' name='last' required ref={lastRef}  />

                </div>
            </div>

            <div className='register-form-input-group'>
                <label>Email</label>
                <input type="email" className='register-form-input' placeholder='email' name='email' required ref={emailRef}  />
            </div>
             <div className='register-form-input-group'>
                <label>Password</label>
                <input type="password" className='register-form-input' placeholder='password' name='password' required ref={passwordRef}  />
            </div>
            <button className='register-form-button' onClick={handleRegisterUser}>Register</button>
            {authState.registerSuccess ? <p className='success-message'>Registration Successful! Please <span className='login-link' onClick={toggleLogin}>Login</span></p> : <></> }
        </form>
    )


};

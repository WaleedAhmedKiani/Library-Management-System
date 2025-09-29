import './LoginRegisterModal.css';
import { Modal } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/ReduxStore';
import { useEffect, useState } from 'react';
import { setDisplayLogin } from '../../redux/slices/ModelSlice';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';

export const LoginRegisterModal:React.FC =() => {
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const [login, setLogin] = useState<boolean>(true);

    const closeModal = () => {
        // Dispatch action to close modal
        dispatch(setDisplayLogin(false));
    }

    const toggleLogin = () => {
        setLogin(!login);
    }
    useEffect(() => {
        if(authState.loggedin) {
            closeModal();
        }
        return(()=>{
            if(authState.loggedin) {
                localStorage.setItem('userId', authState.loggedin._id)
        } });
      
    
    }, [authState.loggedin])
    

    return (
        <Modal content={login ? <LoginForm toggleRegister={toggleLogin} /> : <RegisterForm toggleLogin={toggleLogin} />}
        toggleModal={closeModal} />
    )

}


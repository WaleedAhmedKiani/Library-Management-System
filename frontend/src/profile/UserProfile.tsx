import { useSelector } from 'react-redux';
import './UserProfile.css';
import type { AppDispatch, RootState } from '../redux/ReduxStore';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import type { User } from '../models/User';
import { useNavigate } from 'react-router';
import { Create } from '@mui/icons-material';
import { resetUser, updateUser } from '../redux/slices/AuthSlice';


 export const UserProfile = () => {

    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:AppDispatch = useDispatch();

    const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(userState.profile);

    const navigate = useNavigate();

    const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayUpdate(true);
        if(e.target.value && e.target.name && user) {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            });
        }
    };

    const submitUpdate = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(user) {
            dispatch(updateUser(user));
            setDisplayUpdate(false);
        }
    };

    const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem('userId');
        dispatch(resetUser('loggedin'));
        dispatch(resetUser('profile'));
        navigate('/');

    }

    useEffect(() => {
      if(!user) {
          setUser(userState.profile);
      }
    }, [userState.profile, user])
    
  return (
    <div className='update-user-form'>
        <div className='update-user-input-group'>
            <h4>First Name:</h4>
            <input type="text" name='firstName' value={user?.firstName || ''} onChange={updateUserState} 
            disabled={userState.loggedin?._id !== userState.profile?._id}/>
            {userState.loggedin?._id === userState.profile?._id && 
            <Create sx={{
                  position: "absolute",
                  right: 10,
                  top: 10
            }}
              
            /> } 
        </div>

         <div className='update-user-input-group'>
            <h4>Last Name:</h4>
            <input type="text" name='lastName' value={user?.lastName || ''} onChange={updateUserState} 
            disabled={userState.loggedin?._id !== userState.profile?._id}/>
            {userState.loggedin?._id === userState.profile?._id && 
            <Create sx={{
                  position: "absolute",
                  right: 10,
                  top: 10
            }}
              
            /> } 
        </div>

        <div className='update-user-input-group'>
            <h4>Email:</h4>
            <input type="text" name='email' value={user?.email || ''} onChange={updateUserState} 
            disabled={userState.loggedin?._id !== userState.profile?._id}/>
            {userState.loggedin?._id === userState.profile?._id && 
            <Create sx={{
                  position: "absolute",
                  right: 10,
                  top: 10
            }}
              
            /> } 
        </div>
        {displayUpdate ? <button className='profile-button' onClick={submitUpdate}>Update Profile </button> : ''}
        {userState.loggedin?._id === userState.profile?._id ? <button className='profile-button' onClick={logout}>Logout Profile </button>: ''}

    </div>
  )
}


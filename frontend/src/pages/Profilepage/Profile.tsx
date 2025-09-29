import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/ReduxStore';
import './Profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from '../../redux/slices/AuthSlice';
import { UserProfile } from '../../profile';


const Profile = () => {
  const Loggedin = useSelector((state: RootState) => state.auth.loggedin);
  const ProfileUser = useSelector((state: RootState) => state.auth.profile);
  const dispatch: AppDispatch = useDispatch();

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      if (Loggedin?._id === userId || Loggedin?.type === 'EMPLOYEE') {
        dispatch(fetchUser({ userId, property: 'profile' }));
      }
    }
    else {
      navigate('/')
    }
  }, [userId])


  return (
    <div className='page'>
      <div className='page-container'>
        {/* <h1>{Profile?.firstName} {Profile?.lastName}'s Profile</h1> */}
        <h1>
          {ProfileUser ? `${ProfileUser.firstName} ${ProfileUser.lastName}'s Profile` : "Profile"}
        </h1>

        <div className='profile-page-cols'>
          <div className='profile-page-left-column'>
            <UserProfile/>

          </div>
          <div className='profile-page-right-column'>

          </div>


        </div>
      </div>
    </div>
  )
}

export default Profile

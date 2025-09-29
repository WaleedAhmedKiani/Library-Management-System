import { useDispatch } from 'react-redux';
import libraryCard from '../../../src/assets/librarycard.png';
import type { AppDispatch } from '../../redux/ReduxStore';
import './LibraryCard.css';
import { setDisplayLibraryCard } from '../../redux/slices/ModelSlice';

export const LibraryCard:React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const handleModalOpen = () => {
        dispatch(setDisplayLibraryCard(true));
    };
  return (
    <div className="library-card">
         <h2>Library Card</h2>
      <img src={libraryCard} alt="Library Card" /> 
      <p>Access a world of knowledge with your library card<span className='library-card-link' onClick={handleModalOpen}> <b>Click here.</b></span></p>
    </div>
  );
};



import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/ReduxStore";
import { setDisplayLibraryCard } from "../../redux/slices/ModelSlice";
import { Modal } from "../Modal/Modal";
import { RegisterLibraryCardForm } from "../../authentication/LibraryCardForm/LibraryCardForm";


export const LibraryCardModal:React.FC = () => {
    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(setDisplayLibraryCard(false));
    }
    return <Modal content={<RegisterLibraryCardForm />} toggleModal={closeModal} />
    
}
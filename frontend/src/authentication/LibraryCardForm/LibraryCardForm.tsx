import { useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/ReduxStore"
import { useDispatch } from "react-redux";
import { createLibraryCard } from "../../redux/slices/AuthSlice";
import { setDisplayLibraryCard, setDisplayLogin } from "../../redux/slices/ModelSlice";

export const RegisterLibraryCardForm: React.FC = () => {

    const userstate = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const handleCreatedLibraryCard = () => {

        if (userstate.loggedin) {
            dispatch(
                createLibraryCard(userstate.loggedin?._id)
            )
        }
    }

    const handlelogin = () => {
        dispatch(
            setDisplayLibraryCard(false));
        dispatch(setDisplayLogin(true));
    };

    return (
        <>
            {
                userstate.loggedin ?
                    <div className="library-card-container">
                        <h3 className="library-card-title"> Welcome, {userstate.loggedin.firstName} {userstate.loggedin.lastName} </h3>
                        <h4 className="library-card-subtitle">  <strong>Library card</strong>  </h4>
                        {userstate.libraryCard ? <p className="library-card-info"> <b>✅ Your library card number:</b> {userstate.libraryCard} </p>
                            : <button className="library-card-button" onClick={handleCreatedLibraryCard}> Create Library Card </button>
                        }
                    </div>
                    :
                    <div className="library-card-container">
                        <h3 className="library-card-title"> Login Required </h3>
                        <h4 className="library-card-subtitle"> Please login or create an account to register for a library card</h4>
                        <button className="library-card-button" onClick={handlelogin}> Login </button>
                    </div>
            }
        </>
    )


}
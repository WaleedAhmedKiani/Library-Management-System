import './LayoutPage.css';
import { Outlet } from 'react-router-dom';
import type { RootState } from '../../redux/ReduxStore';
import { useSelector } from 'react-redux';
import { LoginRegisterModal } from '../../authentication/LoginRegister';
import { Navbar } from '../../navigation';
import { Footer } from '../../navigation/components/Footer';
import { LibraryCardModal } from '../../components';

export const LayoutPage = () => {

    const state = useSelector((state: RootState) => state.model);
    return (
        <div className="layout-page">
            {state.displayLogin && <LoginRegisterModal />}
            {state.displayLibraryCard && <LibraryCardModal />}
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
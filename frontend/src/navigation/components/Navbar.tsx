import './Navbar.css';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/ReduxStore';
import { useNavigate, Link } from 'react-router-dom';
import { setDisplayLogin } from '../../redux/slices/ModelSlice';
import { Book, Search } from '@mui/icons-material';

export function Navbar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const triggerSearch = () => {
    if (searchRef.current && searchRef.current.value.trim().length > 0) {
      const query = searchRef.current.value.trim();
      // Navigate to catalog with `term` query param (backend expects this)
      navigate(`/catalog?term=${encodeURIComponent(query)}`);
      searchRef.current.value = '';
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  const navigateToProfile = () => {
    if (authState.loggedin) {
      navigate(`/profile/${authState.loggedin._id}`);
    } else {
      navigate('/login');
    }
  };

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-section">
        <Book sx={{ fontSize: '3rem', color: 'green' }} />
        <strong>LibraHub</strong>
      </Link>

      <div className="navbar-option-section">
        <Link to="/catalog" className="navbar-option navbar-link">
          <h3>Catalog</h3>
        </Link>

        {/* 🔎 Search Bar */}
        <div className="navbar-search-box">
          <input
            className="navbar-search-input"
            type="text"
            placeholder="Search by title, author, genre..."
            ref={searchRef}
            onKeyDown={handleEnterKey}
          />
          <Search
            onClick={triggerSearch}
            sx={{ cursor: 'pointer', fontSize: '1.5rem', color: 'blue' }}
          />
        </div>

        {authState.loggedin ? (
          <div
            className="navbar-option"
            onClick={navigateToProfile}
            style={{ cursor: 'pointer' }}
          >
            <h3>{authState.loggedin.firstName}'s Profile</h3>
          </div>
        ) : (
          <div
            className="navbar-option"
            onClick={toggleLogin}
            style={{ cursor: 'pointer' }}
          >
            <h2>Login</h2>
          </div>
        )}
      </div>
    </nav>
  );
}

import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/ReduxStore";
import { searchBooks} from "../redux/slices/BookSlice";



export const SearchBarPage: React.FC = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  

  const { searchResults, loadingBooks, error, termActive } = useSelector(
    (state: RootState) => state.books
  );

  const handleSearch = () => {
    if (term.trim()) {
      dispatch(searchBooks({ term, page: 1, limit: 24 }));
    }
  };



  return (
    <div className="search-container">
      {/* 🔍 Search bar inline */}
      <div className="search-bar">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search books..."
          className="search-input"
        />
        <button
          onClick={handleSearch}
          className="search-btn"
          disabled={loadingBooks}
        >
          Search
        </button>

      </div>

      {/* Loading / Error */}
      {loadingBooks && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {/* No results */}
      {!loadingBooks && !error && termActive && searchResults.length === 0 && (
        <p className="status">No books found</p>
      )}


    </div>
  );
};

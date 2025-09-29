import { useSelector, useDispatch } from "react-redux";
import "./CatalogView.css";
import type { AppDispatch, RootState } from "../redux/ReduxStore";
import { useState, useEffect } from "react";
import { fetchBooks, fetchGenres, clearSearch, searchBooks } from "../redux/slices/BookSlice";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import type { Book } from "../models/Book";
import { mapAuthorsToString } from "../bookInfo";
import { BookCarousel, SearchBarPage } from "./index";

export const CatalogView: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"search" | "filter" | "category">("filter");

  const catalogBooks: Book[] = bookState.catalog ?? [];

  // --- New: detect term from URL ---
  const searchTerm = searchParams.get("term");

  // Scroll to top on page, search term, or view mode change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bookState.page, bookState.searchTerm, viewMode]);

  // Fetch genres always once
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  // If navbar provided a term → run search, else → fetch normal books
  useEffect(() => {
    if (searchTerm) {

      setViewMode("search"); // switch view
      dispatch(searchBooks({ term: searchTerm, page: 1, limit: 24 }));
    } else {
      dispatch(fetchBooks({ page: 1, limit: 24, genre: selectedGenre }));
    }
  }, [dispatch, searchTerm, selectedGenre]);

  // Build genre dropdown safely
  const genreOptions: string[] = ["All"];
  if (Array.isArray(bookState.genres)) {
    genreOptions.push(...bookState.genres.filter((g) => g && g !== "All"));
  }

  // Group by genre for category view
  const booksByGenre: Record<string, Book[]> = catalogBooks.reduce((acc, book) => {
    if (!acc[book.genre]) acc[book.genre] = [];
    acc[book.genre].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  const displayBook = (book: Book) => navigate(`/resource/${book.barcode}`);

  return (
    <div className="catalog-view">
      {(bookState.loadingBooks || bookState.loadingGenres) && <p>Loading books...</p>}

      {!bookState.loadingBooks && !bookState.error && (
        <>
          <h2>Welcome to LibraHub</h2>

          {/* Carousel only if not searching */}
          {!searchTerm && <BookCarousel books={catalogBooks.slice(0, 24)} />}

          {/* View Toggle */}
          <div className="view-toggle">
            <button className={viewMode === "search" ? "active" : ""} onClick={() => setViewMode("search")}>🔍 Search</button>
            <button className={viewMode === "filter" ? "active" : ""} onClick={() => setViewMode("filter")}>🎛 Filter</button>
            <button className={viewMode === "category" ? "active" : ""} onClick={() => setViewMode("category")}>📚 Category</button>
          </div>

          {/* Search View */}
          {viewMode === "search" && (
            <div className="search-section">
              <div className="search-header">
                <SearchBarPage />
                {bookState.termActive && (
                  <button
                    className="clear-btn"
                    onClick={() => {
                      dispatch(clearSearch());
                      navigate("/catalog"); // reset url
                      setSelectedGenre("All");
                      setViewMode("filter");
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>

              {bookState.termActive && (
                <>
                  <p>{bookState.searchResults.length} {bookState.searchResults.length === 1 ? "book" : "books"} found</p>
                  <div className="search-grid">
                    {bookState.searchResults.map((book) => (
                      <div
                        className="catalog-book"
                        key={book.barcode}
                        onClick={() => navigate(`/resource/${book.barcode}`)}
                      >
                        <img src={book.cover} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>{mapAuthorsToString(book)}</p>
                        <p>{book.genre}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pagination for search */}
                  {bookState.totalPages > 1 && (
                    <div className="pagination">
                      {Array.from({ length: bookState.totalPages }, (_, i) => (
                        <button
                          key={i}
                          className={bookState.page === i + 1 ? "active" : ""}
                          onClick={() =>
                            dispatch(searchBooks({
                              term: bookState.searchTerm,
                              page: i + 1,
                              limit: 24,
                            }))
                          }
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Filter View */}
          {viewMode === "filter" && !searchTerm && (
            <>
              <p>{bookState.total} {bookState.total === 1 ? "book" : "books"} found</p>
              <div className="catalog-filters">
                <label htmlFor="genre">Filter by Genre: </label>
                <select id="genre" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                  {genreOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="catalog-grid">
                {catalogBooks.map((book) => (
                  <div className="catalog-book" key={book.barcode} onClick={() => displayBook(book)}>
                    <img src={book.cover} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{mapAuthorsToString(book)}</p>
                    <p>{book.genre}</p>
                  </div>
                ))}
              </div>
              {bookState.totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: bookState.totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={bookState.page === i + 1 ? "active" : ""}
                      onClick={() => dispatch(fetchBooks({ page: i + 1, limit: 24, genre: selectedGenre }))}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Category View */}
          {viewMode === "category" && !searchTerm && (
            <>
              {Object.entries(booksByGenre).map(([genre, books]) => (
                <div key={genre} className="category-section">
                  <h3>{genre}</h3>
                  <div className="category-grid">
                    {books.slice(0, 12).map((book) => (
                      <div key={book.barcode} className="category-book" onClick={() => displayBook(book)}>
                        <img src={book.cover} alt={book.title} />
                        <h4>{book.title}</h4>
                        <p>{mapAuthorsToString(book)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}

      {!bookState.loadingBooks && !bookState.error && !searchTerm && catalogBooks.length === 0 && <h2>No books found</h2>}
    </div>
  );
};

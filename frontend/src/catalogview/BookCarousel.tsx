import React, { useEffect, useState } from "react";
import type { Book } from "../models/Book";
import "./BookCarousel.css";

interface BookCarouselProps {
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerSlide = 4;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(books.length - booksPerSlide, 0) : prev - booksPerSlide
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + booksPerSlide >= books.length ? 0 : prev + booksPerSlide
    );
  };

  const currentBooks = books.slice(currentIndex, currentIndex + booksPerSlide);

  // ✅ Safe useEffect: runs on mount and whenever books.length changes
  useEffect(() => {
    if (books.length === 0) return; // avoid setting interval when no books
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [books.length]); // depends on books.length only

  if (!books || books.length === 0) {
    return <p>No books available for carousel</p>;
  }

  return (
    <div className="carousel-container">
      <button className="carousel-btn left" onClick={prevSlide}>
        ❮
      </button>

      <div className="carousel-slide multi">
        {currentBooks.map((book) => (
          <div className="carousel-item" key={book.barcode}>
            <img src={book.cover} alt={book.title} className="carousel-image" />
            <h3>{book.title}</h3>
            <p className="carousel-author">
              {Array.isArray(book.authors) ? book.authors.join(", ") : String(book.authors)}
            </p>
            <p className="carousel-genre">{book.genre}</p>
          </div>
        ))}
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

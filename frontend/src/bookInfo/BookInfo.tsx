import './BookInfo.css';
import type { Book } from '../models/Book';
import { mapAuthorsToString } from './utils/BookUtils';

interface BookInfoProps {
    book: Book | null;
   
}

export const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
    if (!book) {
        return null;
    }

    return (
        <div className='book-info'>
            <div className='book-info-container'>
                <img className='book-info-cover' src={book.cover} alt="" />
                <div>
                    <h2 className='book-info-title'>{book.title}</h2>
                    <p className='book-info-description'>{book.description}</p>
                    <h3 className='book-info-author'>{mapAuthorsToString(book)}</h3>
                </div>
            </div>
        </div>
       
    );
};



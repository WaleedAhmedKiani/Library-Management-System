import './BookofTheWeek.css';
import { BookInfo } from '../bookInfo';


export const BookofTheWeek:React.FC = () => {
    return (
        <div className='book-of-week'>
            <h1>📖 Weekly Insight</h1>
            <BookInfo 
            book={{
                _id: '68d60406f6f9812c0ef4d51a',
                barcode: '9780156027328',
                cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631251689i/4214.jpg',
                pages: 460,
                title: 'Life of Pi',
                authors: ['Yann Martel'],
                    description: 'Life of Pi is a fantasy adventure novel by Yann Martel published in 2001. The protagonist, Piscine Molitor "Pi" Patel, a Tamil boy from Pondicherry, explores issues of spirituality and practicality from an early age. He survives 227 days after a shipwreck while stranded on a boat in the Pacific Ocean with a Bengal tiger named Richard Parker.',
                    subjects: ['Fiction', 'Literature'],
                    publisher: 'Harcourt, Harvest Books',
                    publicationDate: new Date('2001-09-11T05:00:00.000Z'),
                    genre: 'Fiction',
                    records: [],
                }
            } />
        </div>
    )

}
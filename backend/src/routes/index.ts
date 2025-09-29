import { Express, Request, Response } from "express";
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';
import bookRoutes from './BooksRoutes';
import cardRoutes from './LibraryCardRoutes';
import loanRoutes from './LoanBookRoutes';

export const registerRoutes = (app: Express) => {

    app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the LMS API');
});

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/books', bookRoutes);
    app.use('/card', cardRoutes);
    app.use('/loan', loanRoutes);

};
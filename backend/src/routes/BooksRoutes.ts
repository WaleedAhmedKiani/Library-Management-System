import express from 'express';
import Bookcontroller from '../controller/BookController';
import { Schemas, ValidateSchema } from '../middleware/Validator';


const router = express.Router();

// Book endpoints
router.get('/', Bookcontroller.getPaginatedBooks);
router.get('/search', ValidateSchema(Schemas.book.search, 'query'), Bookcontroller.searchBooksPaginated);
router.post('/', ValidateSchema(Schemas.book.create, 'body'), Bookcontroller.createBook);
router.put('/update', ValidateSchema(Schemas.book.update, 'body'), Bookcontroller.updateBook);
router.delete('/:barcode', ValidateSchema(Schemas.book.delete, 'params'), Bookcontroller.deleteBook);

// Generes endpoint
router.get('/genres', Bookcontroller.getGenres);


export default router;

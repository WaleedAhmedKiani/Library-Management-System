import express from 'express';
import { createLoanRecord, updateLoanRecord, getAllLoanRecords, queryLoanRecords } from '../controller/LoanBookController';
import { Schemas, ValidateSchema } from '../middleware/Validator';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.loan.create, 'body'), createLoanRecord);
router.put('/:id', ValidateSchema(Schemas.loan.update, 'body'), updateLoanRecord);
router.get('/', getAllLoanRecords);
router.post('/query', ValidateSchema(Schemas.loan.query, 'body'), queryLoanRecords);

export default router;
 
import express from 'express'
import { handelRegister, handlelogin } from '../controller/AuthController';
import { Schemas, ValidateSchema } from '../middleware/Validator';

const router = express.Router();

router.post('/register', ValidateSchema(Schemas.user.create, 'body'), handelRegister);
router.post('/login', ValidateSchema(Schemas.user.login, 'body'), handlelogin);

export default router;
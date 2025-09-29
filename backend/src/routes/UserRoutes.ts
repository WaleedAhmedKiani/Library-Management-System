import express from 'express';
import { Schemas, ValidateSchema } from '../middleware/Validator';
import UserController from '../controller/UserController';

const router = express.Router();

router.get('/', UserController.handleGetAllUsers);
router.get('/:userId', ValidateSchema(Schemas.user.userId, 'params'), UserController.handleGetUserById);
router.put('/', ValidateSchema(Schemas.user.update, 'body'), UserController.handleModifyUser);   
router.delete('/:userId',ValidateSchema(Schemas.user.userId, 'params'), UserController.handleDeleteUser);

export default router;


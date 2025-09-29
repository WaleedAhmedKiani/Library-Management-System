import express from "express";
import { createLibraryCard, fetchLibraryCardById } from "../controller/LibraryCardController";
import { Schemas, ValidateSchema } from "../middleware/Validator";

const router = express.Router();

router.post("/", ValidateSchema(Schemas.librarycard.create, 'body'), createLibraryCard);
router.get("/:CardId", ValidateSchema(Schemas.librarycard.get, 'params'), fetchLibraryCardById);

export default router;
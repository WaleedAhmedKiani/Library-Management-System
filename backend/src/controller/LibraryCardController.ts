import { Request, Response } from "express";
import {
  RegisterLibraryCard,
  getLibraryCardByCardId,
} from "../services/LibraryCardServices";
import { libraryCard } from "../models/LibraryCard";

/**
 * @route POST /library-cards
 * @desc Register a new library card
 */
export const createLibraryCard = async (req: Request, res: Response) => {
  try {
    const card: libraryCard = await RegisterLibraryCard(req.body);
    return res.status(201).json({ message: "Card created successfully", card });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to create card" });
  }
};

/**
 * @route GET /library-cards/:userId
 * @desc Get library card by user ID
 */
export const fetchLibraryCardById = async (req: Request, res: Response) => {
  try {
    const { CardId } = req.params;
    const libraryCard = await getLibraryCardByCardId(CardId);

    return res.status(200).json({message: "User card fetched successfully", libraryCard});
  } catch (error: any) {
    return res.status(404).json({ error: error.message || "Card not found" });
  }
};

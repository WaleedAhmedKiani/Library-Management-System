// controllers/LibraryLoanController.ts
import { Request, Response } from "express";
import {generateRecord, modifyRecord, findAllRecords,queryRecords} from "../services/LoanBookServices";
import { libraryloan } from "../models/LibraryLoan";
import { LibraryloanModel } from "../daos/LibraryLoanDoas";

// Create new loan record
export const createLoanRecord = async (req: Request, res: Response) => {
    try {
        const record: libraryloan = req.body;
        const created = await generateRecord(record);
        res.status(201).json({message: "New Record created successfully", record: created });
    } catch (error: any) {
        console.error("Error in createLoanRecord:", error);
        res.status(500).json({ error: error.message || "Failed to create record" });
    }
};

// Update existing loan record
export const updateLoanRecord = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const record: Partial<LibraryloanModel> = req.body; // Use Partial to allow partial updates
        const updated = await modifyRecord({...record, _id: id} as LibraryloanModel);
        res.status(200).json({message: "Record updated successfully", record: updated });
    } catch (error: any) {
        console.error("Error in updateLoanRecord:", error);
        res.status(500).json({ error: error.message || "Failed to update record" });
    }
};

// Get all loan records
export const getAllLoanRecords = async (_req: Request, res: Response) => {
    try {
        const records = await findAllRecords();
        res.status(200).json({message: "Records fetched successfully", records: records});
    } catch (error: any) {
        console.error("Error in getAllLoanRecords:", error);
        res.status(500).json({ error: error.message || "Failed to fetch records" });
    }
};

// Query loan records by property/value
export const queryLoanRecords = async (req: Request, res: Response) => {
    try {
        const { property, value } = req.body;
        if (!property || !value) {
            return res.status(400).json({ error: "Missing property or value query parameter" });
        }

        const records = await queryRecords({
            property: property as string,
            value: value as string
        });

        res.status(200).json({message: "Records fetched successfully", records: records});
    } catch (error: any) {
        console.error("Error in queryLoanRecords:", error);
        res.status(500).json({ error: error.message || "Failed to query records" });
    }
};

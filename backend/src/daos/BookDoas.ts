import mongoose, { Schema } from "mongoose";
import { Book } from "../models/Book";
import { LibraryLoanSchema } from "./LibraryLoanDoas";

export interface BookModel extends Book, Document {

};

const BookSchema = new Schema<BookModel>({
    barcode: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    authors: { type: [String], required: true },
    cover: { type: String, required: true },
    description: { type: String, required: true },
    subjects: { type: [String], required: true },
    pages: { type: Number, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    records: [{ type: Schema.Types.ObjectId, ref: "LoanBook" }],
});



export default mongoose.model<BookModel>('Book', BookSchema);

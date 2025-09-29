import mongoose, { Document, Schema } from "mongoose";
import { libraryloan } from "../models/LibraryLoan";





export interface LibraryloanModel extends libraryloan, Document {};

export const LibraryLoanSchema:Schema = new Schema({
    status:{type: String, enum: ['AVAILABLE', 'LOANED'], required: true},
    loanedDate:{type: Date, required: true},
    dueDate:{type: Date, required: true},
    returnedDate:{type: Date},
    parton:{type: Schema.Types.ObjectId, required: true},
    employeeOut:{type: Schema.Types.ObjectId, required: true},
    employeeIn:{type: Schema.Types.ObjectId, required: false},
    item:{type: Schema.Types.ObjectId, required: true, ref: 'Book'}
},
{timestamps: true})

export default mongoose.model<LibraryloanModel>('LoanBook', LibraryLoanSchema);
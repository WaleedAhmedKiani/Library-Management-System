import { libraryCard } from "../models/LibraryCard"
import mongoose, { Document, Schema } from "mongoose" 

export interface LibraryCardModel extends libraryCard, Document {


}

const LibraryCardSchema:Schema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true}
});

export default mongoose.model<LibraryCardModel>('LibraryCard', LibraryCardSchema);
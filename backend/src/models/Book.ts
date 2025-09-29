import { libraryCard } from "./LibraryCard";

export interface Book {
    barcode: string;
    title: string;
    authors: string[];
    cover: string;
    description: string;
    subjects:string[];
    pages:number;
    genre:string;
    publicationDate: Date;
    publisher: string;
    records: libraryCard[];
}
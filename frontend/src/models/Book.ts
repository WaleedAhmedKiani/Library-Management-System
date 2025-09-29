import type { LoanRecord } from "./Libraryloan";
import type { User } from "./User";

export type Book = {
    _id: string;
    barcode: string;
    title: string;
    authors: string[];
    cover: string;
    description: string;
    subjects: string[];
    publisher: string;
    publicationDate:Date;
    pages: number;
    genre: string;
    records: LoanRecord[];

}

export type CheckoutBookPayload = {
    book: Book;
    libraryCard:string;
    employee:User
}

export type CheckinBookPayload = {
    book: Book;
    employee:User
}
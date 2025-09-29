import type { Book } from "../../models/Book";

export const mapAuthorsToString = (book: Book) => {
    var authors = "";

    for (let author of book.authors) {
        authors += author;
        authors += ", ";

    }

    return authors.slice(0, authors.length - 2);
}
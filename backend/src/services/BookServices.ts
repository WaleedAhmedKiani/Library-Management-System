import BookDoas from "../daos/BookDoas";
import { Book } from "../models/Book";
import { BookModel } from "../daos/BookDoas";
import { BookDoesNotExistError } from "../utils/LibraryError";


// find by barcode
export const modifyBook = async (book: BookModel): Promise<BookModel | null> => {
  try {
    const updatedBook = await BookDoas.findOneAndUpdate(
      { barcode: book.barcode }, book, { new: true }
    );
    if (updatedBook) {
      return updatedBook;
    }
    throw new BookDoesNotExistError("Book with the given barcode does not exist");
  } catch (error) {
    console.error("Error modifying book:", error);
    throw error;
  }
};
// create new book
export const registerBook = async (book: Book): Promise<BookModel> => {
  try {
    const newBook = new BookDoas(book);
    await newBook.save();
    return newBook;
  } catch (error) {
    console.error("Error registering book:", error);
    throw error;
  }
};

// find book by id
export const getBookById = async (id: string): Promise<BookModel> => {
  try {
    const book = await BookDoas.findById(id).populate("records").exec();
    if (book) {
      return book;
    }
    throw new BookDoesNotExistError("Book with the given ID does not exist");
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

// delete by barcode
export const removeBook = async (barcode: string): Promise<BookModel | null> => {
  try {
    const deletedBook = await BookDoas.findOneAndDelete({ barcode });
    if (deletedBook) {
      return deletedBook;
    }
    throw new BookDoesNotExistError("Book with the given barcode does not exist");
  } catch (error) {
    console.error("Error removing book:", error);
    throw error;
  }
};
// search by term in title, author, barcode, genre, description
export const queryBookService = async (searchTerm: string): Promise<BookModel[]> => {
  try {
    const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive  
    const books = await BookDoas.find({
      $or: [
        { title: { $regex: regex } }, 
        { author: { $regex: regex } },
        { barcode: { $regex: regex } },
        { genre: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });
    return books;
  } catch (error) {
    console.error("Error querying books:", error);
    throw error;
  }
};

//  Paginated get all books
//  Paginated get all books (with optional genre)
export const findBooksPaginated = async (
  page: number,
  limit: number,
  genre?: string
): Promise<{ books: BookModel[]; total: number; totalPages: number }> => {
  try {
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (genre && genre !== "All") {
      filter.genre = genre;
    }

    const [books, total] = await Promise.all([
      BookDoas.find(filter).skip(skip).limit(limit),
      BookDoas.countDocuments(filter),
    ]);

    return {
      books,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching paginated books:", error);
    throw error;
  }
};


//  Paginated search
export const queryBookServicePaginated = async (
  searchTerm: string,
  page: number,
  limit: number
): Promise<{ books: BookModel[]; total: number; totalPages: number }> => {
  try {
    const regex = new RegExp(searchTerm, "i");
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
        { barcode: { $regex: regex } },
        { genre: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    };

    const [books, total] = await Promise.all([
      BookDoas.find(filter).skip(skip).limit(limit),
      BookDoas.countDocuments(filter),
    ]);

    return {
      books,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error querying paginated books:", error);
    throw error;
  }
};

// get all unique genres
export const findAllGenres = async (): Promise<string[]> => {
  try {
    const genres = await BookDoas.distinct("genre"); // gets unique values
    return ["All", ...genres.sort()]; // add "All" option + sorted list
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};



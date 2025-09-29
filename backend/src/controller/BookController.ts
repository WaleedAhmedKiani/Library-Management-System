import { Request, Response} from "express";
import {  modifyBook, queryBookService, registerBook, removeBook, findBooksPaginated , queryBookServicePaginated, findAllGenres} from "../services/BookServices";




 const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook = await registerBook(req.body);
    res.status(201).json({ message: "Book created successfully", data: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

 const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBook = await modifyBook(req.body);
    if (updatedBook) {
      res.status(202).json({ message: "Book updated successfully", data: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

 const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBook = await removeBook(req.params.barcode);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully", data: deletedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { term } = req.query; // e.g. /books/search?term=history
    if (!term || typeof term !== "string") {
      res.status(400).json({ error: "Search term is required" });
      return;
    }

    const books = await queryBookService(term);
    res.status(200).json({
      message: "Books fetched successfully",
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Pagination all books (with optional genre)
const getPaginatedBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const genre = req.query.genre as string | undefined;

    const { books, total, totalPages } = await findBooksPaginated(page, limit, genre);

    res.status(200).json({
      message: "Books fetched successfully",
      page,
      total,
      totalPages,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching paginated books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//  Paginated search
const searchBooksPaginated = async (req: Request, res: Response): Promise<void> => {
  try {
    const { term } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!term || typeof term !== "string") {
      res.status(400).json({ error: "Search term is required" });
      return;
    }

    const { books, total, totalPages } = await queryBookServicePaginated(term, page, limit);

    res.status(200).json({
      message: "Books fetched successfully",
      page,
      total,
      totalPages,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get all unique genres
const getGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const genres = await findAllGenres();
    res.status(200).json({
      message: "Genres fetched successfully",
      count: genres.length,
      data: genres,
    });
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export default {
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getGenres,
  getPaginatedBooks,
  searchBooksPaginated
};

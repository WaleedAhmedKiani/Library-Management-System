
import { libraryloan } from "../models/LibraryLoan";
import LibraryLoanDoas, { LibraryloanModel } from "../daos/LibraryLoanDoas";
import { getBookById, modifyBook } from "./BookServices";

// Create new loan record
export const generateRecord = async (record: libraryloan): Promise<LibraryloanModel> => {
  try {
    // Create & save new loan record
    const createRecord = await new LibraryLoanDoas(record).save();

    // Fetch book
    const book = await getBookById(record.item);
    if (!book) {
      throw new Error(`Book with id ${record.item} not found`);
    }

    // Store reference to LoanBook instead of full object
    book.records = [createRecord.id, ...(book.records || [])];


    await modifyBook(book);

    return createRecord;

  } catch (error) {
    console.error("Error generating library loan record:", error);
    throw error;
  }

}

// Update loan record
export const modifyRecord = async (record: LibraryloanModel): Promise<LibraryloanModel> => {
  try {
    // Update loan record
    const updatedRecord = await LibraryLoanDoas.findByIdAndUpdate(
      record._id,
      record,
      { new: true }
    );

    if (!updatedRecord) {
      throw new Error("Record not found");
    }

    // Fetch related book
    const book = await getBookById(record.item);
    if (!book) {
      throw new Error(`Book with id ${record.item} not found`);
    }

    // Ensure book.records exists
    if (!Array.isArray(book.records)) {
      book.records = [];
    }

    // Find record ID inside book.records
    const recordIndex = book.records.findIndex(
      (r: any) => String(r|| r._id) === String(updatedRecord._id)
    );

    if (recordIndex !== -1) {
      // Replace with ID (schema requires ObjectId, not full doc)
      (book.records as any)[recordIndex] = updatedRecord._id;
    } else {
      // Add if missing
      (book.records as any).push(updatedRecord._id);
    }


    await modifyBook(book);

    return updatedRecord;
  } catch (error) {
    console.error("Error modifying library loan record:", error);
    throw error;
  }
};

// Get all records
export const findAllRecords = async ():Promise<LibraryloanModel[]> => {
  try {
    return await LibraryLoanDoas.find().populate("item").exec();
  } catch (error) {
    console.error("Error fetching library loan records:", error);
    throw error;
  }
};

export const queryRecords = async (params:{property:string, value:string | Date}):Promise<LibraryloanModel[]> => {
  try {
    return ((await LibraryLoanDoas.find({[params.property]: params.value}).populate("item").sort("loanedDate").exec()));
  } catch (error) {
    console.error("Error fetching library loan records:", error);
    throw error;
    
  }
};
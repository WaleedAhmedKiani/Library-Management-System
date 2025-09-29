import type { Book } from "./Book";
import type { User } from "./User";

export type LoanRecord = {
    _id: string;
    status: "AVAILABLE" | "LOANED";
    loanedDate: Date | string;
    dueDate: Date | string;
    returnedDate?: Date | string;
    parton: string | User;
    employeeOut: string | User;
    employeeIn: string | User;
    item: string | Book;
    createdAt: Date | string;
    updatedAt: Date | string;
};

export type CreateLoanPayload = {
  status: "AVAILABLE" | "LOANED";
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date;
  parton: string;
  employeeOut: string;
  employeeIn?: string;
  item: string; // always send ID
};
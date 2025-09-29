// CustomError.ts
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message); // Pass message to the Error class
    this.statusCode = statusCode;

    // Maintain proper stack trace (only in V8 engines like Node.js & Chrome)
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class InvalidUsernameOrPasswordError extends Error {
  constructor(message: string = "Invalid username or password") {
    super(message);
    this.name = "InvalidUsernameOrPasswordError";
    Object.setPrototypeOf(this, InvalidUsernameOrPasswordError.prototype);
  }
};

export class UserDoesNotExistError extends Error {
  constructor(message: string = "User does not exist") {
    super(message);
    this.name = "UserDoesNotExistError";
    Object.setPrototypeOf(this, UserDoesNotExistError.prototype);
  }
};

export class BookDoesNotExistError extends Error {
  constructor(message: string = "Book does not exist") {
    super(message);
    this.name = "BookDoesNotExistError";
    Object.setPrototypeOf(this, BookDoesNotExistError.prototype);
  }
};

export class LibraryCardDoesNotExistError extends Error {
    constructor(message: string = "Library card does not exist") {
    super(message);
    this.name = "LibraryCardDoesNotExistError";
    Object.setPrototypeOf(this, LibraryCardDoesNotExistError.prototype);
}
 };

 export class LoanRecordDoesNotExistError extends CustomError {
  constructor(message: string = "Loan record does not exist") {
    super(message, 404);
    this.name = "LoanRecordDoesNotExistError";
  }
};

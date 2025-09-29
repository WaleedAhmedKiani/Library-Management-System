export interface libraryloan{
    status: 'AVAILABLE' | 'LOANED';
    loanedDate: Date;
    dueDate: Date;
    returnedDate?: Date;
    parton: string;
    employeeOut: string;
    employeeIn: string;
    item: string;
}
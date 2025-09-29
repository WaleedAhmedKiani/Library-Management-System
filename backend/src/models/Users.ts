

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: 'ADMIN' | 'PARTON' | 'EMPLOYEE';
}
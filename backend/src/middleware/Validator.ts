import Joi, { ObjectSchema } from "joi";

import { Request, Response, NextFunction } from "express";
import { User } from "../models/Users";
import { UserModel } from "../daos/UserDaos";
import { BookModel } from "../daos/BookDoas";
import { Book } from "../models/Book";
import { libraryCard } from "../models/LibraryCard";
import { libraryloan } from "../models/LibraryLoan";




export const ValidateSchema = (schema: ObjectSchema, property: 'body' | 'params' | 'query') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            switch (property) {
                case 'params':
                    await schema.validateAsync(req.params);
                    break;
                case 'query':
                    await schema.validateAsync(req.query);
                    break;
                default:
                    await schema.validateAsync(req.body);
            }
            next();
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                error: error.message,
                message: 'Validation failed'
            });
        }
    };
};


export const Schemas = {
    user: {
        create: Joi.object<User>({
            type: Joi.string().valid('ADMIN', 'PARTON', 'EMPLOYEE').required(),
            firstName: Joi.string().min(2).max(100).required(),
            lastName: Joi.string().min(2).max(100).required(),
            email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password: Joi.string().min(6).required()
        }),
        login: Joi.object<{ email: string, password: string }>({
            email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password: Joi.string().min(6).required()
        }),
        userId: Joi.object<{ userId: string }>({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: Joi.object<UserModel>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid('ADMIN', 'PARTON', 'EMPLOYEE').required(),
            firstName: Joi.string().min(2).max(100).required(),
            lastName: Joi.string().min(2).max(100).required(),
            email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password: Joi.string().min(6).required()
        })
    },
    book: {
        create: Joi.object<Book>({
            title: Joi.string().min(2).max(100).required(),
            authors: Joi.array().items(Joi.string().min(2).max(100)).required(),
            publicationDate: Joi.date().required(),
            publisher: Joi.string().min(2).max(100).required(),
            pages: Joi.number().min(1).required(),
            genre: Joi.string().min(2).max(100).required(),
            barcode: Joi.string().regex(/^(97(8|9))?\d{9}(\d|X)$/).required(),
            cover: Joi.string().uri().required(),
            description: Joi.string().min(2).max(1000).required(),
            subjects: Joi.array().items(Joi.string().min(2).max(100)).required(),
        }),
        update: Joi.object<BookModel>({

            title: Joi.string().min(2).max(100).required(),
            authors: Joi.array().items(Joi.string().min(2).max(100)).required(),
            publicationDate: Joi.date().required(),
            publisher: Joi.string().min(2).max(100).required(),
            pages: Joi.number().min(1).required(),
            genre: Joi.string().min(2).max(100).required(),
            barcode: Joi.string().regex(/^(97(8|9))?\d{9}(\d|X)$/).required(),
            cover: Joi.string().uri().required(),
            description: Joi.string().min(2).max(1000).required(),
            subjects: Joi.array().items(Joi.string().min(2).max(100)).required(),

        }),
        delete: Joi.object<{ barcode: string }>({
            barcode: Joi.string().regex(/^(97(8|9))?\d{9}(\d|X)$/).required()
        }),
        search: Joi.object<{ term: string; page?: number; limit?: number,  genre?: string }>({
            term: Joi.string().min(1).max(100).required(),
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(20),
             genre: Joi.string().min(1).max(50).optional(),
        })

    },
    librarycard: {
        create: Joi.object<libraryCard>({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get: Joi.object<{ CardId: string }>({
            CardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan: {
    create: Joi.object<libraryloan>({
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date().optional(),
      parton: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      employeeOut: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),
    update: Joi.object({
      _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      status: Joi.string().valid("AVAILABLE", "LOANED").optional(),
      loanedDate: Joi.date().optional(),
      dueDate: Joi.date().optional(),
      returnedDate: Joi.date().optional(),
      parton: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      employeeOut: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    }),
    query: Joi.object<{ property: string; value: string }>({
      property: Joi.string()
        .valid("status", "loanedDate", "dueDate", "parton", "item")
        .required(),
      value: Joi.string().required(),
    }),
  },

};
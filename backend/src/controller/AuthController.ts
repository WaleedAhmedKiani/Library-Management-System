import { Request, Response } from "express";
import { User } from "../models/Users";
import { UserModel } from "../daos/UserDaos";
import { register, login } from "../services/UserServices";
import { InvalidUsernameOrPasswordError } from "../utils/LibraryError";


export const handelRegister = async (req: Request, res: Response) => {
    const user: User = req.body;

    try {
        const registeredUser = await register(user);
        return res.status(201).json({
            message: "User registered successfully", user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
            }
        });
    } catch (err) {
        const error = err as any;

        if (error?.code === 11000 || error?.message?.includes("E11000")) {
            const match = error.message.match(/dup key: { (.+) }/);
            const field = match ? match[1].split(":")[0].trim() : "field";

            return res.status(400).json({
                error: field.includes("email") ? "Email already exist" : `Duplicate field: ${field}`,
            });
        }

        console.error("Error in registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const handlelogin = async (req: Request, res: Response) => {
    const {email,password} = req.body;

    try {
        const loggedIn: UserModel | null = await login(email, password);
        if (!loggedIn) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: loggedIn._id,
                type: loggedIn.type,
                firstName: loggedIn.firstName,
                lastName: loggedIn.lastName,
                email: loggedIn.email,
            }
        });
    } catch (error: any) {
        if (error instanceof InvalidUsernameOrPasswordError) {
            return res.status(401).json({ message: `unable to login user: ${error.message}` });
        } else {
            return res.status(500).json({ message: `unable to login user: ${error.message}` });
    }

    }
};
 
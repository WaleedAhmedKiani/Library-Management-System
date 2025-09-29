import { Request, Response } from "express";
import { findAllUsers, findUserById, modifyUser, deleteUser } from "../services/UserServices";

const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: users
        });
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch users",
            error: error.message
        });
    }
};

const handleGetUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user",
            error: error.message
        });
    }
};

const handleModifyUser = async (req: Request, res: Response) => {
    const user = req.body;

    try {
        const updatedUser = await modifyUser(user);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error: any) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update user",
            error: error.message
        });
    }
};

const handleDeleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete user",
            error: error.message
        });
    }
};

export default {
    handleGetAllUsers,
    handleGetUserById,
    handleModifyUser,
    handleDeleteUser,
}
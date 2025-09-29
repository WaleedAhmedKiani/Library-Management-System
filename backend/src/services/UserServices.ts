import bcrypt from 'bcrypt'
import { config } from '../config'
import UserDaos, { UserModel } from '../daos/UserDaos'
import { User } from '../models/Users'
import { CustomError, InvalidUsernameOrPasswordError, UserDoesNotExistError } from '../utils/LibraryError'


export const register = async (user: User): Promise<UserModel> => {
    const ROUNDS = config.server.rounds;

    try {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
        const saved = new UserDaos({ ...user, password: hashedPassword });
        const result = await saved.save();
        return result;

    } catch (error: any) {
        throw new CustomError(`Error registering user: ${error.message}`);

    }
}

export const login = async (email: string, password: string): Promise<UserModel | null> => {
    try {
        const user = await UserDaos.findOne({ email });
        if (!user) {
            throw new InvalidUsernameOrPasswordError("Invalid username or password");
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new InvalidUsernameOrPasswordError("Invalid username or password");
        }

        return user;
    } catch (error: any) {
        throw error;
    }
};

export const findAllUsers = async (): Promise<UserModel[]> => {
    try {
        const users = await UserDaos.find();
        return users;
    } catch (error) {
        return [];

    }

};

export const findUserById = async (userId: string): Promise<UserModel | null> => {
    try {
        const user = await UserDaos.findById(userId);
        if (user) {
            return user;
        } else {
            throw new Error(UserDoesNotExistError + `User does not exist with ID: ${userId}`);
        }

    } catch (error: any) {
        throw new Error(`Error finding user by ID: ${error.message}`);

    }

};

export const modifyUser = async (user: UserModel): Promise<UserModel | null> => {
    try {
        const userModified = await UserDaos.findByIdAndUpdate(user._id, user, { new: true });
        if (!userModified) {
            throw new Error(UserDoesNotExistError + `User does not exist with ID: ${user._id}`);
        }
        return userModified;

    } catch (error: any) {
        throw new Error(`Error modifying user: ${error.message}`);
    }
}

export const deleteUser = async (userId: string): Promise<UserModel | null> => {
    try {
        const userDeleted = await UserDaos.findByIdAndDelete(userId);
        if (!userDeleted) {
            throw new Error(UserDoesNotExistError + `User does not exist with ID: ${userId}`);
        }
        return userDeleted;
        
    } catch (error: any) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
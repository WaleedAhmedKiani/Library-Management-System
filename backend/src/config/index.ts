import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chalk from 'chalk';
dotenv.config();




const PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

if (!process.env.MONGODB_URI) {
    throw new Error(chalk.red(" MONGODB_URI is missing in the .env file"));
}
const mongoURI: string = process.env.MONGODB_URI;
const ROUNDS: number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 10) + 1;

export const config = {
    server: {
        port: PORT,
        rounds: ROUNDS,
    },
    mongo: {
        uri: mongoURI,
        connect: async (): Promise<void> => {
            try {
                const conn = await mongoose.connect(mongoURI);
                console.log(chalk.green.italic(` MongoDB connected-> (Database: ${conn.connection.name})`));

            } catch (error) {
                console.error(chalk.red.bold(" MongoDB connection failed:", error));
                process.exit(1);
            }
        },
    },
};




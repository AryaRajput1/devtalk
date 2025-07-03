import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('Connected to the database successfully');
    } catch (error) {
        console.log('Error connecting to the database:', error);
        process.exit(1);
    }
}
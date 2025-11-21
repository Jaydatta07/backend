import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Database connected successfully to host: ${connectionInstance.connection.host}`)//this is required to chech which database i have connected to
    } catch (error) {
        console.log("Database connection failed: ", error)
        process.exit(1)// exits the current process with failure ,this is node js functionality
    }
}

export default connectDB
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server : Server;


const PORT = 3000
async function main() {
    try {
        await mongoose.connect (process.env.MONGODB_URL as string)
        console.log("Database connection successful")
        server = app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }

}

main()
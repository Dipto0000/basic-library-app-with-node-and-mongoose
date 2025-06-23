import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server : Server;


const PORT = 3000
async function main() {
    try {
        await mongoose.connect ("mongodb+srv://mongodb:mongodb@cluster0.u7yfn7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database connection successful")
        server = app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }

}

main()
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server : Server;


const PORT = 3000
async function main() {
    try {
        await mongoose.connect ("mongodb+srv://dipto2041:S9pSppF15WoXqkRp@cluster0.hvapxyy.mongodb.net/library-backend")
        console.log("Database connection successful")
        server = app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }

}

main()
import express, { Application, Request, Response } from "express";
import cors from 'cors';

import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.routes';

const app: Application = express();
app.use(cors())
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    console.log(req);
    res.send("Welcome to library management system");
})


app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);


export default app;
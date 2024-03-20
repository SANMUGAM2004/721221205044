import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { PORT } from "./config.js";
import fetchproductrouter from "./Routes/FetchItems.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(morgan());

app.use(cors({
    allowOrigin:'*'
}));


app.listen(PORT,() => {
    console.log(`Welome:${PORT}`);
});

app.use('/products',fetchproductrouter);
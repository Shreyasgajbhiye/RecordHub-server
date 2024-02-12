import express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/mentorRoute.js"

import {connectDB} from "./config/db.js";


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()

app.get("/api", route);


app.listen(PORT, () => {
    console.log("Listen on the port 3000...");
});
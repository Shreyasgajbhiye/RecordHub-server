import express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


import studentRoute from "./routes/studentRoute.js"
import mentorRoute from "./routes/mentorRoute.js"
import {connectDB} from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use(cookieParser());
dotenv.config();


const PORT = process.env.PORT || 8000;


app.use("/api", studentRoute, mentorRoute);
app.use(errorHandler);

connectDB()

app.listen(PORT, () => {
    console.log("Listen on the port "+PORT);
});
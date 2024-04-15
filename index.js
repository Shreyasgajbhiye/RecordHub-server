import express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session"



import route from "./routes/studentRoute.js"
import {connectDB} from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";


const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
   origin:process.env.FRONT_URI,
   credentials:true
}));

app.use(errorHandler);

const passportSecret = process.env.passportSecret;

app.use(session({
    secret: passportSecret,
    resave: false,
    uninitialize: false
}))

// app.use(passport.initialize())
// app.use(passport.session())

const PORT = process.env.PORT || 8000;

connectDB()

app.use("/api", route);
app.use(errorHandler)


app.listen(PORT, () => {
    console.log("Listen on the port "+PORT);
});
import express from "express";
import { signup, login } from "../controller/mentorController.js";
import { approveStudent, getAllStudents } from "../controller/studentController.js";
import { mentorProtect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post('/Mentor/signup', signup)
route.post("/Mentor/login", login)
route.post('/Mentor/verifyStudent/:id', mentorProtect, approveStudent)
route.post('/getAllStudents', getAllStudents);
// route.post("/create", create);
// route.get("/getAll", getAll);
// route.get("/getOne/:id", getOne);
// route.put("/update/:id", updateMentor);
// route.delete("/delete/:id", deleteMentor);

export default route;
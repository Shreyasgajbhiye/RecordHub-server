import express from "express";
import { login } from "../controller/mentorController.js";
import { approveStudent, getAllStudents } from "../controller/studentController.js";
import { protect, restrict } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/Mentor/login", login)
route.post('/Mentor/verifyStudent/:id', protect, restrict("mentor"), approveStudent)
route.post('/getAllStudents', getAllStudents);
// route.post("/create", create);
// route.get("/getAll", getAll);
// route.get("/getOne/:id", getOne);
// route.put("/update/:id", updateMentor);
// route.delete("/delete/:id", deleteMentor);

export default route;
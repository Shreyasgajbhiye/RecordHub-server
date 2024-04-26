import express from "express";
import { login } from "../controller/mentorController.js";
import { approveStudent } from "../controller/studentController.js";
import { getAllStudents, getAllTechStudents, getAllNonTechStudents, getAchievementsById } from "../controller/mentorController.js";
import { protect, restrict } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/Mentor/login", login)
route.post('/Mentor/verifyStudent/:id', protect, restrict("mentor"), approveStudent)
route.get('/Mentor/getAllStudents', protect, restrict("mentor"), getAllStudents);
route.get('/mentor/getAllTechStudents', protect, restrict("mentor"), getAllTechStudents);
route.get('/mentor/getAllNonTechStudents', protect, restrict("mentor"), getAllNonTechStudents);
route.get('/Mentor/getAchievementsById/:id', protect, restrict("mentor"), getAchievementsById);
// route.post("/create", create);
// route.get("/getAll", getAll);
// route.get("/getOne/:id", getOne);
// route.put("/update/:id", updateMentor);
// route.delete("/delete/:id", deleteMentor);

export default route;
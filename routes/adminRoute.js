import express from "express";
import { signup, login, registerBatch, addMentor, getAllMentors, getAllStudents } from "../controller/AdminController.js";
import { protect, restrict } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post('/Admin/addAdmin', protect, restrict("admin"), signup)
route.post("/Admin/login", login)
route.post("/Admin/registerBatch", protect, restrict("admin"), registerBatch)
route.post('/Admin/addMentor', protect, restrict("admin"), addMentor)
route.get('/Admin/getAllMentors', protect, restrict("admin"), getAllMentors)
route.get('/Admin/getAllStudents', protect, restrict("admin"), getAllStudents)


export default route;
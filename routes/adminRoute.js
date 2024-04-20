import express from "express";
import { signup, login, registerBatch, addMentor, getAllMentors } from "../controller/AdminController.js";
import { protect, restrict } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post('/Admin/addAdmin', protect, restrict("admin"), signup)
route.post("/Admin/login", login)
route.post("/Admin/registerBatch", protect, restrict("admin"), registerBatch)
route.post('/Admin/addMentor', protect, restrict("admin"), addMentor)
route.get('/Admin/getAllMentors', protect, restrict("admin"), getAllMentors)


export default route;
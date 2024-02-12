import express from "express";
import {create, getAll, getOne, updateMentor, deleteMentor} from "../controller/mentorController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id", updateMentor);
route.delete("/delete/:id", deleteMentor);

export default route;
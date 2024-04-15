import express from 'express'

import { login, signup } from '../controller/studentController.js';
import { studentProtect } from '../middleware/authMiddleware.js';

const route = express.Router();

route.post('/Student/login', login)
route.post('/Student/signup', signup);




export default route
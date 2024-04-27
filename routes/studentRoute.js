
import express from 'express'

import { signup, login, verifyMail, uploadAchievement, getMyAchievements, forgotPassword } from '../controller/studentcontroller.js';
import { protect, restrict } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/upload.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { verify } from 'jsonwebtoken';

const route = express.Router();

route.post('/Student/login', login);
route.post('/Student/signup', signup);
route.get('/Student/Verificationlink', verifyMail);
route.post('/Student/uploadAchievement', protect, restrict("student"), upload.single("pdf"), uploadAchievement);
route.get('/Student/getMyAchievements/:id', protect, restrict("student"), getMyAchievements);
route.post('/Student/forgotPassword/:id', forgotPassword);

export default route
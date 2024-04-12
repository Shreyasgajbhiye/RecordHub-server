import express from 'express'

import { signup, login, verifyMail } from '../controller/studentcontroller.js';
import { studentProtect } from '../middleware/authMiddleware.js';
// import { verify } from 'jsonwebtoken';

const route = express.Router();

route.post('/Student/login', login);
route.post('/Student/signup', signup);
route.get('/Student/Verificationlink',(req, res) => {
    res.send('Student verified successfully.')
  });


export default route
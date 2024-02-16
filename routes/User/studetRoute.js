import express from 'express'

import { signup, authUser } from '../../controller/User/userController.js';

const route = express.Router();

route.post('/login', authUser)
route.post('/signup', signup);

export default route
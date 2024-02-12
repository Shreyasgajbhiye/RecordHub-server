import express from 'express'

import { signup } from '../../controller/User/userController';

const route = express.Router();

// route.get('/', isLogin)
route.post('/signup', signup);
import express from 'express';
import {adminLogin,getUsers,deleteUser,editUser } from '../controller/admin.controller.js';

const router = express.Router();

router.post('/admin-login',adminLogin)

router.get('/users', getUsers);

router.delete('/users/:id', deleteUser);
router.put('/edituser/:id', editUser);
export default router
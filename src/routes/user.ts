import express from 'express';
import { addUser, getUsers, removeUser, updateUser } from '../controller/user';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUsers);

router.post('/add', addUser);

router.post('/update/:id', updateUser);

router.delete('/remove/:id', removeUser);


export default router;
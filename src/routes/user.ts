import express from 'express';
import { register, login, getUsers, removeUser, updateUser } from '../controller/user';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUsers);

router.post('/register', register)
router.post('/login', login)

router.post('/update/:id', updateUser);

router.delete('/remove/:id', removeUser);


export default router;
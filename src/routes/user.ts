import express from 'express';
import { register, login, getUsers, removeUser, updateUser, verifyPassword, getUser } from '../controller/user';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/register', register)
router.post('/login', login)
router.post('/verifypwd', verifyJWT, verifyPassword)

router.post('/update', verifyJWT, updateUser);

router.delete('/remove/:id', removeUser);


export default router;
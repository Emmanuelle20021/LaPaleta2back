import express from 'express';
import { register, login } from '../controller/user';

const router = express.Router();

router.get('/:id', (_req , res)=> { 
    res.send('get in user');
});

router.post('/add',(_req , res)=>{
    res.send('post in user');
});

router.post('/register', register)
router.post('/login', login)

router.post('/update/:id',(_req , res)=>{
    res.send('update in user');
});

router.delete('/remove/:id',(_req , res)=>{
    res.send('remove in user');
});


export default router;
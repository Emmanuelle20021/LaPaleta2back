import express from 'express';
import { } from '../controller/order';

const router = express.Router();

router.get('/:id', (_req , res)=> { 
    res.send('get in order');
});

router.post('/add',(_req , res)=>{
    res.send('post in order');
});

router.post('/update/:id',(_req , res)=>{
    res.send('update in order');
});

router.delete('/remove/:id',(_req , res)=>{
    res.send('remove in order');
});


export default router;
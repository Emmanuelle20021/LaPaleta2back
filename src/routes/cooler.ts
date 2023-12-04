import express from 'express';
import { } from '../controller/cooler';

const router = express.Router();

router.get('/:id', (_req , res)=> { 
    res.send('get in cooler');
});

router.post('/add',(_req , res)=>{
    res.send('post in cooler');
});

router.post('/update/:id',(_req , res)=>{
    res.send('update in cooler');
});

router.delete('/remove/:id',(_req , res)=>{
    res.send('remove in cooler');
});


export default router;
import express from 'express';
import { } from '../controller/subcategory';

const router = express.Router();

router.get('/:id', (_req , res)=> { 
    res.send('get in subcategory');
});

router.post('/add',(_req , res)=>{
    res.send('post in subcategory');
});

router.post('/update/:id',(_req , res)=>{
    res.send('update in subcategory');
});

router.delete('/remove/:id',(_req , res)=>{
    res.send('remove in subcategory');
});


export default router;
import express from 'express';
import { getProduct } from '../controller/product';

const router = express.Router();

router.get('/:id', getProduct);

router.post('/add',(_req , res)=>{
    res.send('post in products');
});

router.post('/update/:id',(_req , res)=>{
    res.send('update in products');
});

router.delete('/remove/:id',(_req , res)=>{
    res.send('remove in products');
});


export default router;
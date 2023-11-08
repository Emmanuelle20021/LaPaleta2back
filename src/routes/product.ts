import express from 'express';
import { getProduct } from '../controller/product';

const router = express.Router();

router.get('/', getProduct);

router.post('/',(_req , res)=>{
    res.send('post in products');
});

export default router;
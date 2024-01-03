import express from 'express';
import { getProducts, addProduct, updateProduct, removeProduct, getProduct, mostSell } from '../controller/product';

const router = express.Router();

router.get('/', getProducts);

router.get('/mostsell', mostSell);

router.get('/:id', getProduct);

router.post('/add', addProduct);

router.post('/update/:id', updateProduct);

router.delete('/remove/:id', removeProduct);




export default router;
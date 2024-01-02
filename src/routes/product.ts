import express from 'express';
import { getProducts, addProduct, updateProduct, removeProduct, getProduct } from '../controller/product';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/add', addProduct);

router.post('/update/:id', updateProduct);

router.delete('/remove/:id', removeProduct);


export default router;
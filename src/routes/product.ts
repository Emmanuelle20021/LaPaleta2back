import express from 'express';
import { getProducts, addProduct, updateProduct, removeProduct, getProduct, mostSell, freshBuys } from '../controller/product';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

router.get('/', getProducts);

router.get('/mostsell', mostSell);

router.get('/freshBuy', verifyJWT ,freshBuys);

router.get('/:id', getProduct);

router.post('/add', verifyJWT ,addProduct);

router.post('/update/:id', updateProduct);

router.delete('/remove/:id', removeProduct);




export default router;
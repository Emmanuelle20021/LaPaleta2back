import express from 'express';
import { addOrder, getOrder, getOrders, getOrdersUser, removeOrder, updateOrder } from '../controller/order';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

router.get('/', getOrders);

router.get('/:id', getOrder);

router.get('/user/:id', verifyJWT, getOrdersUser);

router.post('/add', verifyJWT, addOrder);

router.post('/update/:id', updateOrder);

router.delete('/remove/:id', removeOrder);

export default router;
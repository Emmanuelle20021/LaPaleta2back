import express from 'express';
import { addOrder, getOrder, getOrders, getOrdersUser, removeOrder, updateOrder } from '../controller/order';

const router = express.Router();

router.get('/', getOrders);

router.get('/:id', getOrder);

router.get('/user/:id', getOrdersUser);

router.post('/add', addOrder);

router.post('/update/:id', updateOrder);

router.delete('/remove/:id', removeOrder);

export default router;
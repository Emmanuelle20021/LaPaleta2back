import express from 'express';
import { addOrder, getOrder, getOrders, removeOrder, updateOrder } from '../controller/order';

const router = express.Router();

router.get('/', getOrders);

router.get('/:id', getOrder);

router.post('/add', addOrder);

router.post('/update/:id', updateOrder);

router.delete('/remove/:id', removeOrder);

export default router;
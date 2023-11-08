import express from 'express';
import products from './product';

const router = express.Router();

router.use('/product', products);

export default router;
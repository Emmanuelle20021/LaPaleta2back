import express from 'express';
import products from './product';
import category from '../routes/category';
import subcategory from '../routes/subcategory';
import user from '../routes/user';
import role from '../routes/role';
import order from '../routes/order';
import cooler from '../routes/cooler';

const router = express.Router();

router.use('/product', products);
router.use('/category', category);
router.use('/subcategory', subcategory);
router.use('/user', user);
router.use('/role', role);
router.use('/order', order);
router.use('/cooler', cooler);

export default router;
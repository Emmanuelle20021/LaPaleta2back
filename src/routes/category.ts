import express from 'express';
import { addCategory, getCategory, getCategories, removeCategory, updateCategory } from '../controller/category';

const router = express.Router();

router.get('/', getCategories);

router.get('/:id', getCategory);

router.post('/add', addCategory);

router.post('/update/:id', updateCategory);

router.delete('/remove/:id', removeCategory);


export default router;
import express from 'express';
import { addSubcategory, getSubcategories, getSubcategory, removeSubcategory, updateSubcategory } from '../controller/subcategory';

const router = express.Router();

router.get('/', getSubcategories);

router.get('/:id', getSubcategory);

router.post('/add', addSubcategory);

router.post('/update/:id', updateSubcategory);

router.delete('/remove/:id', removeSubcategory);


export default router;
import express from 'express';
import { addCooler, getCooler, getCoolers, removeCooler, updateCooler } from '../controller/cooler';

const router = express.Router();


router.get('/', getCoolers);

router.get('/:id', getCooler);

router.post('/add', addCooler);

router.post('/update/:id', updateCooler);

router.delete('/remove/:id', removeCooler);


export default router;
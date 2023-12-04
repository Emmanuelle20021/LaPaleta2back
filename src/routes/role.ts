import express from 'express';
import { addRole, getRole, getRoles, removeRole, updateRole } from '../controller/role';

const router = express.Router();

router.get('/', getRoles);

router.get('/:id', getRole);

router.post('/add', addRole);

router.post('/update/:id', updateRole);

router.delete('/remove/:id', removeRole);


export default router;
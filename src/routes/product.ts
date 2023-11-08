import express from 'express';

const router = express.Router();

router.get('/', (_req , res) =>{
    res.send('fetching in products');
});

router.post('/',(_req , res)=>{
    res.send('post in products');
});

export default router;
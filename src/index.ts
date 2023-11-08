import express from 'express';
const app = express();
app.use(express.json());

import productRouter from './routes/product';

const PORT = 4200;

app.get('/ping', ( _req , res ) => {
    console.log('someone pinged here!! ' + new Date().toLocaleDateString());
    res.send('pong');
});

app.use('/api/product',productRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
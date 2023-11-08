import express from 'express';
import router from './routes'
const app = express();
app.use(express.json());

const PORT = 4200;

app.get('/ping', ( _req , res ) => {
    console.log('someone pinged here!! ' + new Date().toLocaleDateString());
    res.send('pong');
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
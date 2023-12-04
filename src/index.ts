import express from 'express';
import router from './routes/router'

const app = express();
app.use(express.json());

const PORT = 4200;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
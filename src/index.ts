import express from 'express';
import cors from 'cors'
import router from './routes/router'

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 4200;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
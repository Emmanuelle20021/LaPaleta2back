import express from 'express';
import cors from 'cors'
import router from './routes/router'
import fileUpload from 'express-fileupload' 

const app = express();

app.use(fileUpload())
app.use(cors())
app.use(express.json());
app.use(express.static('public'))

const PORT = 4200;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
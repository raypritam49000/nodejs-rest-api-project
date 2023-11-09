import express from 'express';

const app = express();
import {Request, Response} from 'express';
import {AppDataSource} from "./config/database";
import logger from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors({origin: "*"}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello NOD Readers!');
});

AppDataSource.initialize()
    .then(() => {
        app.listen(Number(port), host, () => {
            return console.log(`Express server is listening at http://${host}:${port} 🚀`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
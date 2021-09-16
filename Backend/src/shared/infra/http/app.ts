import "reflect-metadata";

import "../typeorm"

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes';
import { errors } from 'celebrate';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`|->${req.method} |->${req.path}|->${new Date()}|->${req.socket.remoteAddress}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    app.use(cors({ origin: '*' }));
    next();
});
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));
app.use(express.json());
app.use('/api/v1', router);
app.use('/api/teste', (req: Request, res: Response) => {
    return res.status(200).json({
        developper: 'Davyd Kewen',
        version: '1.0.0.0',
        email: 'contato@davydkewen.dev',
        phone: '+55 62 9 8305-5581'
    });
})

app.use(errors());

export default app;
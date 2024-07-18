import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db/connect';
import { bovinoRouter } from './ModuleBovino/infrastructure/routes/bovinoRouter';
import  userRouter  from './ModuleUser/infraestructure/routes/useRoutes'; 
import {  copiarclabe, init } from './ModuleUser/infraestructure/auth/secure/claves';

const app = express();

app.use(cors());
app.use(express.json());

copiarclabe();
init()



app.use('/api/users', userRouter);
app.use('/api/bovinos', bovinoRouter);
 

connectDB();
export { app };

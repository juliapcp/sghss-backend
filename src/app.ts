import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import sequelize from './models';
import pacienteRoutes from './routers/paciente.routes';
import authRoutes from './routers/auth.routes';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/pacientes', pacienteRoutes);
app.use('/api/auth', authRoutes);

app.use((req: Request, res: Response) => res.status(404).send('Rota não encontrada'));
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
    res.status(500).send(error.message)
);

sequelize.sync({ alter: true }).then(() => console.log('Banco sincronizado ✅'));

export default app;

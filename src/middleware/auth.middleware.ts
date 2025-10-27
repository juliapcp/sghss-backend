import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model';

export const proteger = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token ausente' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo') as any;
        const usuario = await Usuario.findByPk(decoded.id);
        if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado' });

        (req as any).usuario = usuario;
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
    }
};

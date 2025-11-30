import { Request, Response, NextFunction } from 'express';

export const permitirPerfis = (...perfis: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const usuario = (req as any).usuario;
        if (!usuario) return res.status(401).json({ message: 'Não autenticado' });
        if (!perfis.includes(usuario.perfil)) return res.status(403).json({ message: 'Acesso negado' });
        next();
    };
};

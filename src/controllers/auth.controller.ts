import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model';
import { UsuarioDTO } from '../dtos/usuario.dto';

const gerarToken = (id: number) =>
    jwt.sign({ id }, process.env.JWT_SECRET || 'segredo', { expiresIn: '7d' });

export const registrar = async (req: Request<{}, {}, UsuarioDTO>, res: Response) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token: gerarToken(usuario.id),
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request<{}, {}, { email: string; senha: string }>, res: Response) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

        const valido = await usuario.validarSenha(senha);
        if (!valido) return res.status(401).json({ message: 'Senha incorreta' });

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token: gerarToken(usuario.id),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

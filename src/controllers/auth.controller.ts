import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model';
import { UsuarioDTO } from '../dtos/usuario.dto';
import { validarRegister, validarLogin } from '../validators/auth.validator';

const gerarToken = (id: number) =>
    jwt.sign({ id }, process.env.JWT_SECRET || 'segredo', { expiresIn: '7d' });

export const registrar = async (req: Request<{}, {}, UsuarioDTO>, res: Response) => {
    try {
        const dados = validarRegister(req.body);

        const existente = await Usuario.findOne({ where: { email: dados.email } });
        if (existente) return res.status(409).json({ message: 'Email já cadastrado' });

        const usuario = await Usuario.create(dados);
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
        const dados = validarLogin(req.body);
        const { email, senha } = dados;

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
        res.status(400).json({ message: error.message });
    }
};

export const me = async (req: Request, res: Response) => {
    const usuario = (req as any).usuario;
    if (!usuario) return res.status(401).json({ message: 'Não autenticado' });
    res.json(usuario);
};

import { z } from 'zod';

export const registerSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
    perfil: z.enum(['paciente', 'profissional', 'admin']),
});

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(1, 'Senha é obrigatória'),
});

export const validarRegister = (data: unknown) => registerSchema.parse(data);
export const validarLogin = (data: unknown) => loginSchema.parse(data);

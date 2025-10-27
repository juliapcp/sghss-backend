import { z } from 'zod';

export const pacienteSchema = z.object({
    nome: z.string().min(3, 'Nome é obrigatório e deve ter pelo menos 3 caracteres'),
    cpf: z.string().min(11, 'CPF é obrigatório e deve conter 11 dígitos'),
    data_nascimento: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento deve estar no formato YYYY-MM-DD'),
    telefone: z.string().optional(),
    email: z.string().email('Email inválido'),
    endereco: z.string().optional(),
});

export const validarNovoPaciente = (data: unknown) => {
    return pacienteSchema.parse(data);
};

export const validarAtualizacaoPaciente = (data: any) => {
    const partialSchema = pacienteSchema.partial(); 
    const parsed = partialSchema.parse(data);

    const invalidFields = ['nome', 'cpf', 'data_nascimento', 'email'].filter(
        (field) => field in data && data[field] === null
    );

    if (invalidFields.length > 0) {
        throw new Error(`Os campos ${invalidFields.join(', ')} não podem ser nulos.`);
    }

    return parsed;
};

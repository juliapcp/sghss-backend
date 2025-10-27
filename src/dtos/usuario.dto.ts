export interface UsuarioDTO {
    nome: string;
    email: string;
    senha: string;
    perfil: 'paciente' | 'profissional' | 'admin';
}

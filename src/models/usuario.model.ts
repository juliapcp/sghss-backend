import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> {
    declare id: CreationOptional<number>;
    declare nome: string;
    declare email: string;
    declare senha: string;
    declare perfil: 'paciente' | 'profissional' | 'admin';

    async validarSenha(senha: string): Promise<boolean> {
        return bcrypt.compare(senha, this.senha);
    }

    toJSON(): object {
        const values = { ...(this.get() as any) };
        delete values.senha;
        return values;
    }
}

Usuario.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        senha: { type: DataTypes.STRING, allowNull: false },
        perfil: { type: DataTypes.ENUM('paciente', 'profissional', 'admin'), allowNull: false },
    },
    {
        sequelize,
        tableName: 'usuarios',
        hooks: {
            beforeCreate: async (usuario: Usuario) => {
                if (usuario.senha) {
                    usuario.senha = await bcrypt.hash(usuario.senha, 10);
                }
            },
            beforeUpdate: async (usuario: Usuario) => {
        
                try {
                    if (usuario.senha && usuario.changed && usuario.changed('senha')) {
                        usuario.senha = await bcrypt.hash(usuario.senha, 10);
                    }
                } catch {
                   
                }
            },
        },
    }
);

export default Usuario;

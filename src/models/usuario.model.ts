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
}

Usuario.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        senha: { type: DataTypes.STRING, allowNull: false },
        perfil: { type: DataTypes.ENUM('paciente', 'profissional', 'admin'), allowNull: false },
    },
    { sequelize, tableName: 'usuarios' }
);

export default Usuario;

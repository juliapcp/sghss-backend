import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Paciente extends Model<InferAttributes<Paciente>, InferCreationAttributes<Paciente>> {
    declare id: CreationOptional<number>;
    declare nome: string;
    declare cpf: string;
    declare data_nascimento: string;
    declare telefone?: string;
    declare email: string;
    declare endereco?: string;
}

Paciente.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
        data_nascimento: { type: DataTypes.STRING, allowNull: false },
        telefone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        endereco: { type: DataTypes.STRING },
    },
    { sequelize, tableName: 'pacientes' }
);

export default Paciente;

import Paciente from '../models/paciente.model';
import { PacienteDTO } from '../dtos/paciente.dto';

const pacienteRepository = {
    async criar(dados: PacienteDTO) {
        return await Paciente.create(dados);
    },

    async listarTodos() {
        return await Paciente.findAll();
    },

    async buscarPorId(id: number) {
        return await Paciente.findByPk(id);
    },

    async atualizar(id: number, dados: Partial<PacienteDTO>) {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) return null;
        return await paciente.update(dados);
    },

    async deletar(id: number) {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) return null;
        await paciente.destroy();
        return paciente;
    },
};

export default pacienteRepository;

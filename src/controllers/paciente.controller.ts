import { Request, Response } from 'express';
import pacienteRepo from '../repositories/paciente.repository';
import { PacienteDTO } from '../dtos/paciente.dto';
import { validarAtualizacaoPaciente, validarNovoPaciente } from '../validators/paciente.validator';

export const criarPaciente = async (req: Request, res: Response) => {
    try {
        const dadosValidados = validarNovoPaciente(req.body);
        const paciente = await pacienteRepo.criar(dadosValidados);
        res.status(201).json(paciente);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarPaciente = async (req: Request, res: Response) => {
    try {
        const dadosValidados = validarAtualizacaoPaciente(req.body);
        const paciente = await pacienteRepo.atualizar(Number(req.params.id), dadosValidados);

        if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado' });
        res.json(paciente);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listarPacientes = async (req: Request, res: Response) => {
    const pacientes = await pacienteRepo.listarTodos();
    res.json(pacientes);
};

export const buscarPaciente = async (req: Request, res: Response) => {
    const paciente = await pacienteRepo.buscarPorId(Number(req.params.id));
    if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado' });
    res.json(paciente);
};

export const deletarPaciente = async (req: Request, res: Response) => {
    const paciente = await pacienteRepo.deletar(Number(req.params.id));
    if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado' });
    res.json({ message: 'Paciente removido com sucesso' });
};

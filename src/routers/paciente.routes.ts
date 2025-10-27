import { Router } from 'express';
import {
    criarPaciente,
    listarPacientes,
    buscarPaciente,
    atualizarPaciente,
    deletarPaciente,
} from '../controllers/paciente.controller';

const router = Router();

router.post('/', criarPaciente);
router.get('/', listarPacientes);
router.get('/:id', buscarPaciente);
router.put('/:id', atualizarPaciente);
router.delete('/:id', deletarPaciente);

export default router;

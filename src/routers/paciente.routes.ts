import { Router } from 'express';
import {
    criarPaciente,
    listarPacientes,
    buscarPaciente,
    atualizarPaciente,
    deletarPaciente,
} from '../controllers/paciente.controller';
import { proteger } from '../middleware/auth.middleware';
import { permitirPerfis } from '../middleware/authorize.middleware';

const router = Router();

// Todas as rotas de paciente exigem autenticação
router.use(proteger);

router.post('/', criarPaciente);
router.get('/', listarPacientes);
router.get('/:id', buscarPaciente);
router.put('/:id', permitirPerfis('profissional', 'admin'), atualizarPaciente);
router.delete('/:id', permitirPerfis('profissional', 'admin'), deletarPaciente);

export default router;

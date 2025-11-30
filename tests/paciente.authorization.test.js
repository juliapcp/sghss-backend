"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const database_1 = __importDefault(require("../src/config/database"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.sync({ force: true });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.close();
}));
describe('Paciente authorization', () => {
    test('paciente cannot delete, profissional can', () => __awaiter(void 0, void 0, void 0, function* () {
        // registrar usuário paciente
        const pacienteUser = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({ nome: 'PacienteUser', email: 'paciente1@example.com', senha: 'senha123', perfil: 'paciente' });
        expect(pacienteUser.status).toBe(201);
        const pacienteToken = pacienteUser.body.token;
        // registrar usuário profissional
        const profUser = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({ nome: 'ProfUser', email: 'prof1@example.com', senha: 'senha123', perfil: 'profissional' });
        expect(profUser.status).toBe(201);
        const profToken = profUser.body.token;
        // criar um paciente (recurso) com dados únicos
        const novo = yield (0, supertest_1.default)(app_1.default)
            .post('/api/pacientes')
            .set('Authorization', `Bearer ${pacienteToken}`)
            .send({ nome: 'Alvo', cpf: '99999999999', data_nascimento: '1990-01-01', email: 'alvo@example.com' });
        expect(novo.status).toBe(201);
        const id = novo.body.id;
        // tentar deletar com token do paciente (deve ser 403)
        const del1 = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/pacientes/${id}`)
            .set('Authorization', `Bearer ${pacienteToken}`);
        expect(del1.status).toBe(403);
        // deletar com token do profissional (deve ser 200)
        const del2 = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/pacientes/${id}`)
            .set('Authorization', `Bearer ${profToken}`);
        expect(del2.status).toBe(200);
        expect(del2.body).toHaveProperty('message');
    }));
});

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
describe('Auth flow', () => {
    test('register -> login -> me', () => __awaiter(void 0, void 0, void 0, function* () {
        const registerRes = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({ nome: 'Test', email: 'test@example.com', senha: 'senha123', perfil: 'paciente' });
        expect(registerRes.status).toBe(201);
        expect(registerRes.body).toHaveProperty('token');
        const loginRes = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', senha: 'senha123' });
        expect(loginRes.status).toBe(200);
        expect(loginRes.body).toHaveProperty('token');
        const token = loginRes.body.token;
        const meRes = yield (0, supertest_1.default)(app_1.default).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
        expect(meRes.status).toBe(200);
        expect(meRes.body).toHaveProperty('email', 'test@example.com');
    }));
});

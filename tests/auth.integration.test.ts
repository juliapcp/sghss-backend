import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import Usuario from '../src/models/usuario.model';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Fluxo de login', () => {
    test('registro -> login -> meus', async () => {
        const registerRes = await request(app)
            .post('/api/auth/register')
            .send({ nome: 'Julia', email: '4574183@alunouninter.com', senha: 'senha123', perfil: 'paciente' });

        expect(registerRes.status).toBe(201);
        expect(registerRes.body).toHaveProperty('token');

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: '4574183@alunouninter.com', senha: 'senha123' });

        expect(loginRes.status).toBe(200);
        expect(loginRes.body).toHaveProperty('token');

        const token = loginRes.body.token;

        const meRes = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
        expect(meRes.status).toBe(200);
        expect(meRes.body).toHaveProperty('email', '4574183@alunouninter.com');
    });
});

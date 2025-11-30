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

describe('Auth flow', () => {
    test('register -> login -> me', async () => {
        const registerRes = await request(app)
            .post('/api/auth/register')
            .send({ nome: 'Test', email: 'test@example.com', senha: 'senha123', perfil: 'paciente' });

        expect(registerRes.status).toBe(201);
        expect(registerRes.body).toHaveProperty('token');

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', senha: 'senha123' });

        expect(loginRes.status).toBe(200);
        expect(loginRes.body).toHaveProperty('token');

        const token = loginRes.body.token;

        const meRes = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
        expect(meRes.status).toBe(200);
        expect(meRes.body).toHaveProperty('email', 'test@example.com');
    });
});

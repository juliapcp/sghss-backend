import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Paciente authorization', () => {
    test('paciente cannot delete, profissional can', async () => {

        const pacienteUser = await request(app)
            .post('/api/auth/register')
            .send({ nome: 'PacienteUser', email: 'paciente1@example.com', senha: 'senha123', perfil: 'paciente' });

        expect(pacienteUser.status).toBe(201);
        const pacienteToken = pacienteUser.body.token;


        const profUser = await request(app)
            .post('/api/auth/register')
            .send({ nome: 'ProfUser', email: 'prof1@example.com', senha: 'senha123', perfil: 'profissional' });

        expect(profUser.status).toBe(201);
        const profToken = profUser.body.token;


        const novo = await request(app)
            .post('/api/pacientes')
            .set('Authorization', `Bearer ${pacienteToken}`)
            .send({ nome: 'Alvo', cpf: '99999999999', data_nascimento: '1990-01-01', email: 'alvo@example.com' });

        expect(novo.status).toBe(201);
        const id = novo.body.id;


        const del1 = await request(app)
            .delete(`/api/pacientes/${id}`)
            .set('Authorization', `Bearer ${pacienteToken}`);

        expect(del1.status).toBe(403);

        const del2 = await request(app)
            .delete(`/api/pacientes/${id}`)
            .set('Authorization', `Bearer ${profToken}`);

        expect(del2.status).toBe(200);
        expect(del2.body).toHaveProperty('message');
    });
});

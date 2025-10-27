import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './config/database';

const PORT = parseInt(`${process.env.PORT || 3000}`);

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexão com o banco SQLite estabelecida com sucesso.');
        return sequelize.sync(); 
    })
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));
    })
    .catch(err => {
        console.error('❌ Erro ao conectar no banco:', err);
    });

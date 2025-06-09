import express from 'express';
import { areaRoutes } from './areas/area.routes';
const app = express();

// Middleware para o Express entender JSON
app.use(express.json());

// Registra as rotas de usuário sob o prefixo '/api/users'
// Todas as rotas em userRoutes serão acessadas a partir de /api/users
// ex: GET /api/users, POST /api/users
app.use('/api/areas', areaRoutes);

// Futuramente, você adicionaria outras rotas aqui:
// app.use('/api/products', productRoutes);

export { app };
import { Router } from 'express';
import { areaController } from './area.controller';

const areaRoutes = Router();

// Define a rota para criar um usuário (POST /)
areaRoutes.post('/', areaController.create);

// Define a rota para listar todos os usuários (GET /)
areaRoutes.get('/', areaController.findAll);

export { areaRoutes };
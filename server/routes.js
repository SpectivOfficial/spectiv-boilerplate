import { Router } from 'express';

// Controller Logic
import userController from './controllers/userController';

const routes = Router();

// User routes
routes.post('/api/create-user', userController.createUser);

export default routes;

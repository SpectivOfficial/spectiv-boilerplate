import { Router } from 'express';

// Controller Logic
import userController from './controllers/userController';

const routes = Router();


// User routes
routes.post('/api/create-user', userController.createUser);
routes.get('/login', userController.login);
routes.get('/signup', userController.signup);
routes.get('/forgot', userController.forgot);

export default routes;

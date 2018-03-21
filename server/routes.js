import { Router } from 'express';

// Controller Logic
import userController from './controllers/userController';

const routes = Router();

// User routes
routes.get('/login', userController.login);
routes.get('/signup', userController.signup);
routes.get('/forgot', userController.forgot);
routes.get('/reset/:token', userController.reset);
routes.post('/authenticate', userController.authenticate);
routes.post('/api/create-user', userController.createUser);
routes.post('/api/forgot', userController.sendPasswordChange);
routes.post('/api/reset/:token', userController.changePassword);
routes.post('/logout', userController.logout);

export default routes;

import { Router } from 'express';

import userController from './controllers/userController';

const routes = Router();

// Add Routes
routes.get('/login', userController.login);
routes.get('/signup', userController.signup);
routes.get('/forgot', userController.forgot);

export default routes;

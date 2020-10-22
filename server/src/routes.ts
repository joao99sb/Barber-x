import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/uploads';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middleware/auth';

const upload = multer(multerConfig);

const routes = Router();
// Test route
routes.get('/', (_, res) => {
  return res.json({ state: true });
});

// session route
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

// authenticate route
routes.use(authMiddleware);

// user route
routes.put('/user', UserController.update);
routes.patch('/avatar', upload.single('avatar'), UserController.avatarFile);

export default routes;

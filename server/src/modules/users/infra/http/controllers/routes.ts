import { Router } from 'express';

import multer from 'multer';
import SessionController from '@modules/users/infra/http/controllers/SessionController';
import ProviderController from '@modules/users/infra/http/controllers/ProviderController';
import multerConfig from '../../../../../config/uploads';

import UserController from './UserController';

import authMiddleware from '../../../../../shared/infra/http/middleware/auth';

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

// provider route
routes.get('/provider', ProviderController.index);

export default routes;

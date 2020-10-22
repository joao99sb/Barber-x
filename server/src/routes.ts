import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/uploads';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middleware/auth';

const upload = multer(multerConfig);

const routes = Router();
routes.get('/', (_, res) => {
  return res.json({ state: true });
});
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ okay: true });
});

export default routes;
